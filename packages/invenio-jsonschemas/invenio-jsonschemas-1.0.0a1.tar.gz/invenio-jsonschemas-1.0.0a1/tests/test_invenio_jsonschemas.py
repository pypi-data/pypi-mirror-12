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


"""Module tests."""

from __future__ import absolute_import, print_function

import json
import os

import pytest
from flask import Flask

from invenio_jsonschemas import InvenioJSONSchemas
from invenio_jsonschemas.errors import JSONSchemaDuplicate, JSONSchemaNotFound


def test_version():
    """Test version import."""
    from invenio_jsonschemas import __version__
    assert __version__


def test_init():
    """Test extension initialization."""
    app = Flask('testapp')
    ext = InvenioJSONSchemas(app)
    assert 'invenio-jsonschemas' in app.extensions

    app = Flask('testapp')
    ext = InvenioJSONSchemas()
    assert 'invenio-jsonschemas' not in app.extensions
    ext.init_app(app)
    assert 'invenio-jsonschemas' in app.extensions


schema_template = """{{
    "type": "object",
    "properties": {{
        "{}":      {{ "type": "number" }}
    }}
}}"""


def build_schemas(id):
    """Generate a dictionary of "file path" -> "JSON schema"."""
    return {
        'rootschema_{}.json'.format(id):
        schema_template.format('rootschema_{}'.format(id)),
        'sub1/subschema_{}.json'.format(id):
        schema_template.format('subschema_1_{}'.format(id)),
        'sub2/subschema_{}.json'.format(id):
        schema_template.format('subschema_2_{}'.format(id)),
        'sub3/subschema_{}.json'.format(id):
        schema_template.format('subschema_3_{}'.format(id)),
    }


def test_api(app, dir_factory):
    ext = InvenioJSONSchemas(app, entry_point_group=None)
    schema_files = build_schemas(1)
    with dir_factory(schema_files) as directory:
        ext.register_schemas_dir(directory)
        for path in schema_files.keys():
            # test get_schema_dir
            assert ext.get_schema_dir(path) == directory
            # test get_schema_path
            assert ext.get_schema_path(path) == \
                os.path.join(directory, path)
            # test get_schema
            assert ext.get_schema(path) == json.loads(schema_files[path])
        # test list_schemas
        assert set(schema_files.keys()) == set(ext.list_schemas())
        # test failure when asking for non existing schemas fails
        with pytest.raises(JSONSchemaNotFound) as exc_info:
            ext.get_schema('not_existing_schema.json')
        assert exc_info.value.schema == 'not_existing_schema.json'
        # test failure when asking for non existing schemas' path
        with pytest.raises(JSONSchemaNotFound) as exc_info:
            ext.get_schema_path('not_existing_schema.json')
        assert exc_info.value.schema == 'not_existing_schema.json'


def test_register_schema(app, dir_factory):
    ext = InvenioJSONSchemas(app, entry_point_group=None)
    schema_files = build_schemas(1)
    with dir_factory(schema_files) as directory:
        registered_schemas = set(list(schema_files.keys())[:1])
        nonregistered_schema = [s for s in schema_files if s not in
                                registered_schemas]
        for schema in registered_schemas:
            ext.register_schema(directory, schema)
        assert set(ext.list_schemas()) == registered_schemas

        for schema in nonregistered_schema:
            with pytest.raises(JSONSchemaNotFound):
                ext.get_schema(schema)


def test_redefine(app, dir_factory):
    ext = InvenioJSONSchemas(app, entry_point_group=None)
    schema_files = build_schemas(1)
    with dir_factory(schema_files) as dir1, \
            dir_factory(schema_files) as dir2:
        ext.register_schemas_dir(dir1)
        # register schemas from a directory which have the same relative
        # paths
        with pytest.raises(JSONSchemaDuplicate) as exc_info:
            ext.register_schemas_dir(dir2)
        assert exc_info.value.schema in schema_files.keys()


def test_view(app, pkg_factory, mock_entry_points):
    """Test view."""
    schema_files_1 = build_schemas(1)
    schema_files_2 = build_schemas(2)
    schema_files_3 = build_schemas(3)

    all_schemas = dict()
    all_schemas.update(schema_files_1)
    all_schemas.update(schema_files_2)
    all_schemas.update(schema_files_3)

    entry_point_group = 'invenio_jsonschema_test_entry_point'
    endpoint = '/testschemas'
    app.config[InvenioJSONSchemas.CONFIG_ENDPOINT] = endpoint
    with pkg_factory(schema_files_1) as pkg1, \
            pkg_factory(schema_files_2) as pkg2, \
            pkg_factory(schema_files_3) as pkg3:
        mock_entry_points.add(entry_point_group, 'entry1', pkg1)
        mock_entry_points.add(entry_point_group, 'entry2', pkg2)
        mock_entry_points.add(entry_point_group, 'entry3', pkg3)
        # Test an alternative way of initializing the app
        # with InvenioJSONSchemas
        ext = InvenioJSONSchemas(entry_point_group=entry_point_group)
        ext = ext.init_app(app)
        # Test if all the schemas are correctly found
        assert set(ext.list_schemas()) == set(all_schemas.keys())

        with app.test_client() as client:
            for name, schema in all_schemas.items():
                res = client.get("{0}/{1}".format(endpoint, name))
                assert res.status_code == 200
                assert json.loads(schema) == \
                    json.loads(res.get_data(as_text=True))
            res = client.get("/nonexisting")
            assert res.status_code == 404


def test_alternative_entry_point_group_init(app, pkg_factory,
                                            mock_entry_points):
    """Test initializing the entry_point_group after creating the extension."""
    schema_files_1 = build_schemas(1)
    schema_files_2 = build_schemas(2)

    all_schemas = dict()
    all_schemas.update(schema_files_1)
    all_schemas.update(schema_files_2)

    entry_point_group = 'invenio_jsonschema_test_entry_point'
    with pkg_factory(schema_files_1) as pkg1, \
            pkg_factory(schema_files_2) as pkg2:
        mock_entry_points.add(entry_point_group, 'entry1', pkg1)
        mock_entry_points.add(entry_point_group, 'entry2', pkg2)
        # Test an alternative way of initializing the app and entry_point_group
        # with InvenioJSONSchemas
        ext = InvenioJSONSchemas()
        ext = ext.init_app(app, entry_point_group=entry_point_group)
        # Test if all the schemas are correctly found
        assert set(ext.list_schemas()) == set(all_schemas.keys())
