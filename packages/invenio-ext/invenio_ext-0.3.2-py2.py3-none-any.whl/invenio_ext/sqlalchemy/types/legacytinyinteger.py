# -*- coding: utf-8 -*-
#
# This file is part of Invenio.
# Copyright (C) 2011, 2012, 2013, 2014, 2015 CERN.
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
# 52 Temple Place, Suite 330, Boston, MA 02111-1307, USA.

"""Platform-independent TinyInteger type."""

from sqlalchemy.dialects.mysql import TINYINT
from sqlalchemy.types import Integer, TypeDecorator


class LegacyTinyInteger(TypeDecorator):

    """Platform-independent TinyInteger type.

    Uses MySQL's :class:`~sqlalchemy.dialects.mysql.TINYINT` type, otherwise
    uses SQLAlchemy definition of :class:`~sqlalchemy.types.Integer`.
    """

    impl = Integer

    def __init__(self, display_width=2, unsigned=False, **kwargs):
        """Reserve special arguments only for MySQL Platform."""
        self.display_width = display_width
        self.unsigned = unsigned
        super(LegacyTinyInteger, self).__init__(**kwargs)

    def load_dialect_impl(self, dialect):
        """Load dialect dependent implementation."""
        if dialect.name == 'mysql':
            return dialect.type_descriptor(TINYINT(self.display_width,
                                                   unsigned=self.unsigned))
        else:
            return dialect.type_descriptor(Integer)
