# -*- mode: python; coding: utf-8 -*-
#
# Copyright (C) 2015 <contact@redhat.com>
#
# Author: Loic Dachary <loic@dachary.org>
#
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU Affero General Public License as
# published by the Free Software Foundation, either version 3 of the
# License, or (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU Affero General Public License for more details.
#
# You should have received a copy of the GNU Affero General Public License
# along with this program.  If not, see `<http://www.gnu.org/licenses/>`.
#
import argparse
from ceph_workbench import util
import logging
import re
# http://python-redmine.readthedocs.org/
import redmine


class WBRedmine(object):

    def __init__(self, args):
        self.args = args
        self.issues = {}
        self.status2status_id = {}
        self.version2version_id = {}
        self.tracker2tracker_id = {}

    def open(self):
        self.r = redmine.Redmine(self.args.redmine_url,
                                 username=self.args.redmine_user,
                                 password=self.args.redmine_password)
        for field in self.r.custom_field.all():
            if field.name == 'Backport':
                self.backport_id = field.id
        return self

    def index(self):
        self.map_names_to_ids()
        self.load_open_issues()
        return self

    def map_names_to_ids(self):
        self.status2status_id = {}
        for status in self.r.issue_status.all():
            self.status2status_id[status.name] = status.id

        versions = self.r.version.filter(project_id='ceph')
        self.version2version_id = {}
        for version in versions:
            self.version2version_id[version.name] = version.id

        self.tracker2tracker_id = {}
        for tracker in self.r.tracker.all():
            self.tracker2tracker_id[tracker.name] = tracker.id

    @staticmethod
    def get_parser():
        parser = argparse.ArgumentParser(
            description="Redmine",
            parents=[util.get_parser()],
            add_help=False,
        )
        parser.add_argument('--redmine-url',
                            help='Redmine url',
                            required=True)
        parser.add_argument('--redmine-user',
                            help='Redmine user',
                            required=True)
        parser.add_argument('--redmine-password',
                            help='Redmine password',
                            required=True)
        return parser

    @staticmethod
    def factory(argv):
        return WBRedmine(WBRedmine.get_parser().parse_args(argv))

    def load_issue(self, issue_id):
        if issue_id not in self.issues or 'id' not in self.issues[issue_id]:
            self.update_issues(issue_id)
        return self.issues[issue_id]

    def update_issues(self, issue_id):
        self.issues.setdefault(issue_id, {}).update(
            self.r.issue.get(issue_id, include='journals')
        )
        issue = self.issues[issue_id]
        for field in issue['custom_fields']:
            if field['name'] == 'Backport':
                issue['backports'] = set(re.findall('\w+', field['value']))
                logging.debug("backports for " + str(issue_id) +
                              " is " + str(field['value']) + " " +
                              str(issue['backports']))
                break

    def load_open_issues(self):
        for release in self.args.releases:
            kwargs = {
                'project_id': 'ceph',
                'status_id': 'open',
                'limit': 100,
                'cf_' + str(self.backport_id): '' + release,
            }
            logging.debug('load_open_issues ' + str(kwargs))
            for issue in self.r.issue.filter(**kwargs):
                if issue['project']['name'] in ('Ceph', 'rbd', 'rgw', 'fs'):
                    self.update_issues(issue['id'])
