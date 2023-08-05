# -*- coding: utf-8 -*-

# Copyright 2015
#
# This file is part of proprietary software and use of this file
# is strictly prohibited without written consent.
#
# @author  Tim Santor  <tsantor@xstudios.agency>

# -----------------------------------------------------------------------------

# 3rd Party
from fabric.api import *

import db
import files
import git
import setup
import services

# -----------------------------------------------------------------------------


@task
def install():
    """Install from scratch (eg - after pull for first time)"""
    setup.pip_install_requirements()
    setup.create_logs()
    setup.create_media_dir()
    db.migrate()
    db.createsuperuser()


@task
def deploy():
    """Deploy latest commit"""
    git.pull_master()
    setup.pip_install_requirements()
    db.migrate()
    files.collect_static()
    services.apache_restart()
