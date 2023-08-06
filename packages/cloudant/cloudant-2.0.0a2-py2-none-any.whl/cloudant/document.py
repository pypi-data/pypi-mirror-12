#!/usr/bin/env python
# Copyright (c) 2015 IBM. All rights reserved.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
"""
_document_

API class for interacting with a document in a database

"""
import json
import posixpath
import urllib
import requests
import copy

from requests.exceptions import HTTPError

from .errors import CloudantException


class Document(dict):
    """
    _Document_

    JSON document object, used to manipulate the documents
    in a couch or cloudant database. In addition to basic CRUD
    style operations this provides a context to edit the document:

    with document:
        document['x'] = 'y'

    :param database: CouchDatabase or CloudantDatabase instance
      that the document belongs to
    :param document_id: optional document ID

    """
    def __init__(self, database, document_id=None):
        super(Document, self).__init__()
        self._cloudant_account = database.cloudant_account
        self._cloudant_database = database
        self._database_host = self._cloudant_account.cloudant_url
        self._database_name = database.database_name
        self.r_session = database.r_session
        self._document_id = document_id
        if self._document_id is not None:
            self['_id'] = self._document_id
        self._encoder = self._cloudant_account.encoder

    @property
    def document_url(self):
        """constructs and returns the document URL"""
        if self._document_id is None:
            return None
        return posixpath.join(
            self._database_host,
            urllib.quote_plus(self._database_name),
            self._document_id
        )

    def exists(self):
        """
        :returns: True if the document exists in the database, otherwise False
        """
        if self._document_id is None:
            return False
        resp = self.r_session.get(self.document_url)
        return resp.status_code == 200

    def json(self):
        """
        :returns: JSON string containing the document data, encoded
            with the encoder specified in the owning account
        """
        return json.dumps(dict(self), cls=self._encoder)

    def create(self):
        """
        _create_

        Create this document on the database server,
        update the _id and _rev fields with those of the newly
        created document

        """
        if self._document_id is not None:
            self['_id'] = self._document_id

        # Ensure that an existing document will not be "updated"
        new_doc = copy.deepcopy(self)
        if new_doc.get('_rev') is not None:
            new_doc.__delitem__('_rev')

        headers = {'Content-Type': 'application/json'}
        resp = self.r_session.post(
            self._cloudant_database.database_url,
            headers=headers,
            data=new_doc.json()
        )
        resp.raise_for_status()
        data = resp.json()
        self._document_id = data['id']
        super(Document, self).__setitem__('_id', data['id'])
        super(Document, self).__setitem__('_rev', data['rev'])
        return

    def fetch(self):
        """
        _fetch_

        Fetch the content of this document from the database and populate
        self with whatever it finds.  A call to fetch will overwrite
        any dictionary content currently in self and populate with content
        found in the database for the document id.
        """
        if self.document_url is None:
            raise CloudantException(
                'A document id is required to fetch document contents.  '
                'Add an _id key and value to the document and re-try.'
            )
        resp = self.r_session.get(self.document_url)
        resp.raise_for_status()
        self.clear()
        self.update(resp.json())

    def save(self):
        """
        _save_

        Save changes made to this objects data structures back to the
        database document, essentially an update CRUD call but we
        dont want to conflict with dict.update

        """
        headers = {}
        headers.setdefault('Content-Type', 'application/json')
        if not self.exists():
            self.create()
            return
        put_resp = self.r_session.put(
            self.document_url,
            data=self.json(),
            headers=headers
        )
        put_resp.raise_for_status()
        data = put_resp.json()
        super(Document, self).__setitem__('_rev', data['rev'])
        return

    # Update Actions
    # These are handy functions to use with update_field below.
    @staticmethod
    def list_field_append(doc, field, value):
        """
        Append a value to a list field in a doc.  If a field does not exists
        it will be created first.
        """
        if doc.get(field) is None:
            doc[field] = []
        if not isinstance(doc[field], list):
            raise CloudantException(
                'The field {0} is not a list.'.format(field)
            )
        if value is not None:
            doc[field].append(value)

    @staticmethod
    def list_field_remove(doc, field, value):
        """
        Remove a value from a list field in a doc.
        """
        if not isinstance(doc[field], list):
            raise CloudantException(
                'The field {0} is not a list.'.format(field)
            )
        doc[field].remove(value)

    @staticmethod
    def field_set(doc, field, value):
        """Set/replace a value for a field in a doc."""
        if value is None:
            doc.__delitem__(field)
        else:
            doc[field] = value

    def _update_field(self, action, field, value, max_tries, tries=0):
        """
        Private update_field method. Wrapped by Document.update_field.
        Tracks a "tries" var to help limit recursion.

        """
        # Refresh our view of the document.
        self.fetch()

        # Update the field.
        action(self, field, value)

        # Attempt to save, retrying conflicts up to max_tries.
        try:
            self.save()
        except requests.HTTPError as ex:
            if tries < max_tries and ex.response.status_code == 409:
                return self._update_field(
                    action, field, value, max_tries, tries=tries+1)
            raise

    def update_field(self, action, field, value, max_tries=10):
        """
        _update_field_

        Update a field in the document. If a conflict exists, re-fetch
        the document, and retry the update.

        Use this when you want to update a single field in a document,
        and don't want to risk clobbering other people's changes to
        the document in other fields, but also don't want the caller
        to implement logic to deal with conflicts.

        @param action callable: A routine that takes three arguments:
            A doc, a field, and a value. The routine should attempt to
            update a field in the doc with the given value, using
            whatever logic is appropriate.
        @param field str: the name of the field to update.
        @param value: the value to update the field with.
        @param max_tries: in the case of a conflict, give up after this
            number of retries.

        For example, the following will append the string "foo" to the
        "words" list in a Cloudant Document.

        doc.update_field(
            action=doc.list_field_append,
            field="words",
            value="foo"
        )

        """
        self._update_field(action, field, value, max_tries)

    def delete(self):
        """
        _delete_

        Delete the document on the remote db.

        """
        if not self.get("_rev"):
            raise CloudantException(
                u"Attempting to delete a doc with no _rev. Try running "
                u".fetch first!"
            )

        del_resp = self.r_session.delete(
            self.document_url,
            params={"rev": self["_rev"]},
        )
        del_resp.raise_for_status()
        self.clear()
        self.__setitem__('_id', self._document_id)
        return

    def __enter__(self):
        """
        support context like editing of document fields
        """

        # We don't want to raise an exception if the document is not found
        # because upon __exit__ the save() call will create the document
        # if necessary.
        try:
            self.fetch()
        except HTTPError as error:
            if error.response.status_code != 404:
                raise

        return self

    def __exit__(self, *args):
        self.save()

    def __setitem__(self, key, value):
        """
        Set the _document_id when setting the '_id' field.
        The _document_id is used to construct the document url.
        """
        if key == '_id':
            self._document_id = value
        super(Document, self).__setitem__(key, value)

    def __delitem__(self, key):
        """
        Set the _document_id to None when deleting the '_id' field.
        """
        if key == '_id':
            self._document_id = None
        super(Document, self).__delitem__(key)

    def get_attachment(
            self,
            attachment,
            headers=None,
            write_to=None,
            attachment_type="json"):
        """
        _get_attachment_

        Retrieve a document's attachment

        :param str attachment: the attachment file name
        :param dict headers: Extra headers to be sent with request
        :param str write_to: File handler to write the attachment to,
          if None do not write. write_to file must be opened for writing.
        :param str attachment_type: Describes the data format of the attachment
          'json' and 'binary' are currently the only expected values.

        """
        # need latest rev
        self.fetch()
        attachment_url = posixpath.join(self.document_url, attachment)
        if headers is None:
            headers = {'If-Match': self['_rev']}
        else:
            headers['If-Match'] = self['_rev']

        resp = self.r_session.get(
            attachment_url,
            headers=headers
        )
        resp.raise_for_status()
        if write_to is not None:
            write_to.write(resp.raw)

        if attachment_type == 'json':
            return resp.json()
        return resp.content

    def delete_attachment(self, attachment, headers=None):
        """
        _delete_attachment_

        Delete an attachment from a document and refresh the local document
        object

        :param str attachment: the attachment file name
        :param dict headers: Extra headers to be sent with request

        """
        # need latest rev
        self.fetch()
        attachment_url = posixpath.join(self.document_url, attachment)
        if headers is None:
            headers = {'If-Match': self['_rev']}
        else:
            headers['If-Match'] = self['_rev']

        resp = self.r_session.delete(
            attachment_url,
            headers=headers
        )
        resp.raise_for_status()
        super(Document, self).__setitem__('_rev', resp.json()['rev'])
        # Execute logic only if attachment metadata exists locally
        if self.get('_attachments'):
            # Remove the attachment metadata for the specified attachment
            if self['_attachments'].get(attachment):
                self['_attachments'].__delitem__(attachment)
            # Remove empty attachment metadata from the local dictionary
            if not self['_attachments']:
                super(Document, self).__delitem__('_attachments')

        return resp.json()

    def put_attachment(self, attachment, content_type, data, headers=None):
        """
        _put_attachment_
        Add a new attachment, or update an existing attachment, to
        the specified document then refresh the local document object.

        :param attachment: name of attachment to be added/updated
        :param content_type: http 'Content-Type' of the attachment
        :param data: attachment data
        :param headers: headers to send with request

        """
        # need latest rev
        self.fetch()
        attachment_url = posixpath.join(self.document_url, attachment)
        if headers is None:
            headers = {
                'If-Match': self['_rev'],
                'Content-Type': content_type
            }
        else:
            headers['If-Match'] = self['_rev']
            headers['Content-Type'] = content_type

        resp = self.r_session.put(
            attachment_url,
            data=data,
            headers=headers
        )
        resp.raise_for_status()
        self.fetch()
        return resp.json()
