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

import pytest
from click.testing import CliRunner
from flask import Flask
from flask_celeryext import create_celery_app
from flask_cli import FlaskCLI, ScriptInfo
from invenio_db import InvenioDB, db
from invenio_db.cli import db as db_cmd
from sqlalchemy_utils.functions import create_database, drop_database

from invenio_records import InvenioRecords, Record, cli


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

    runner = CliRunner()
    script_info = ScriptInfo(create_app=lambda info: app)

    with app.app_context():
        create_database(db.engine.url)
        db.create_all()
        assert len(db.metadata.tables) == 3

    data = {'recid': 1, 'title': 'Test'}
    from invenio_records.models import Record as RM

    with app.app_context():
        assert RM.query.count() == 0

        Record.create(data)
        db.session.commit()

        assert RM.query.count() == 1
        db.session.commit()

    with app.app_context():
        record = Record.get_record(1)
        assert record.dumps() == data
        with pytest.raises(Exception):
            Record.get_record(2)
        record['field'] = True
        record = record.patch([
            {'op': 'add', 'path': '/hello', 'value': ['world']}
        ])
        assert record['hello'] == ['world']
        record.commit()
        db.session.commit()

    with app.app_context():
        record2 = Record.get_record(1)
        assert record2.model.version_id == 2
        assert record2['field']
        assert record2['hello'] == ['world']
        db.session.commit()

    with app.app_context():
        record3 = Record({'recid': 1})
        record3.commit()
        db.session.commit()

        record = Record.get_record(1)
        assert record.model.version_id == 3
        assert set(record.dumps().keys()) == set(['recid'])
        db.session.commit()

    with app.app_context():
        db.drop_all()
        drop_database(db.engine.url)


def test_cli():
    """Test CLI."""
    app = Flask(__name__)
    app.config.update(
        CELERY_ALWAYS_EAGER=True,
        CELERY_CACHE_BACKEND="memory",
        CELERY_EAGER_PROPAGATES_EXCEPTIONS=True,
        CELERY_RESULT_BACKEND="cache",
        SECRET_KEY="CHANGE_ME",
        SECURITY_PASSWORD_SALT="CHANGE_ME_ALSO",
        SQLALCHEMY_DATABASE_URI=os.environ.get(
            'SQLALCHEMY_DATABASE_URI', 'sqlite:///test.db'
        ),
    )
    FlaskCLI(app)
    InvenioDB(app)
    InvenioRecords(app)

    celery = create_celery_app(app)

    runner = CliRunner()
    script_info = ScriptInfo(create_app=lambda info: app)

    assert len(db.metadata.tables) == 3

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

        result = runner.invoke(cli.records, ['create', 'record.json'],
                               obj=script_info)
        assert result.exit_code == 0

        with app.app_context():
            assert Record.get_record(1)['title'] == 'Test'

        result = runner.invoke(cli.records,
                               ['patch', 'record.patch', '-r', '1'],
                               obj=script_info)
        assert result.exit_code == 0

        with app.app_context():
            record = Record.get_record(1)
            assert record['title'] == 'Patched Test'
            assert record.model.version_id == 2

        runner.invoke(db_cmd, ['drop', '--yes-i-know'], obj=script_info)
        runner.invoke(db_cmd, ['destroy', '--yes-i-know'], obj=script_info)
