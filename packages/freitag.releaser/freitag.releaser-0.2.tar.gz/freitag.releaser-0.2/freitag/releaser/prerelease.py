# -*- coding: utf-8 -*-
from git import InvalidGitRepositoryError
from git import Repo
from zest.releaser.utils import ask

import os
import subprocess
import sys


def vcs_updated(data):
    try:
        repo = Repo(data['workingdir'])
    except InvalidGitRepositoryError:
        return

    if not ask('Do you want to update develop and master branches?'):
        return

    # get new code, if any
    remote = repo.remote()
    remote.fetch()

    branch = 'develop'
    if branch in remote.refs:
        # the branch does not exist locally, check it out
        if branch not in repo.heads:
            _checkout_branch(repo, branch)
        else:
            _update_branch(repo, branch)

    branch = 'master'
    if branch in remote.refs:
        # the branch does not exist locally, check it out
        if branch not in repo.heads:
            _checkout_branch(repo, branch)
        else:
            _update_branch(repo, branch)

        if 'develop' in repo.heads:
            # add all commits from develop to master
            develop_commit = repo.branches.develop.commit
            master_commit = repo.branches.master.commit
            if develop_commit == master_commit:
                print('master branch is already in sync with develop branch.')
            else:
                repo.git.rebase('origin/develop')
                print('Rebased master branch on top of develop.')


def check_translations(data):
    """Check that all strings are marked as translatable."""
    if not os.path.exists('{0}/bin/i18ndude'.format(data['workingdir'])):
        return

    process = subprocess.Popen(
        ['bin/i18ndude', 'find-untranslated', '-n', 'src/', ],
        stdout=subprocess.PIPE
    )
    stdout, stderr = process.communicate()
    if 'ERROR' not in stdout:
        return

    print(stdout)
    msg = 'There are strings not marked as translatable, ' \
          'do you want to continue?'
    if not ask(msg, default=False):
        sys.exit(1)


def _checkout_branch(repo, branch):
    remote = repo.remote()
    new_branch = repo.create_head(branch, remote.refs[branch])
    new_branch.set_tracking_branch(remote.refs[branch])
    print('{0} branch did not exist locally, checked out.'.format(branch))


def _update_branch(repo, branch):
    # update develop branch to its latest commit
    remote = repo.remote()
    repo.heads[branch].checkout()
    local_commit = repo.head.commit
    remote_commit = remote.refs[branch].commit
    if local_commit == remote_commit:
        print('{0} branch is already updated.'.format(branch))
    else:
        repo.git.rebase('origin/{0}'.format(branch))
        print('Updated {0} branch to latest commits.'.format(branch))
