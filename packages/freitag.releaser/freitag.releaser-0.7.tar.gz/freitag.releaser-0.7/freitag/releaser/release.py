# -*- coding: utf-8 -*-
from contextlib import contextmanager
from freitag.releaser.utils import create_branch_locally
from freitag.releaser.utils import get_compact_git_history
from freitag.releaser.utils import is_everything_pushed
from git import InvalidGitRepositoryError
from git import Repo
from git.exc import GitCommandError
from plone.releaser.buildout import Buildout
from shutil import rmtree
from tempfile import mkdtemp
from zest.releaser import fullrelease
from zest.releaser.utils import ask

import os
import re
import sys


DISTRIBUTION = '\033[1;91m{0}\033[0m'
BRANCH = PATH = '\033[1;30m{0}\033[0m'


@contextmanager
def git_repo(source, shallow=True):
    """Handle temporal git repositories.

    It ensures that a git repository is cloned on a temporal folder that is
    removed after being used.

    See an example of this kind of context managers here:
    http://preshing.com/20110920/the-python-with-statement-by-example/
    """
    tmp_dir = mkdtemp()
    if shallow:
        repo = Repo.clone_from(
            source.url,
            tmp_dir,
            depth=100,
            no_single_branch=True,
        )
    else:
        repo = Repo.clone_from(
            source.url,
            tmp_dir
        )

    # give the control back
    yield repo

    # cleanup
    del repo
    rmtree(tmp_dir)


class FullRelease(object):
    """Releases all distributions that have changes and want to be released

    Does lots of QA before and after any release actually happens as well as
    another bunch of boring tasks worth automating.
    """

    #: system path where to look for distributions to be released
    path = 'src'

    #: if actual releases have to happen or only gathering an overview of
    #: what's pending to be released
    dry_run = None

    #: distributions that will be released
    distributions = []

    #: plone.releaser.buildout.Buildout instance to get distribution's info
    #: and save new versions
    buildout = None

    #: git branches that will be updated/checked, etc
    branches = (
        'master',
        'develop',
    )

    #: changelog for each released distribution
    changelogs = {}

    #: version for each released distribution
    versions = {}

    #: last tag for each released distribution (before the new release)
    last_tags = {}

    def __init__(self, path='src', dry_run=False):
        self.path = path
        self.dry_run = dry_run
        self.buildout = Buildout(
            sources_file='develop.cfg',
            checkouts_file='develop.cfg',
        )

    def __call__(self):
        """Go through all distributions and release them if needed *and* wanted
        """
        self.get_all_distributions()
        self.check_pending_local_changes()
        self.check_changes_to_be_released()
        self.ask_what_to_release()

        if not self.dry_run and len(self.distributions) > 0:
            self.release_all()
            self.update_buildout()
            self.update_batou()

    def get_all_distributions(self):
        """Get all distributions that are found in self.path"""
        for folder in sorted(os.listdir(self.path)):
            path = '{0}/{1}'.format(self.path, folder)
            if not os.path.isdir(path):
                continue

            try:
                Repo(path)
            except InvalidGitRepositoryError:
                continue

            self.distributions.append(path)

        print('Distributions: ')
        print('\n'.join(self.distributions))

    def check_pending_local_changes(self):
        """Check that the distributions do not have local changes"""
        print('')
        msg = 'Check pending local changes'
        print(msg)
        print('-' * len(msg))
        clean_distributions = []
        for distribution_path in self.distributions:
            # TODO: add some sort of progress bar like plone.releaser
            repo = Repo(distribution_path)

            dirty = False
            local_changes = False

            if repo.is_dirty():
                dirty = True

            if not is_everything_pushed(repo, branches=self.branches):
                local_changes = True

            if dirty or local_changes:
                msg = '{0} has non-committed/unpushed changes, ' \
                      'it will not be released.'
                print(msg.format(DISTRIBUTION.format(distribution_path)))

                continue

            clean_distributions.append(distribution_path)

        # if nothing is about to be released, do not filter the distributions
        if not self.dry_run:
            if len(self.distributions) != clean_distributions:
                msg = 'Do you want to continue?'
                if not ask(msg.format(distribution_path), default=True):
                    exit(0)

            self.distributions = clean_distributions

        print('Distributions: ')
        print('\n'.join(self.distributions))

    def check_changes_to_be_released(self):
        """Check which distributions have changes that could need a release"""
        print('')
        msg = 'Check changes to be released'
        print(msg)
        print('-' * len(msg))
        need_a_release = []
        for distribution_path in self.distributions:
            dist_name = distribution_path.split('/')[-1]
            print(DISTRIBUTION.format(distribution_path))
            repo = Repo(distribution_path)
            remote = repo.remote()

            # get the latest tag reachable from remote master
            latest_master_commit = remote.refs['master'].commit.hexsha
            try:
                latest_tag = repo.git.describe(
                    '--abbrev=0',
                    '--tags',
                    latest_master_commit
                )
            except GitCommandError:
                # if there is no tag it definitely needs a release
                need_a_release.append(distribution_path)
                continue

            self.last_tags[dist_name] = latest_master_commit
            # get the commit where the latest tag is on
            tag = repo.tags[latest_tag]
            tag_sha = tag.commit.hexsha

            # finally check if there is any branch ahead of that last tag
            for branch in self.branches:
                if branch not in remote.refs:
                    continue

                branch_sha = remote.refs[branch].commit.hexsha
                if tag_sha != branch_sha:
                    # a branch is ahead of the last tag: needs a release
                    need_a_release.append(distribution_path)
                    break

        # if nothing is about to be released, do not filter the distributions
        if not self.dry_run:
            self.distributions = need_a_release

    def ask_what_to_release(self):
        """Show changes both in CHANGES.rst and on git history

        For that checkout the repository, check that rebasing develop on top
        of master is possible and then show both changes to see if everything
        worth writing in CHANGES.rst from git history is already there.
        """
        print('')
        msg = 'What to release'
        print(msg)
        print('-' * len(msg))
        to_release = []
        for distribution_path in self.distributions:
            print(DISTRIBUTION.format(distribution_path))
            dist_name = distribution_path.split('/')[-1]
            dist_clone = self.buildout.sources.get(dist_name)

            if dist_clone is None:
                continue

            develop = True
            branch = 'develop'
            with git_repo(dist_clone) as repo:
                try:
                    repo.remote().refs['develop']
                except IndexError:
                    develop = False
                    branch = 'master'

                if develop:
                    create_branch_locally(repo, 'develop')
                    repo.heads['develop'].checkout()
                    try:
                        repo.git.rebase('master')
                    except GitCommandError:
                        msg = '{0} Could not rebase develop on top of master.'
                        print(msg.format(DISTRIBUTION.format(dist_name)))
                        if not ask('Would you like to continue?',
                                   default=False):
                            exit(1)

                git_changes = get_compact_git_history(
                    repo,
                    self.last_tags[dist_name],
                    branch
                )

                change_log_path = '{0}/CHANGES.rst'.format(
                    repo.working_tree_dir
                )
                changes = self._grab_changelog(change_log_path)
                self.changelogs[dist_name] = changes[2:]

                # TODO: show them side-by-side
                print('')
                print(git_changes)
                print('')
                print('')
                print(''.join(changes))
                if not self.dry_run and \
                        ask('Is the change log ready for release?'):
                    to_release.append(distribution_path)

        self.distributions = to_release
        print('Distributions: ')
        print('\n'.join(self.distributions))

    def release_all(self):
        """Release all distributions"""
        print('')
        msg = 'Release!'
        print(msg)
        print('-' * len(msg))
        for distribution_path in self.distributions:
            print(DISTRIBUTION.format(distribution_path))
            dist_name = distribution_path.split('/')[-1]
            dist_clone = self.buildout.sources.get(dist_name)

            if dist_clone is None:
                continue

            with git_repo(dist_clone, shallow=False) as repo:
                release = ReleaseDistribution(repo.working_tree_dir)
                new_version = release()
                self.versions[dist_name] = new_version

                self.buildout.set_version(dist_name, new_version)

    def update_buildout(self):
        """Commit the changes on buildout"""
        msg = 'Update buildout'
        print(msg)
        print('-' * len(msg))
        msg = ['New releases:', '', ]
        changelogs = ['', 'Changelogs:', '', ]
        for dist in sorted(self.versions.keys()):
            tmp_msg = '{0} {1}'.format(
                dist,
                self.versions[dist]
            )
            msg.append(tmp_msg)

            changelogs.append(dist)
            changelogs.append('-' * len(dist))
            changelogs.append(''.join(self.changelogs[dist]))

        commit_message = '\n'.join(msg + changelogs)

        repo = Repo(os.path.curdir)
        repo.git.add('versions.cfg')
        repo.git.commit(message=commit_message)

    def update_batou(self):
        pass

    def _grab_changelog(self, changelog_path):
        unreleased_regex = re.compile(r' \(unreleased\)$')
        release = re.compile(r' \(\d+-\d+-\d+\)$')
        lines = []
        with open(changelog_path) as changelog:
            on_changelog = False
            for line in changelog:
                if unreleased_regex.search(line):
                    on_changelog = True

                if release.search(line):
                    break

                if on_changelog:
                    lines.append(line)
        return lines


