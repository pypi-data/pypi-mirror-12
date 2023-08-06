# -*- coding: utf-8 -*-
#
# This file is part of Invenio.
# Copyright (C) 2015 CERN.
#
# Invenio is free software; you can redistribute it
# and/or modify it under the terms of the GNU General Public License as
# published by the Free Software Foundation; either version 2 of the
# License, or (at your option) any later version.
#
# Invenio is distributed in the hope that it will be
# useful, but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
# General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with Invenio; if not, write to the
# Free Software Foundation, Inc., 59 Temple Place, Suite 330, Boston,
# MA 02111-1307, USA.
#
# In applying this license, CERN does not
# waive the privileges and immunities granted to it by virtue of its status
# as an Intergovernmental Organization or submit itself to any jurisdiction.

"""Bundle class with support for npm dependencies."""

from __future__ import absolute_import, print_function

from collections import defaultdict

import semver
from flask_assets import Bundle as BundleBase


class NpmBundle(BundleBase):
    """Bundle extension with a name and npm dependencies.

    The npm dependencies are used to generate a package.json file.
    """

    def __init__(self, *contents, **options):
        """Initialize the named bundle.

        :param name: name of the bundle
        :type name: str
        :param npm: npm dependencies
        :type npm: dict
        """
        self.npm = options.pop("npm", {})
        super(NpmBundle, self).__init__(*contents, **options)


def extract_deps(bundles, log=None):
    """Extract the dependencies from the bundle and its sub-bundles."""
    def _flatten(bundle):
        deps = []
        if hasattr(bundle, 'npm'):
            deps.append(bundle.npm)
        for content in bundle.contents:
            if isinstance(content, BundleBase):
                deps.extend(_flatten(content))
        return deps

    flatten_deps = []
    for bundle in bundles:
        flatten_deps.extend(_flatten(bundle))

    packages = defaultdict(list)
    for dep in flatten_deps:
        for pkg, version in dep.items():
            packages[pkg].append(version)

    deps = {}
    for package, versions in packages.items():
        deps[package] = semver.max_satisfying(versions, '*', True)

        if log and len(versions) > 1:
            log("Warn: {} version {} resolved to: {}"
                .format(repr(package), versions, repr(deps[package])))

    return deps
