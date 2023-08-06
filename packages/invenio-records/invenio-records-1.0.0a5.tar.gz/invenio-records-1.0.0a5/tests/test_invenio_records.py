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

"""Test Invenio Records."""

from __future__ import absolute_import, print_function

import json
import os
import uuid

import pytest
from click.testing import CliRunner
from flask import Flask
from flask_cli import FlaskCLI, ScriptInfo
from invenio_db import InvenioDB, db
from invenio_db.cli import db as db_cmd
from sqlalchemy.orm.exc import NoResultFound
from sqlalchemy_utils.functions import create_database, database_exists, \
    drop_database

from invenio_records import InvenioRecords, Record, cli
from invenio_records.errors import MissingModelError


def test_version():
    """Test version import."""
    from invenio_records import __version__
    assert __version__


def test_init():
    """Test extension initialization."""
    app = Flask('testapp')
    FlaskCLI(app)
    ext = InvenioRecords(app)
    assert 'invenio-records' in app.extensions

    app = Flask('testapp')
    FlaskCLI(app)
    ext = InvenioRecords()
    assert 'invenio-records' not in app.extensions
    ext.init_app(app)
    assert 'invenio-records' in app.extensions


def test_db():
    """Test database backend."""
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get(
        'SQLALCHEMY_DATABASE_URI', 'sqlite:///test.db'
    )
    FlaskCLI(app)
    InvenioDB(app)
    InvenioRecords(app)

    with app.app_context():
        if not database_exists(db.engine.url):
            create_database(db.engine.url)
        db.create_all()
        assert 'records_metadata' in db.metadata.tables
        assert 'records_metadata_version' in db.metadata.tables
        assert 'transaction' in db.metadata.tables

    schema = {
        'type': 'object',
        'properties': {
            'title': {'type': 'string'},
            'field': {'type': 'boolean'},
            'hello': {'type': 'array'},
        },
        'required': ['title'],
    }
    data = {'title': 'Test', '$schema': schema}
    from invenio_records.models import RecordMetadata as RM

    # Create a record
    with app.app_context():
        assert RM.query.count() == 0

        record_uuid = Record.create(data).id
        db.session.commit()

        assert RM.query.count() == 1
        db.session.commit()

    # Retrieve created record
    with app.app_context():
        record = Record.get_record(record_uuid)
        assert record.dumps() == data
        with pytest.raises(NoResultFound):
            Record.get_record(uuid.uuid4())
        record['field'] = True
        record = record.patch([
            {'op': 'add', 'path': '/hello', 'value': ['world']}
        ])
        assert record['hello'] == ['world']
        record.commit()
        db.session.commit()

    with app.app_context():
        record2 = Record.get_record(record_uuid)
        assert record2.model.version_id == 2
        assert record2['field']
        assert record2['hello'] == ['world']
        db.session.commit()

    # Cannot commit record without model (i.e. Record.create_record)
    with app.app_context():
        record3 = Record({'title': 'Not possible'})
        with pytest.raises(MissingModelError):
            record3.commit()

    with app.app_context():
        db.drop_all()
        drop_database(db.engine.url)


def test_cli(app):
    """Test CLI."""
    runner = CliRunner()
    script_info = ScriptInfo(create_app=lambda info: app)

    assert 'records_metadata' in db.metadata.tables
    assert 'records_metadata_version' in db.metadata.tables
    assert 'transaction' in db.metadata.tables

    from invenio_records.models import RecordMetadata as RM

    # Test merging a base another file.
    with runner.isolated_filesystem():
        with open('record.json', 'wb') as f:
            f.write(json.dumps(
                {"title": "Test"}, ensure_ascii=False
            ).encode('utf-8'))

        with open('record.patch', 'wb') as f:
            f.write(json.dumps([{
                "op": "replace", "path": "/title", "value": "Patched Test"
            }], ensure_ascii=False).encode('utf-8'))

        runner.invoke(db_cmd, ['init'], obj=script_info)
        runner.invoke(db_cmd, ['create'], obj=script_info)

        result = runner.invoke(cli.records, [], obj=script_info)
        assert result.exit_code == 0

        with app.app_context():
            assert RM.query.count() == 0

        result = runner.invoke(cli.records, ['create', 'record.json'],
                               obj=script_info)
        assert result.exit_code == 0

        with app.app_context():
            assert RM.query.count() == 1
            recid = RM.query.first().id

        result = runner.invoke(cli.records,
                               ['patch', 'record.patch', '-r', recid],
                               obj=script_info)
        assert result.exit_code == 0

        with app.app_context():
            record = Record.get_record(recid)
            assert record['title'] == 'Patched Test'
            assert record.model.version_id == 2

        runner.invoke(db_cmd, ['drop', '--yes-i-know'], obj=script_info)
        runner.invoke(db_cmd, ['destroy', '--yes-i-know'], obj=script_info)