class ReleaseDistribution(object):
    """Release a single distribution with zest.releaser

    It does some QA checks before/after the actual release happens.
    """

    #: system path where the distribution should be found
    path = None
    #: name of the distribution
    name = None
    #: git repository of the distribution
    repo = None

    #: parent repository which will be updated with the new release
    parent_repo = None
    #: plone.releaser.buildout.Buildout instance of the parent repository
    buildout = None

    def __init__(self, path):
        self.path = path
        self.name = path.split('/')[1]

    def __call__(self):
        self._check_parent_branch()
        self._check_distribution_exists()
        self._zest_releaser()

        return self.get_version()

    def _check_parent_branch(self):
        self.parent_repo = Repo(os.path.curdir)
        current_branch = self.parent_repo.active_branch.name

        if current_branch != 'master':
            text = '{0} is not on master branch, but on {1}'
            raise ValueError(
                text.format(
                    DISTRIBUTION.format('zope repository'),
                    BRANCH.format(current_branch)
                )
            )

    def _check_distribution_exists(self):
        """Check that the folder exists"""
        if not os.path.exists(self.path):
            raise IOError(
                'Path {0} does NOT exist'.format(PATH.format(self.path))
            )

    def _zest_releaser(self):
        """Release the distribution"""
        # remove arguments so zest.releaser is not confused
        # will most probably *not* be fixed by zest.releaser itself:
        # https://github.com/zestsoftware/zest.releaser/issues/146
        original_args = sys.argv
        sys.argv = ['']

        # change to the distribution root folder
        original_path = os.getcwd()
        os.chdir(self.path)

        fullrelease.main()

        os.chdir(original_path)
        sys.argv = original_args

    def get_version(self):
        self.repo = Repo(self.path)
        return self.repo.tags[-1].name
