.. -*- coding: utf-8 -*-

Changelog
=========

0.3 (2015-11-13)
----------------

- Cleanups and code reorganization.
  [gforcada]

- Add full-release command.
  [gforcada]

0.2 (2015-11-11)
----------------

- 0.1 was never released, due to not being registered on PyPI.
  [gforcada]

0.1 (2015-11-11)
----------------
- add zest.releaser plugins:

  - vcs_updated: checkouts master and develop branches,
    rebases the former on top of the later (master catches up with develop)
    and leaves the checked out branch as master,
    ready to be released
  - i18n: runs ``bin/i18ndude find-untranslated`` and reports back if there
    are any strings not marked for translation
  - update_branches: the oposite from vcs_updated,
    rebased develop branch on top of master (which was used to make the release)

  [gforcada]

- emulate ``plone.releaser`` and create a ``freitag_manage`` command with:

  - publish_cfg_files: send two specific files to a specific server
  - release: releases a distribution (with ``zest.releaser``)

  [gforcada]

- initial release
  [gforcada]
