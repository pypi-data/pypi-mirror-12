# -*- coding: utf-8 -*-
#
# This file is part of Invenio.
# Copyright (C) 2015 CERN.
#
# Invenio is free software; you can redistribute it and/or
# modify it under the terms of the GNU General Public License as
# published by the Free Software Foundation; either version 2 of the
# License, or (at your option) any later version.
#
# Invenio is distributed in the hope that it will be useful, but
# WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
# General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with Invenio; if not, write to the Free Software Foundation, Inc.,
# 59 Temple Place, Suite 330, Boston, MA 02111-1307, USA.

"""Fixes foreign key relationship."""

from invenio_ext.sqlalchemy import db

from invenio_upgrader.api import op


depends_on = []


def info():
    """Return upgrade recipe information."""
    return "Fixes foreign key relationship."


def do_upgrade():
    """Carry out the upgrade."""
    op.alter_column(
        table_name='oauth2TOKEN',
        column_name='client_id',
        type_=db.String(255),
        existing_nullable=False
    )
    op.alter_column(
        table_name='oauth2TOKEN',
        column_name='user_id',
        type_=db.Integer(15, unsigned=True),
        existing_nullable=False
    )


def estimate():
    """Estimate running time of upgrade in seconds (optional)."""
    return 1


def pre_upgrade():
    """Pre-upgrade checks."""
    pass


def post_upgrade():
    """Post-upgrade checks."""
    pass
