"""File wrapping sync related functions"""
from contextlib import contextmanager
import logging
import shutil
import os

import git

from . import workspace

LOG = logging.getLogger('hubsync.sync')


@contextmanager
def git_wrap(git_item):
    cw = git_item.config_writer
    yield cw
    cw.release()


def izip_pairs(xs, ys, cmp_):
    """Generate pairs that match a cmp function"""
    xs = list(reversed(sorted(xs, cmp_)))
    ys = list(reversed(sorted(ys, cmp_)))

    while xs or ys:
        delta = ((not xs) - (not ys)) or cmp_(xs[-1], ys[-1])

        x = xs.pop() if delta <= 0 else None
        y = ys.pop() if delta >= 0 else None
        yield x, y


@contextmanager
def cd(path):
    """Context manager that cds to a path"""
    saved_path = os.getcwd()
    os.chdir(path)
    yield
    os.chdir(saved_path)


def input_yesno(question, default="yes"):
    """Ask a yes/no question via raw_input() and return their answer.

    "question" is a string that is presented to the user.
    "default" is the presumed answer if the user just hits <Enter>.
        It must be "yes" (the default), "no" or None (meaning
        an answer is required of the user).

    The "answer" return value is True for "yes" or False for "no".
    From ActiveState recipe 577058
    """
    valid = {"yes": True, "y": True, "ye": True, "no": False, "n": False}
    if default is None:
        prompt = " [y/n] "
    elif default == "yes":
        prompt = " [Y/n] "
    elif default == "no":
        prompt = " [y/N] "
    else:
        raise ValueError("invalid default answer: '%s'" % default)

    while True:
        print(question + prompt),
        choice = raw_input().lower()
        if default is not None and choice == '':
            return valid[default]
        elif choice in valid:
            return valid[choice]
        else:
            print("Please respond with 'yes' or 'no' (or 'y' or 'n').")


class SyncHelper(object):
    """Class that wraps the synchronization of objects"""

    def __init__(self, api):
        """ Initializes the sync helper

        :type api: hubsync.api
        :param api: github helper
        """
        self.api = api

    def sync_all(self, workspaces, github_organizations):
        """Syncs workspace organizations with github

        :param workspaces:  local workspaces
        :param github_organizations: remote organizations
        """
        LOG.debug("Syncing organizations. workspace {} with github {}"
                  .format(workspaces, github_organizations))
        for local_workspace, github_org in izip_pairs(
                workspaces, github_organizations,
                lambda x, y: cmp(x.name, y.name)):

            if not github_org:
                print("Found organization {} locally but not in github."
                      .format(local_workspace.name))
                if input_yesno("Delete locally?", "no"):
                    shutil.rmtree(local_workspace.path)
                continue

            if not local_workspace:
                print("Found organization {} in github but not locally."
                      .format(github_org.name))
                if input_yesno("Clone locally?", "yes"):
                    os.makedirs(github_org.path)
                    local_workspace = workspace.Organization(github_org.name)
                else:
                    continue

            with cd(local_workspace.path):
                self.sync_org(local_workspace, github_org)

    def sync_org(self, local_org, github_origin):
        """Syncs the org across the workspace and the origin

        :param local_org: local workspace of the org
        :param github_origin: github storage of the org
        """
        LOG.info("Syncing organization {}".format(local_org.name))
        for local_repo, github_repo in izip_pairs(
                local_org.repos, github_origin.repos,
                lambda x, y: cmp(x.name, y.name)):
            if not github_repo:
                print("Found repo {} locally but not in github."
                      .format(local_repo.name))
                if input_yesno("Delete locally?", "no"):
                    shutil.rmtree(local_repo.path)
                continue

            if not local_repo:
                print("Found repo {} in github but not locally."
                      .format(github_repo.name))
                if input_yesno("Clone locally?", "yes"):
                    git.Git().clone(github_repo.url)
                    local_repo = workspace.Repo(github_repo.name,
                                                local_org.path)
                else:
                    continue

            with cd(local_repo.path):
                self.sync_repo(local_repo, github_repo)

    def sync_repo(self, local_repo, github_repo):
        """Syncs the repo with github

        It syncs remotes and branches
        """
        LOG.info("Syncing repo {}".format(local_repo.name))

        def sync_remotes():
            """Sets up the remotes

            - origin: origin of the repo
            - upstream: origin with push options
            - fork: user's fork of the repo
            """
            LOG.debug("Syncing remotes")
            # set origin
            try:
                origin = local_repo.git.remote('origin')
            except ValueError:
                origin = local_repo.git.create_remote('origin', github_repo.url)
            with git_wrap(origin) as writer:
                writer.set('pushurl', 'nopush')
            origin.fetch()

            # set upstream
            try:
                upstream = local_repo.git.remote('upstream')
            except ValueError:
                upstream = local_repo.git.create_remote('upstream',
                                                        github_repo.url)
            upstream.fetch()

            # set fork
            # TODO

        def sync_branches():
            """Sincs/update/clean local/fork branches"""
            LOG.debug("Syncing branches")
            # clean merged branches
            for branch in local_repo.git.heads:
                commits_ahead = list(local_repo.git.iter_commits(
                    "origin/master..{}".format(branch.name)))
                commits_behind = list(local_repo.git.iter_commits(
                    "{}..origin/master".format(branch.name)))
                if not commits_ahead and commits_behind:
                    print("Found stale branch {} locally.".format(branch.name))
                    if input_yesno("Delete locally?", "yes"):
                        local_repo.git.delete_head(branch.name)

        def sync_fork():
            """Syncs and clears the fork (if any)"""
            pass

        sync_remotes()
        sync_branches()
        sync_fork()
