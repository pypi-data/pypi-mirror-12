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

"""PersistentIdentifier store and registration.

Usage example for registering new identifiers::

    from flask import url_for
    from invenio_pidstore.models import PersistentIdentifier

    # Reserve a new DOI internally first
    pid = PersistentIdentifier.create('doi','10.0572/1234')

    # Get an already reserved DOI
    pid = PersistentIdentifier.get('doi', '10.0572/1234')

    # Assign it to a record.
    pid.assign('rec', 1234)

    url = url_for("record.metadata", recid=1234, _external=True)
    doc = "<resource ...."

    # Pre-reserve the DOI in DataCite
    pid.reserve(doc=doc)

    # Register the DOI (note parameters depended on the provider and pid type)
    pid.register(url=url, doc=doc)

    # Reassign DOI to new record
    pid.assign('rec', 5678, overwrite=True),

    # Update provider with new information
    pid.update(url=url, doc=doc)

    # Delete the DOI (you shouldn't be doing this ;-)
    pid.delete()
"""

from __future__ import absolute_import, print_function

from datetime import datetime

import six
from flask import current_app
from invenio_db import db
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy_utils.models import Timestamp

from .provider import PidProvider, PIDStatus


class PersistentIdentifier(db.Model, Timestamp):
    """Store and register persistent identifiers.

    Assumptions:
      * Persistent identifiers can be represented as a string of max 255 chars.
      * An object has many persistent identifiers.
      * A persistent identifier has one and only one object.
    """

    __tablename__ = 'pidSTORE'
    __table_args__ = (
        db.Index('uidx_type_pid', 'pid_type', 'pid_value', unique=True),
        db.Index('idx_status', 'status'),
        db.Index('idx_object', 'object_type', 'object_value'),
    )

    id = db.Column(
        db.Integer,
        primary_key=True)
    """Id of persistent identifier entry."""

    pid_type = db.Column(db.String(6), nullable=False)
    """Persistent Identifier Schema."""

    pid_value = db.Column(db.String(length=255), nullable=False)
    """Persistent Identifier."""

    pid_provider = db.Column(db.String(length=255), nullable=False)
    """Persistent Identifier Provider"""

    status = db.Column(db.CHAR(length=1), nullable=False)
    """Status of persistent identifier, e.g. registered, reserved, deleted."""

    object_type = db.Column(db.String(3), nullable=True)
    """Object Type - e.g. rec for record."""

    object_value = db.Column(db.String(length=255), nullable=True)
    """Object ID - e.g. a record id."""

    #
    # Class methods
    #
    @classmethod
    def create(cls, pid_type, pid_value, pid_provider='', provider=None):
        """Internally reserve a new persistent identifier.

        A provider for the given persistent identifier type must exists. By
        default the system will choose a provider according to the pid
        type. If desired, the default system provider can be overridden via
        the provider keyword argument.

        Return PID object if successful otherwise None.
        """
        # Ensure provider exists
        if provider is None:
            provider = PidProvider.create(pid_type, pid_value, pid_provider)
            if not provider:
                raise Exception("No provider found for {0}:{1} ({2})".format(
                    pid_type, pid_value, pid_provider))
        try:
            with db.session.begin_nested():
                obj = cls(pid_type=provider.pid_type,
                          pid_value=provider.create_new_pid(pid_value),
                          pid_provider=pid_provider,
                          status=PIDStatus.NEW)
                obj._provider = provider
                db.session.add(obj)
            obj.log("CREATE", "Created")
            return obj
        except SQLAlchemyError:
            obj.log("CREATE", "Failed to create. Already exists.")
            return None

    @classmethod
    def get(cls, pid_type, pid_value, pid_provider='', provider=None):
        """Get persistent identifier.

        Return None if not found.
        """
        pid_value = six.text_type(pid_value)
        obj = cls.query.filter_by(
            pid_type=pid_type, pid_value=pid_value, pid_provider=pid_provider
        ).first()
        if obj:
            obj._provider = provider
            return obj
        else:
            return None

    #
    # Instance methods
    #
    def has_object(self, object_type, object_value):
        """Determine if this PID is assigned to a specific object."""
        if object_type not in current_app.config['PIDSTORE_OBJECT_TYPES']:
            raise Exception("Invalid object type {0}.".format(object_type))

        object_value = six.text_type(object_value)

        return self.object_type == object_type and \
            self.object_value == object_value

    def get_provider(self):
        """Get the provider for this type of persistent identifier."""
        if self._provider is None:
            self._provider = PidProvider.create(
                self.pid_type, self.pid_value, self.pid_provider
            )
        return self._provider

    def assign(self, object_type, object_value, overwrite=False):
        """Assign this persistent identifier to a given object.

        Note, the persistent identifier must first have been reserved. Also,
        if an exsiting object is already assigned to the pid, it will raise an
        exception unless overwrite=True.
        """
        if object_type not in current_app.config['PIDSTORE_OBJECT_TYPES']:
            raise Exception("Invalid object type {0}.".format(object_type))
        object_value = six.text_type(object_value)

        if not self.id:
            raise Exception(
                "You must first create the persistent identifier before you "
                "can assign objects to it."
            )

        if self.is_deleted():
            raise Exception(
                "You cannot assign objects to a deleted persistent identifier."
            )

        with db.session.begin_nested():
            # Check for an existing object assigned to this pid
            existing_obj_id = self.get_assigned_object(object_type)

            if existing_obj_id and existing_obj_id != object_value:
                if not overwrite:
                    raise Exception(
                        "Persistent identifier is already assigned to another "
                        "object"
                    )
                else:
                    self.log("ASSIGN",
                             "Unassigned object {0}:{1} "
                             "(overwrite requested)".format(
                                 self.object_type, self.object_value))
                    self.object_type = None
                    self.object_value = None
            elif existing_obj_id and existing_obj_id == object_value:
                # The object is already assigned to this pid.
                return True

            self.object_type = object_type
            self.object_value = object_value
            self.log("ASSIGN", "Assigned object {0}:{1}".format(
                self.object_type, self.object_value
            ))
            return True

    def update(self, with_deleted=False, *args, **kwargs):
        """Update the persistent identifier with the provider."""
        if self.is_new() or self.is_reserved():
            raise Exception(
                "Persistent identifier has not yet been registered."
            )

        if not with_deleted and self.is_deleted():
            raise Exception("Persistent identifier has been deleted.")

        raise_provider_error = False
        with db.session.begin_nested():
            provider = self.get_provider()
            if provider is None:
                self.log("UPDATE", "No provider found.")
                raise_provider_error = True
            elif provider.update(self, *args, **kwargs):
                if with_deleted and self.is_deleted():
                    self.status = PIDStatus.REGISTERED
                return True
        if raise_provider_error:
            raise Exception("No provider found.")
        else:
            return False

    def reserve(self, *args, **kwargs):
        """Reserve the persistent identifier with the provider.

        Note, the reserve method may be called multiple times, even if it was
        already reserved.
        """
        if not (self.is_new() or self.is_reserved()):
            raise Exception(
                "Persistent identifier has already been registered."
            )

        raise_provider_error = False
        with db.session.begin_nested():
            provider = self.get_provider()
            if provider is None:
                self.log("RESERVE", "No provider found.")
                raise_provider_error = True
            elif provider.reserve(self, *args, **kwargs):
                self.status = PIDStatus.RESERVED
                return True
        if raise_provider_error:
            raise Exception("No provider found.")
        else:
            return False

    def register(self, *args, **kwargs):
        """Register the persistent identifier with the provider."""
        if self.is_registered() or self.is_deleted():
            raise Exception(
                "Persistent identifier has already been registered."
            )

        raise_provider_error = False
        with db.session.begin_nested():
            provider = self.get_provider()
            if provider is None:
                self.log("REGISTER", "No provider found.")
                raise_provider_error = True
            elif provider.register(self, *args, **kwargs):
                self.status = PIDStatus.REGISTERED
                return True
        if raise_provider_error:
            raise Exception("No provider found.")
        else:
            return False

    def delete(self, *args, **kwargs):
        """Delete the persistent identifier."""
        with db.session.begin_nested():
            if self.is_new():
                # New persistent identifier which haven't been registered yet.
                # Just delete it completely but keep log)
                # Remove links to log entries (leave the otherwise)
                PidLog.query.filter_by(id_pid=self.id).update({'id_pid': None})
                db.session.delete(self)
                self.log("DELETE", "Unregistered PID successfully deleted",
                         id_pid_as_null=True)
            else:
                provider = self.get_provider()
                if not provider.delete(self, *args, **kwargs):
                    return False
                self.status = PIDStatus.DELETED
            return True

    def sync_status(self, *args, **kwargs):
        """Synchronize persistent identifier status.

        Used when the provider uses an external service, which might have been
        modified outside of our system.
        """
        with db.session.begin_nested():
            provider = self.get_provider()
            result = provider.sync_status(self, *args, **kwargs)
            return result

    def get_assigned_object(self, object_type=None):
        """Return an assigned object."""
        if object_type is not None and self.object_type == object_type:
            return self.object_value
        return None

    def is_registered(self):
        """Return true if the persistent identifier has been registered."""
        return self.status == PIDStatus.REGISTERED

    def is_deleted(self):
        """Return true if the persistent identifier has been deleted."""
        return self.status == PIDStatus.DELETED

    def is_new(self):
        """Return true if the PIDhas not yet been registered or reserved."""
        return self.status == PIDStatus.NEW

    def is_reserved(self):
        """Return true if the PID has not yet been reserved."""
        return self.status == PIDStatus.RESERVED

    def log(self, action, message, id_pid_as_null=False):
        """
        Store action and message in log.

        If 'id_pid_as_null' the foreign key to PID will not be set.
        """
        if self.pid_type and self.pid_value:
            message = "[{0}:{1}] {2}".format(
                self.pid_type, self.pid_value, message)
        id_pid = None if id_pid_as_null else self.id
        with db.session.begin_nested():
            p = PidLog(id_pid=id_pid, action=action, message=message)
            db.session.add(p)


class PidLog(db.Model):
    """Audit log of actions happening to persistent identifiers.

    This model is primarily used through PersistentIdentifier.log and rarely
    created manually.
    """

    __tablename__ = 'pidLOG'
    __table_args__ = (
        db.Index('idx_action', 'action'),
    )

    id = db.Column(
        db.Integer,
        primary_key=True
    )
    """Id of persistent identifier entry."""

    id_pid = db.Column(
        db.Integer,
        db.ForeignKey(PersistentIdentifier.id),
        nullable=True,
    )
    """PID."""

    timestamp = db.Column(db.DateTime(), nullable=False, default=datetime.now)
    """Creation datetime of entry."""

    action = db.Column(db.String(10), nullable=False)
    """Action identifier."""

    message = db.Column(db.Text(), nullable=False)
    """Log message."""

    # Relationship
    pid = db.relationship("PersistentIdentifier", backref="logs")


__all__ = (
    'PersistentIdentifier',
    'PidLog',
)
