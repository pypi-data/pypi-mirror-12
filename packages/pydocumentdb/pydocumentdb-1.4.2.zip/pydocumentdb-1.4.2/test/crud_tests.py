﻿# Copyright (c) Microsoft Corporation.  All rights reserved.

"""End to end test.
"""

import logging
import unittest

import pydocumentdb.documents as documents
import pydocumentdb.document_client as document_client
import pydocumentdb.errors as errors
import pydocumentdb.http_constants as http_constants


# localhost
masterKey = '[YOUR_KEY_HERE]'
host = '[YOUR_ENDPOINT_HERE]'


class CRUDTests(unittest.TestCase):
    """Python CRUD Tests.
    """

    def __AssertHTTPFailureWithStatus(self, status_code, func, *args, **kwargs):
        """Assert HTTP failure with status.

        :Parameters:
            - `status_code`: int
            - `func`: function
        """
        try:
            func(*args, **kwargs)
            self.assertFalse(True, 'function should fail.')
        except errors.HTTPFailure as inst:
            self.assertEqual(inst.status_code, status_code)

    def setUp(self):
        client = document_client.DocumentClient(host,
                                                {'masterKey': masterKey})
        databases = list(client.ReadDatabases())
        if not databases:
            return
        for database in databases:
            client.DeleteDatabase(self.GetDatabaseLink(database, False))

    def test_database_crud_self_link(self):
        self._test_database_crud(False)

    def test_database_crud_name_based(self):
        self._test_database_crud(True)

    def _test_database_crud(self, is_name_based):
        client = document_client.DocumentClient(host,
                                                {'masterKey': masterKey})
        # read databases.
        databases = list(client.ReadDatabases())
        # create a database.
        before_create_databases_count = len(databases)
        database_definition = { 'id': 'sample database' }
        created_db = client.CreateDatabase(database_definition)
        self.assertEqual(created_db['id'], database_definition['id'])
        # Read databases after creation.
        databases = list(client.ReadDatabases())
        self.assertEqual(len(databases),
                         before_create_databases_count + 1,
                         'create should increase the number of databases')
        # query databases.
        databases = list(client.QueryDatabases({
            'query': 'SELECT * FROM root r WHERE r.id=@id',
            'parameters': [
                { 'name':'@id', 'value': database_definition['id'] }
            ]
        }))
        self.assert_(databases,
                     'number of results for the query should be > 0')

        # read database.
        one_db_from_read = client.ReadDatabase(self.GetDatabaseLink(created_db, is_name_based))

        # delete database.
        client.DeleteDatabase(self.GetDatabaseLink(created_db, is_name_based))
        # read database after deletion
        self.__AssertHTTPFailureWithStatus(404,
                                           client.ReadDatabase,
                                           self.GetDatabaseLink(created_db, is_name_based))

    def test_sql_query_crud(self):
        client = document_client.DocumentClient(host, {'masterKey': masterKey})
        # create two databases.
        client.CreateDatabase({ 'id': 'database 1' })
        client.CreateDatabase({ 'id': 'database 2' })
        # query with parameters.
        databases = list(client.QueryDatabases({
            'query': 'SELECT * FROM root r WHERE r.id=@id',
            'parameters': [
                { 'name':'@id', 'value': 'database 1' }
            ]
        }))
        self.assertEqual(1, len(databases), 'Unexpected number of query results.')

        # query without parameters.
        databases = list(client.QueryDatabases({
            'query': 'SELECT * FROM root r WHERE r.id="database non-existing"'
        }))
        self.assertEqual(0, len(databases), 'Unexpected number of query results.')

        # query with a string.
        databases = list(client.QueryDatabases('SELECT * FROM root r WHERE r.id="database 2"'))
        self.assertEqual(1, len(databases), 'Unexpected number of query results.')

    def test_collection_crud_self_link(self):
        self._test_collection_crud(False)

    def test_collection_crud_name_based(self):
        self._test_collection_crud(True)

    def _test_collection_crud(self, is_name_based):
        client = document_client.DocumentClient(host,
                                                {'masterKey': masterKey})
        # create database
        created_db = client.CreateDatabase({ 'id': 'sample database' })
        collections = list(client.ReadCollections(self.GetDatabaseLink(created_db, is_name_based)))
        # create a collection
        before_create_collections_count = len(collections)
        collection_definition = { 'id': 'sample collection', 'indexingPolicy': {'indexingMode': 'consistent'} }
        created_collection = client.CreateCollection(self.GetDatabaseLink(created_db, is_name_based),
                                                     collection_definition)
        self.assertEqual(collection_definition['id'], created_collection['id'])
        self.assertEqual('consistent', created_collection['indexingPolicy']['indexingMode'])

        # read collections after creation
        collections = list(client.ReadCollections(self.GetDatabaseLink(created_db, is_name_based)))
        self.assertEqual(len(collections),
                         before_create_collections_count + 1,
                         'create should increase the number of collections')
        # query collections
        collections = list(client.QueryCollections(
            self.GetDatabaseLink(created_db, is_name_based),
            {
                'query': 'SELECT * FROM root r WHERE r.id=@id',
                'parameters': [
                    { 'name':'@id', 'value': collection_definition['id'] }
                ]
            }))
        # Replacing indexing policy is allowed.
        lazy_policy = {'indexingMode': 'lazy'}
        created_collection['indexingPolicy'] = lazy_policy
        replaced_collection = client.ReplaceCollection(self.GetDocumentCollectionLink(created_db, created_collection, is_name_based), created_collection)
        self.assertEqual('lazy', replaced_collection['indexingPolicy']['indexingMode'])
        # Replacing collection Id should fail.
        change_collection = created_collection.copy()
        change_collection['id'] = 'try_change_id'
        self.__AssertHTTPFailureWithStatus(400,
                                           client.ReplaceCollection,
                                           self.GetDocumentCollectionLink(created_db, created_collection, is_name_based),
                                           change_collection)

        self.assert_(collections)
        # delete collection
        client.DeleteCollection(self.GetDocumentCollectionLink(created_db, created_collection, is_name_based))
        # read collection after deletion
        self.__AssertHTTPFailureWithStatus(404,
                                           client.ReadCollection,
                                           self.GetDocumentCollectionLink(created_db, created_collection, is_name_based))

    
    def test_document_crud_self_link(self):
        self._test_document_crud(False)

    def test_document_crud_name_based(self):
        self._test_document_crud(True)
        
    def _test_document_crud(self, is_name_based):
        client = document_client.DocumentClient(host,
                                                {'masterKey': masterKey})
        # create database
        created_db = client.CreateDatabase({ 'id': 'sample database' })
        # create collection
        created_collection = client.CreateCollection(
            self.GetDatabaseLink(created_db, is_name_based),
            { 'id': 'sample collection' })
        # read documents
        documents = list(client.ReadDocuments(
            self.GetDocumentCollectionLink(created_db, created_collection, is_name_based)))
        # create a document
        before_create_documents_count = len(documents)
        document_definition = {'name': 'sample document',
                               'spam': 'eggs',
                               'key': 'value'}
        # Should throw an error because automatic id generation is disabled.
        self.__AssertHTTPFailureWithStatus(
            400,
            client.CreateDocument,
            self.GetDocumentCollectionLink(created_db, created_collection, is_name_based),
            document_definition,
            {'disableAutomaticIdGeneration': True})

        created_document = client.CreateDocument(
            self.GetDocumentCollectionLink(created_db, created_collection, is_name_based),
            document_definition)
        self.assertEqual(created_document['name'],
                         document_definition['name'])
        self.assertTrue(created_document['id'] != None)
        # duplicated documents are allowed when 'id' is not provided.
        duplicated_document = client.CreateDocument(
            self.GetDocumentCollectionLink(created_db, created_collection, is_name_based),
            document_definition)
        self.assertEqual(duplicated_document['name'],
                         document_definition['name'])
        self.assert_(duplicated_document['id'])
        self.assertNotEqual(duplicated_document['id'],
                            created_document['id'])
        # duplicated documents are not allowed when 'id' is provided.
        duplicated_definition_with_id = document_definition.copy()
        duplicated_definition_with_id['id'] = created_document['id']
        self.__AssertHTTPFailureWithStatus(409,
                                           client.CreateDocument,
                                           self.GetDocumentCollectionLink(created_db, created_collection, is_name_based),
                                           duplicated_definition_with_id)
        # read documents after creation
        documents = list(client.ReadDocuments(
            self.GetDocumentCollectionLink(created_db, created_collection, is_name_based)))
        self.assertEqual(
            len(documents),
            before_create_documents_count + 2,
            'create should increase the number of documents')
        # query documents
        documents = list(client.QueryDocuments(
            self.GetDocumentCollectionLink(created_db, created_collection, is_name_based),
            {
                'query': 'SELECT * FROM root r WHERE r.name=@name',
                'parameters': [
                    { 'name':'@name', 'value':document_definition['name'] }
                ]
            }))
        self.assert_(documents)
        documents = list(client.QueryDocuments(
            self.GetDocumentCollectionLink(created_db, created_collection, is_name_based),
            {
                'query': 'SELECT * FROM root r WHERE r.name=@name',
                'parameters': [
                    { 'name':'@name', 'value':document_definition['name'] }
                ]
            },
            { 'enableScanInQuery': True}))
        self.assert_(documents)
        # replace document.
        created_document['name'] = 'replaced document'
        created_document['spam'] = 'not eggs'
        replaced_document = client.ReplaceDocument(
            self.GetDocumentLink(created_db, created_collection, created_document, is_name_based),
            created_document)
        self.assertEqual(replaced_document['name'],
                         'replaced document',
                         'document id property should change')
        self.assertEqual(replaced_document['spam'],
                         'not eggs',
                         'property should have changed')
        self.assertEqual(created_document['id'],
                         replaced_document['id'],
                         'document id should stay the same')
        # read document
        one_document_from_read = client.ReadDocument(
            self.GetDocumentLink(created_db, created_collection, replaced_document, is_name_based))
        self.assertEqual(replaced_document['id'],
                         one_document_from_read['id'])
        # delete document
        client.DeleteDocument(self.GetDocumentLink(created_db, created_collection, replaced_document, is_name_based))
        # read documents after deletion
        self.__AssertHTTPFailureWithStatus(404,
                                           client.ReadDocument,
                                           self.GetDocumentLink(created_db, created_collection, replaced_document, is_name_based))

    # Upsert test for Document resource - selflink version
    def test_document_upsert_self_link(self):
        self._test_document_upsert(False)

    # Upsert test for Document resource - name based routing version
    def test_document_upsert_name_based(self):
        self._test_document_upsert(True)
        
    def _test_document_upsert(self, is_name_based):
        client = document_client.DocumentClient(host,
                                                {'masterKey': masterKey})

        # create database
        created_db = client.CreateDatabase({ 'id': 'sample database' })

        # create collection
        created_collection = client.CreateCollection(
            self.GetDatabaseLink(created_db, is_name_based),
            { 'id': 'sample collection' })

        # read documents and check count
        documents = list(client.ReadDocuments(
            self.GetDocumentCollectionLink(created_db, created_collection, is_name_based)))
        before_create_documents_count = len(documents)

        # create document definition
        document_definition = {'id': 'doc',
                               'name': 'sample document',
                               'spam': 'eggs',
                               'key': 'value'}

        # create document using Upsert API
        created_document = client.UpsertDocument(
            self.GetDocumentCollectionLink(created_db, created_collection, is_name_based),
            document_definition)

        # verify id property
        self.assertEqual(created_document['id'],
                         document_definition['id'])

        # read documents after creation and verify updated count
        documents = list(client.ReadDocuments(
            self.GetDocumentCollectionLink(created_db, created_collection, is_name_based)))
        self.assertEqual(
            len(documents),
            before_create_documents_count + 1,
            'create should increase the number of documents')

        # update document
        created_document['name'] = 'replaced document'
        created_document['spam'] = 'not eggs'
        
        # should replace document since it already exists
        upserted_document = client.UpsertDocument(
            self.GetDocumentCollectionLink(created_db, created_collection, is_name_based),
            created_document)
        
        # verify the changed properties
        self.assertEqual(upserted_document['name'],
                         created_document['name'],
                         'document id property should change')
        self.assertEqual(upserted_document['spam'],
                         created_document['spam'],
                         'property should have changed')

        # verify id property
        self.assertEqual(upserted_document['id'],
                         created_document['id'],
                         'document id should stay the same')
        
        # read documents after upsert and verify count doesn't increases again
        documents = list(client.ReadDocuments(
            self.GetDocumentCollectionLink(created_db, created_collection, is_name_based)))
        self.assertEqual(
            len(documents),
            before_create_documents_count + 1,
            'number of documents should remain same')

        created_document['id'] = 'new id'

        # Upsert should create new document since the id is different
        new_document = client.UpsertDocument(
            self.GetDocumentCollectionLink(created_db, created_collection, is_name_based),
            created_document)
        
        # verify id property
        self.assertEqual(created_document['id'],
                         new_document['id'],
                         'document id should be same')
        
        # read documents after upsert and verify count increases
        documents = list(client.ReadDocuments(
            self.GetDocumentCollectionLink(created_db, created_collection, is_name_based)))
        self.assertEqual(
            len(documents),
            before_create_documents_count + 2,
            'upsert should increase the number of documents')

        # delete documents
        client.DeleteDocument(self.GetDocumentLink(created_db, created_collection, upserted_document, is_name_based))
        client.DeleteDocument(self.GetDocumentLink(created_db, created_collection, new_document, is_name_based))

        # read documents after delete and verify count is same as original
        documents = list(client.ReadDocuments(
            self.GetDocumentCollectionLink(created_db, created_collection, is_name_based)))
        self.assertEqual(
            len(documents),
            before_create_documents_count,
            'number of documents should remain same')
        

    def test_spatial_index_self_link(self):
        self._test_spatial_index(False);

    def test_spatial_index_name_based(self):
        self._test_spatial_index(True);
        
    def _test_spatial_index(self, is_name_based):
        client = document_client.DocumentClient(host, {'masterKey': masterKey})
        db = client.CreateDatabase({ 'id': 'sample database' })
        # partial policy specified
        collection = client.CreateCollection(
            self.GetDatabaseLink(db, is_name_based),
            {
                'id': 'collection with spatial index',
                'indexingPolicy': {
                    'includedPaths': [
                        {
                            'path': '/"Location"/?',
                            'indexes': [
                                {
                                    'kind': 'Spatial',
                                    'dataType': 'Point'
                                }
                            ]
                        },
                        {
                            'path': '/'
                        }
                    ]
                }
            })
        client.CreateDocument(self.GetDocumentCollectionLink(db, collection, is_name_based), {
            'id': 'loc1',
            'Location': {
                'type': 'Point',
                'coordinates': [ 20.0, 20.0 ]
            }
        })
        client.CreateDocument(self.GetDocumentCollectionLink(db, collection, is_name_based), {
            'id': 'loc2',
            'Location': {
                'type': 'Point',
                'coordinates': [ 100.0, 100.0 ]
            }
        })
        results = list(client.QueryDocuments(
            self.GetDocumentCollectionLink(db, collection, is_name_based),
            "SELECT * FROM root WHERE (ST_DISTANCE(root.Location, {type: 'Point', coordinates: [20.1, 20]}) < 20000) "))
        self.assertEqual(1, len(results))
        self.assertEqual('loc1', results[0]['id'])

    
    def test_attachment_crud_self_link(self):
        self._test_attachment_crud(False);

    def test_attachment_crud_name_based(self):
        self._test_attachment_crud(True);
        
    def _test_attachment_crud(self, is_name_based):
        class ReadableStream(object):
            """Customized file-like stream.
            """

            def __init__(self, chunks = ['first chunk ', 'second chunk']):
                """Initialization.

                :Parameters:
                    - `chunks`: list

                """
                self._chunks = list(chunks)

            def read(self, n=-1):
                """Simulates the read method in a file stream.

                :Parameters:
                    - `n`: int

                :Returns:
                    str

                """
                if self._chunks:
                    return self._chunks.pop(0)
                else:
                    return ''

            def __len__(self):
                """To make len(ReadableStream) work.
                """
                return sum([len(chunk) for chunk in self._chunks])


        # Should do attachment CRUD operations successfully
        client = document_client.DocumentClient(host,
                                                {'masterKey': masterKey})
        # create database
        db = client.CreateDatabase({ 'id': 'sample database' })
        # create collection
        collection = client.CreateCollection(
            self.GetDatabaseLink(db, is_name_based),
            { 'id': 'sample collection' })
        # create document
        document = client.CreateDocument(self.GetDocumentCollectionLink(db, collection, is_name_based),
                                         { 'id': 'sample document',
                                           'spam': 'eggs',
                                           'key': 'value' })
        # list all attachments
        attachments = list(client.ReadAttachments(self.GetDocumentLink(db, collection, document, is_name_based)))
        initial_count = len(attachments)
        valid_media_options = { 'slug': 'attachment name',
                                'contentType': 'application/text' }
        invalid_media_options = { 'slug': 'attachment name',
                                  'contentType': 'junt/test' }
        # create attachment with invalid content-type
        content_stream = ReadableStream()
        self.__AssertHTTPFailureWithStatus(
            400,
            client.CreateAttachmentAndUploadMedia,
            self.GetDocumentLink(db, collection, document, is_name_based),
            content_stream,
            invalid_media_options)
        content_stream = ReadableStream()
        # create streamed attachment with valid content-type
        valid_attachment = client.CreateAttachmentAndUploadMedia(
            self.GetDocumentLink(db, collection, document, is_name_based), content_stream, valid_media_options)
        self.assertEqual(valid_attachment['id'],
                         'attachment name',
                         'id of created attachment should be the'
                         ' same as the one in the request')
        content_stream = ReadableStream()
        # create colliding attachment
        self.__AssertHTTPFailureWithStatus(
            409,
            client.CreateAttachmentAndUploadMedia,
            self.GetDocumentLink(db, collection, document, is_name_based),
            content_stream,
            valid_media_options)

        content_stream = ReadableStream()
        # create attachment with media link
        dynamic_attachment = {
            'id': 'dynamic attachment',
            'media': 'http://xstore.',
            'MediaType': 'Book',
            'Author':'My Book Author',
            'Title':'My Book Title',
            'contentType':'application/text'
        }
        attachment = client.CreateAttachment(self.GetDocumentLink(db, collection, document, is_name_based),
                                             dynamic_attachment)
        self.assertEqual(attachment['MediaType'],
                         'Book',
                         'invalid media type')
        self.assertEqual(attachment['Author'],
                         'My Book Author',
                         'invalid property value')
        # list all attachments
        attachments = list(client.ReadAttachments(self.GetDocumentLink(db, collection, document, is_name_based)))
        self.assertEqual(len(attachments),
                         initial_count + 2,
                         'number of attachments should\'ve increased by 2')
        attachment['Author'] = 'new author'
        # replace the attachment
        client.ReplaceAttachment(self.GetAttachmentLink(db, collection, document, attachment, is_name_based), attachment)
        self.assertEqual(attachment['MediaType'],
                         'Book',
                         'invalid media type')
        self.assertEqual(attachment['Author'],
                         'new author',
                         'invalid property value')
        # read attachment media
        media_response = client.ReadMedia(valid_attachment['media'])
        self.assertEqual(media_response,
                         'first chunk second chunk')
        content_stream = ReadableStream(['modified first chunk ',
                                         'modified second chunk'])
        # update attachment media
        client.UpdateMedia(valid_attachment['media'],
                           content_stream,
                           valid_media_options)
        # read attachment media after update
        # read media buffered
        media_response = client.ReadMedia(valid_attachment['media'])
        self.assertEqual(media_response,
                         'modified first chunk modified second chunk')
        # read media streamed
        client.connection_policy.MediaReadMode = (
            documents.MediaReadMode.Streamed)
        media_response = client.ReadMedia(valid_attachment['media'])
        self.assertEqual(media_response.read(),
                         'modified first chunk modified second chunk')
        # share attachment with a second document
        document = client.CreateDocument(self.GetDocumentCollectionLink(db, collection, is_name_based),
                                         {'id': 'document 2'})
        second_attachment = {
            'id': valid_attachment['id'],
            'contentType': valid_attachment['contentType'],
            'media': valid_attachment['media'] }
        attachment = client.CreateAttachment(self.GetDocumentLink(db, collection, document, is_name_based),
                                             second_attachment)
        self.assertEqual(valid_attachment['id'],
                         attachment['id'],
                         'id mismatch')
        self.assertEqual(valid_attachment['media'],
                         attachment['media'],
                         'media mismatch')
        self.assertEqual(valid_attachment['contentType'],
                         attachment['contentType'],
                         'contentType mismatch')
        # deleting attachment
        client.DeleteAttachment(self.GetAttachmentLink(db, collection, document, attachment, is_name_based))
        # read attachments after deletion
        attachments = list(client.ReadAttachments(self.GetDocumentLink(db, collection, document, is_name_based)))
        self.assertEqual(len(attachments), 0)

    # Upsert test for Attachment resource - selflink version
    def test_attachment_upsert_self_link(self):
        self._test_attachment_upsert(False);

    # Upsert test for Attachment resource - name based routing version
    def test_attachment_upsert_name_based(self):
        self._test_attachment_upsert(True);
        
    def _test_attachment_upsert(self, is_name_based):
        class ReadableStream(object):
            """Customized file-like stream.
            """

            def __init__(self, chunks = ['first chunk ', 'second chunk']):
                """Initialization.

                :Parameters:
                    - `chunks`: list

                """
                self._chunks = list(chunks)

            def read(self, n=-1):
                """Simulates the read method in a file stream.

                :Parameters:
                    - `n`: int

                :Returns:
                    str

                """
                if self._chunks:
                    return self._chunks.pop(0)
                else:
                    return ''

            def __len__(self):
                """To make len(ReadableStream) work.
                """
                return sum([len(chunk) for chunk in self._chunks])

        client = document_client.DocumentClient(host,
                                                {'masterKey': masterKey})
        
        # create database
        db = client.CreateDatabase({ 'id': 'sample database' })
        
        # create collection
        collection = client.CreateCollection(
            self.GetDatabaseLink(db, is_name_based),
            { 'id': 'sample collection' })
        
        # create document
        document = client.CreateDocument(self.GetDocumentCollectionLink(db, collection, is_name_based),
                                         { 'id': 'sample document',
                                           'spam': 'eggs',
                                           'key': 'value' })
        
        # list all attachments and check count
        attachments = list(client.ReadAttachments(self.GetDocumentLink(db, collection, document, is_name_based)))
        initial_count = len(attachments)
        
        valid_media_options = { 'slug': 'attachment name',
                                'contentType': 'application/text' }
        content_stream = ReadableStream()
        
        # create streamed attachment with valid content-type using Upsert API
        valid_attachment = client.UpsertAttachmentAndUploadMedia(
            self.GetDocumentLink(db, collection, document, is_name_based), content_stream, valid_media_options)
        
        # verify id property
        self.assertEqual(valid_attachment['id'],
                         'attachment name',
                         'id of created attachment should be the same')

        valid_media_options = { 'slug': 'new attachment name',
                                'contentType': 'application/text' }
        content_stream = ReadableStream()
        
        # Upsert should create new attachment since since id is different
        new_valid_attachment = client.UpsertAttachmentAndUploadMedia(
            self.GetDocumentLink(db, collection, document, is_name_based), content_stream, valid_media_options)
        
        # verify id property
        self.assertEqual(new_valid_attachment['id'],
                         'new attachment name',
                         'id of new attachment should be the same')

        # read all attachments and verify updated count
        attachments = list(client.ReadAttachments(self.GetDocumentLink(db, collection, document, is_name_based)))
        self.assertEqual(len(attachments),
                         initial_count + 2,
                         'number of attachments should have increased by 2')
        
        # create attachment with media link
        attachment_definition = {
            'id': 'dynamic attachment',
            'media': 'http://xstore.',
            'MediaType': 'Book',
            'Author':'My Book Author',
            'Title':'My Book Title',
            'contentType':'application/text'
        }

        # create dynamic attachment using Upsert API
        dynamic_attachment = client.UpsertAttachment(self.GetDocumentLink(db, collection, document, is_name_based),
                                             attachment_definition)

        # verify id property
        self.assertEqual(dynamic_attachment['id'],
                         attachment_definition['id'],
                         'id of attachment should be the same')

        # read all attachments and verify updated count
        attachments = list(client.ReadAttachments(self.GetDocumentLink(db, collection, document, is_name_based)))
        self.assertEqual(len(attachments),
                         initial_count + 3,
                         'number of attachments should have increased by 3')

        dynamic_attachment['Author'] = 'new author'
        
        # replace the attachment using Upsert API
        upserted_attachment = client.UpsertAttachment(self.GetDocumentLink(db, collection, document, is_name_based), dynamic_attachment)

        # verify id property remains same
        self.assertEqual(dynamic_attachment['id'],
                         upserted_attachment['id'],
                         'id should stay the same')

        # verify author property gets updated
        self.assertEqual(upserted_attachment['Author'],
                         dynamic_attachment['Author'],
                         'invalid property value')

        # read all attachments and verify count doesn't increases again
        attachments = list(client.ReadAttachments(self.GetDocumentLink(db, collection, document, is_name_based)))
        self.assertEqual(len(attachments),
                         initial_count + 3,
                         'number of attachments should remain same')

        dynamic_attachment['id'] = 'new dynamic attachment'
        
        # Upsert should create new attachment since id is different
        new_attachment = client.UpsertAttachment(self.GetDocumentLink(db, collection, document, is_name_based), dynamic_attachment)

        # verify id property remains same
        self.assertEqual(dynamic_attachment['id'],
                         new_attachment['id'],
                         'id should be same')

        # read all attachments and verify count increases
        attachments = list(client.ReadAttachments(self.GetDocumentLink(db, collection, document, is_name_based)))
        self.assertEqual(len(attachments),
                         initial_count + 4,
                         'number of attachments should have increased')

        # deleting attachments
        client.DeleteAttachment(self.GetAttachmentLink(db, collection, document, valid_attachment, is_name_based))
        client.DeleteAttachment(self.GetAttachmentLink(db, collection, document, new_valid_attachment, is_name_based))
        client.DeleteAttachment(self.GetAttachmentLink(db, collection, document, upserted_attachment, is_name_based))
        client.DeleteAttachment(self.GetAttachmentLink(db, collection, document, new_attachment, is_name_based))

        # read all attachments and verify count remains same
        attachments = list(client.ReadAttachments(self.GetDocumentLink(db, collection, document, is_name_based)))
        self.assertEqual(len(attachments),
                         initial_count,
                         'number of attachments should remain the same')
        

    def test_user_crud_self_link(self):
        self._test_user_crud(False);

    def test_user_crud_name_based(self):
        self._test_user_crud(True);
        
    def _test_user_crud(self, is_name_based):
        # Should do User CRUD operations successfully.
        client = document_client.DocumentClient(host,
                                                {'masterKey': masterKey})
        # create database
        db = client.CreateDatabase({ 'id': 'sample database' })
        # list users
        users = list(client.ReadUsers(self.GetDatabaseLink(db, is_name_based)))
        before_create_count = len(users)
        # create user
        user = client.CreateUser(self.GetDatabaseLink(db, is_name_based), { 'id': 'new user' })
        self.assertEqual(user['id'], 'new user', 'user id error')
        # list users after creation
        users = list(client.ReadUsers(self.GetDatabaseLink(db, is_name_based)))
        self.assertEqual(len(users), before_create_count + 1)
        # query users
        results = list(client.QueryUsers(
            self.GetDatabaseLink(db, is_name_based),
            {
                'query': 'SELECT * FROM root r WHERE r.id=@id',
                'parameters': [
                    { 'name':'@id', 'value':'new user' }
                ]
            }))
        self.assert_(results)

        # replace user
        change_user = user.copy()
        user['id'] = 'replaced user'
        replaced_user = client.ReplaceUser(self.GetUserLink(db, change_user, is_name_based), user)
        self.assertEqual(replaced_user['id'],
                         'replaced user',
                         'user id should change')
        self.assertEqual(user['id'],
                         replaced_user['id'],
                         'user id should stay the same')
        # read user
        user = client.ReadUser(self.GetUserLink(db, replaced_user, is_name_based))
        self.assertEqual(replaced_user['id'], user['id'])
        # delete user
        client.DeleteUser(self.GetUserLink(db, user, is_name_based))
        # read user after deletion
        self.__AssertHTTPFailureWithStatus(404,
                                           client.ReadUser,
                                           self.GetUserLink(db, user, is_name_based))

    
    # Upsert test for User resource - selflink version
    def test_user_upsert_self_link(self):
        self._test_user_upsert(False);

    # Upsert test for User resource - named based routing version
    def test_user_upsert_name_based(self):
        self._test_user_upsert(True);
        
    def _test_user_upsert(self, is_name_based):
        client = document_client.DocumentClient(host,
                                                {'masterKey': masterKey})
        
        # create database
        db = client.CreateDatabase({ 'id': 'sample database' })
        
        # read users and check count
        users = list(client.ReadUsers(self.GetDatabaseLink(db, is_name_based)))
        before_create_count = len(users)
        
        # create user using Upsert API
        user = client.UpsertUser(self.GetDatabaseLink(db, is_name_based), { 'id': 'user' })

        # verify id property
        self.assertEqual(user['id'], 'user', 'user id error')
        
        # read users after creation and verify updated count
        users = list(client.ReadUsers(self.GetDatabaseLink(db, is_name_based)))
        self.assertEqual(len(users), before_create_count + 1)
        
        # Should replace the user since it already exists, there is no public property to change here
        upserted_user = client.UpsertUser(self.GetDatabaseLink(db, is_name_based), user)
        
        # verify id property
        self.assertEqual(upserted_user['id'],
                         user['id'],
                         'user id should remain same')

        # read users after upsert and verify count doesn't increases again
        users = list(client.ReadUsers(self.GetDatabaseLink(db, is_name_based)))
        self.assertEqual(len(users), before_create_count + 1)

        user['id'] = 'new user'

        # Upsert should create new user since id is different
        new_user = client.UpsertUser(self.GetDatabaseLink(db, is_name_based), user)

        # verify id property
        self.assertEqual(new_user['id'], user['id'], 'user id error')
        
        # read users after upsert and verify count increases
        users = list(client.ReadUsers(self.GetDatabaseLink(db, is_name_based)))
        self.assertEqual(len(users), before_create_count + 2)

        # delete users
        client.DeleteUser(self.GetUserLink(db, upserted_user, is_name_based))
        client.DeleteUser(self.GetUserLink(db, new_user, is_name_based))

        # read users after delete and verify count remains the same
        users = list(client.ReadUsers(self.GetDatabaseLink(db, is_name_based)))
        self.assertEqual(len(users), before_create_count)


    def test_permission_crud_self_link(self):
        self._test_permission_crud(False);

    def test_permission_crud_name_based(self):
        self._test_permission_crud(True);
        
    def _test_permission_crud(self, is_name_based):
        # Should do Permission CRUD operations successfully
        client = document_client.DocumentClient(host,
                                                {'masterKey': masterKey})
        # create database
        db = client.CreateDatabase({ 'id': 'sample database' })
        # create user
        user = client.CreateUser(self.GetDatabaseLink(db, is_name_based), { 'id': 'new user' })
        # list permissions
        permissions = list(client.ReadPermissions(self.GetUserLink(db, user, is_name_based)))
        before_create_count = len(permissions)
        permission = {
            'id': 'new permission',
            'permissionMode': documents.PermissionMode.Read,
            'resource': 'dbs/AQAAAA==/colls/AQAAAJ0fgTc='  # A random one.
        }
        # create permission
        permission = client.CreatePermission(self.GetUserLink(db, user, is_name_based), permission)
        self.assertEqual(permission['id'],
                         'new permission',
                         'permission id error')
        # list permissions after creation
        permissions = list(client.ReadPermissions(self.GetUserLink(db, user, is_name_based)))
        self.assertEqual(len(permissions), before_create_count + 1)
        # query permissions
        results = list(client.QueryPermissions(
            self.GetUserLink(db, user, is_name_based),
            {
                'query': 'SELECT * FROM root r WHERE r.id=@id',
                'parameters': [
                    { 'name':'@id', 'value':permission['id'] }
                ]
            }))
        self.assert_(results)

        # replace permission
        change_permission = permission.copy()
        permission['id'] = 'replaced permission'
        replaced_permission = client.ReplacePermission(self.GetPermissionLink(db, user, change_permission, is_name_based),
                                                       permission)
        self.assertEqual(replaced_permission['id'],
                         'replaced permission',
                         'permission id should change')
        self.assertEqual(permission['id'],
                         replaced_permission['id'],
                         'permission id should stay the same')
        # read permission
        permission = client.ReadPermission(self.GetPermissionLink(db, user, replaced_permission, is_name_based))
        self.assertEqual(replaced_permission['id'], permission['id'])
        # delete permission
        client.DeletePermission(self.GetPermissionLink(db, user, replaced_permission, is_name_based))
        # read permission after deletion
        self.__AssertHTTPFailureWithStatus(404,
                                           client.ReadPermission,
                                           self.GetPermissionLink(db, user, permission, is_name_based))

    # Upsert test for Permission resource - selflink version
    def test_permission_upsert_self_link(self):
        self._test_permission_upsert(False);

    # Upsert test for Permission resource - name based routing version
    def test_permission_upsert_name_based(self):
        self._test_permission_upsert(True);
        
    def _test_permission_upsert(self, is_name_based):
        client = document_client.DocumentClient(host,
                                                {'masterKey': masterKey})
        
        # create database
        db = client.CreateDatabase({ 'id': 'sample database' })
        
        # create user
        user = client.CreateUser(self.GetDatabaseLink(db, is_name_based), { 'id': 'new user' })
        
        # read permissions and check count
        permissions = list(client.ReadPermissions(self.GetUserLink(db, user, is_name_based)))
        before_create_count = len(permissions)
        
        permission_definition = {
            'id': 'permission',
            'permissionMode': documents.PermissionMode.Read,
            'resource': 'dbs/AQAAAA==/colls/AQAAAJ0fgTc='  # A random one.
        }
        
        # create permission using Upsert API
        created_permission = client.UpsertPermission(self.GetUserLink(db, user, is_name_based), permission_definition)
        
        # verify id property
        self.assertEqual(created_permission['id'],
                         permission_definition['id'],
                         'permission id error')
        
        # read permissions after creation and verify updated count
        permissions = list(client.ReadPermissions(self.GetUserLink(db, user, is_name_based)))
        self.assertEqual(len(permissions), before_create_count + 1)
        
        # update permission mode
        permission_definition['permissionMode'] = documents.PermissionMode.All

        # should repace the permission since it already exists
        upserted_permission = client.UpsertPermission(self.GetUserLink(db, user, is_name_based),
                                                       permission_definition)
        # verify id property
        self.assertEqual(upserted_permission['id'],
                         created_permission['id'],
                         'permission id should remain same')
        
        # verify changed property
        self.assertEqual(upserted_permission['permissionMode'],
                         permission_definition['permissionMode'],
                         'permissionMode should change')
        
        # read permissions and verify count doesn't increases again
        permissions = list(client.ReadPermissions(self.GetUserLink(db, user, is_name_based)))
        self.assertEqual(len(permissions), before_create_count + 1)

        # update permission id
        created_permission['id'] = 'new permission'
        # resource needs to be changed along with the id in order to create a new permission
        created_permission['resource'] = 'dbs/N9EdAA==/colls/N9EdAIugXgA='

        # should create new permission since id has changed
        new_permission = client.UpsertPermission(self.GetUserLink(db, user, is_name_based),
                                                       created_permission)
        # verify id and resource property
        self.assertEqual(new_permission['id'],
                         created_permission['id'],
                         'permission id should be same')

        self.assertEqual(new_permission['resource'],
                         created_permission['resource'],
                         'permission resource should be same')
        
        # read permissions and verify count increases
        permissions = list(client.ReadPermissions(self.GetUserLink(db, user, is_name_based)))
        self.assertEqual(len(permissions), before_create_count + 2)

        # delete permissions
        client.DeletePermission(self.GetPermissionLink(db, user, upserted_permission, is_name_based))
        client.DeletePermission(self.GetPermissionLink(db, user, new_permission, is_name_based))

        # read permissions and verify count remains the same
        permissions = list(client.ReadPermissions(self.GetUserLink(db, user, is_name_based)))
        self.assertEqual(len(permissions), before_create_count)

    
    def test_authorization(self):
        def __SetupEntities(client):
            """Sets up entities for this test.

            :Parameters:
                - `client`: document_client.DocumentClient

            :Returns:
                dict

            """
            # create database
            db = client.CreateDatabase({ 'id': 'sample database' })
            # create collection1
            collection1 = client.CreateCollection(
                db['_self'], { 'id': 'sample collection' })
            # create document1
            document1 = client.CreateDocument(collection1['_self'],
                                              { 'id': 'coll1doc1',
                                                'spam': 'eggs',
                                                'key': 'value' })
            # create document 2
            document2 = client.CreateDocument(
                collection1['_self'],
                { 'id': 'coll1doc2', 'spam': 'eggs2', 'key': 'value2' })
            # create attachment
            dynamic_attachment = {
                'id': 'dynamic attachment',
                'media': 'http://xstore.',
                'MediaType': 'Book',
                'Author': 'My Book Author',
                'Title': 'My Book Title',
                'contentType': 'application/text'
            }
            attachment = client.CreateAttachment(document1['_self'],
                                                 dynamic_attachment)
            # create collection 2
            collection2 = client.CreateCollection(
                db['_self'],
                { 'id': 'sample collection2' })
            # create user1
            user1 = client.CreateUser(db['_self'], { 'id': 'user1' })
            permission = {
                'id': 'permission On Coll1',
                'permissionMode': documents.PermissionMode.Read,
                'resource': collection1['_self']
            }
            # create permission for collection1
            permission_on_coll1 = client.CreatePermission(user1['_self'],
                                                          permission)
            self.assertTrue(permission_on_coll1['_token'] != None,
                            'permission token is invalid')
            permission = {
                'id': 'permission On Doc1',
                'permissionMode': documents.PermissionMode.All,
                'resource': document2['_self']
            }
            # create permission for document 2
            permission_on_doc2 = client.CreatePermission(user1['_self'],
                                                         permission)
            self.assertTrue(permission_on_doc2['_token'] != None,
                            'permission token is invalid')
            # create user 2
            user2 = client.CreateUser(db['_self'], { 'id': 'user2' })
            permission = {
                'id': 'permission On coll2',
                'permissionMode': documents.PermissionMode.All,
                'resource': collection2['_self']
            }
            # create permission on collection 2
            permission_on_coll2 = client.CreatePermission(
                user2['_self'], permission)
            entities = {
                'db': db,
                'coll1': collection1,
                'coll2': collection2,
                'doc1': document1,
                'doc2': document2,
                'user1': user1,
                'user2': user2,
                'attachment': attachment,
                'permissionOnColl1': permission_on_coll1,
                'permissionOnDoc2': permission_on_doc2,
                'permissionOnColl2': permission_on_coll2
            }
            return entities

        # Client without any authorization will fail.
        client = document_client.DocumentClient(host, {})
        self.__AssertHTTPFailureWithStatus(401,
                                           list,
                                           client.ReadDatabases())
        # Client with master key.
        client = document_client.DocumentClient(host,
                                                {'masterKey': masterKey})
        # setup entities
        entities = __SetupEntities(client)
        resource_tokens = {}
        resource_tokens[entities['coll1']['_rid']] = (
            entities['permissionOnColl1']['_token'])
        resource_tokens[entities['doc1']['_rid']] = (
            entities['permissionOnColl1']['_token'])
        col1_client = document_client.DocumentClient(
            host, {'resourceTokens': resource_tokens})
        # 1. Success-- Use Col1 Permission to Read
        success_coll1 = col1_client.ReadCollection(
            entities['coll1']['_self'])
        # 2. Failure-- Use Col1 Permission to delete
        self.__AssertHTTPFailureWithStatus(403,
                                           col1_client.DeleteCollection,
                                           success_coll1['_self'])
        # 3. Success-- Use Col1 Permission to Read All Docs
        success_documents = list(col1_client.ReadDocuments(
            success_coll1['_self']))
        self.assertTrue(success_documents != None,
                        'error reading documents')
        self.assertEqual(len(success_documents),
                         2,
                         'Expected 2 Documents to be succesfully read')
        # 4. Success-- Use Col1 Permission to Read Col1Doc1
        success_doc = col1_client.ReadDocument(entities['doc1']['_self'])
        self.assertTrue(success_doc != None, 'error reading document')
        self.assertEqual(
            success_doc['id'],
            entities['doc1']['id'],
            'Expected to read children using parent permissions')
        col2_client = document_client.DocumentClient(
            host,
            { 'permissionFeed': [ entities['permissionOnColl2'] ] })
        doc = {
            'id': 'new doc',
            'CustomProperty1': 'BBBBBB',
            'customProperty2': 1000,
            'id': entities['doc2']['id']
        }
        success_doc = col2_client.CreateDocument(
            entities['coll2']['_self'], doc)
        self.assertTrue(success_doc != None, 'error creating document')
        self.assertEqual(success_doc['CustomProperty1'],
                         doc['CustomProperty1'],
                         'document should have been created successfully')

    def test_trigger_crud_self_link(self):
        self._test_trigger_crud(False);

    def test_trigger_crud_name_based(self):
        self._test_trigger_crud(True);
        
    def _test_trigger_crud(self, is_name_based):
        client = document_client.DocumentClient(host,
                                                {'masterKey': masterKey})
        # create database
        db = client.CreateDatabase({ 'id': 'sample database' })
        # create collection
        collection = client.CreateCollection(
            self.GetDatabaseLink(db, is_name_based),
            { 'id': 'sample collection' })
        # read triggers
        triggers = list(client.ReadTriggers(self.GetDocumentCollectionLink(db, collection, is_name_based)))
        # create a trigger
        before_create_triggers_count = len(triggers)
        trigger_definition = {
            'id': 'sample trigger',
            'serverScript': 'function() {var x = 10;}',
            'triggerType': documents.TriggerType.Pre,
            'triggerOperation': documents.TriggerOperation.All
        }
        trigger = client.CreateTrigger(self.GetDocumentCollectionLink(db, collection, is_name_based),
                                       trigger_definition)
        for property in trigger_definition:
            if property != "serverScript":
                self.assertEqual(
                    trigger[property],
                    trigger_definition[property],
                    'property {property} should match'.format(property=property))
            else:
                    self.assertEqual(trigger['body'],
                                     'function() {var x = 10;}')

        # read triggers after creation
        triggers = list(client.ReadTriggers(self.GetDocumentCollectionLink(db, collection, is_name_based)))
        self.assertEqual(len(triggers),
                         before_create_triggers_count + 1,
                         'create should increase the number of triggers')
        # query triggers
        triggers = list(client.QueryTriggers(
            self.GetDocumentCollectionLink(db, collection, is_name_based),
            {
                'query': 'SELECT * FROM root r WHERE r.id=@id',
                'parameters': [
                    { 'name': '@id', 'value': trigger_definition['id']}
                ]
            }))
        self.assert_(triggers)

        # replace trigger
        change_trigger = trigger.copy()
        trigger['body'] = 'function() {var x = 20;}'
        replaced_trigger = client.ReplaceTrigger(self.GetTriggerLink(db, collection, change_trigger, is_name_based), trigger)
        for property in trigger_definition:
            if property != "serverScript":
                self.assertEqual(
                    replaced_trigger[property],
                    trigger[property],
                    'property {property} should match'.format(property=property))
            else:
                self.assertEqual(replaced_trigger['body'],
                                 'function() {var x = 20;}')

        # read trigger
        trigger = client.ReadTrigger(self.GetTriggerLink(db, collection, replaced_trigger, is_name_based))
        self.assertEqual(replaced_trigger['id'], trigger['id'])
        # delete trigger
        res = client.DeleteTrigger(self.GetTriggerLink(db, collection, replaced_trigger, is_name_based))
        # read triggers after deletion
        self.__AssertHTTPFailureWithStatus(404,
                                           client.ReadTrigger,
                                           self.GetTriggerLink(db, collection, replaced_trigger, is_name_based))

    # Upsert test for Trigger resource - selflink version
    def test_trigger_upsert_self_link(self):
        self._test_trigger_upsert(False);

    # Upsert test for Trigger resource - name based routing version
    def test_trigger_upsert_name_based(self):
        self._test_trigger_upsert(True);
        
    def _test_trigger_upsert(self, is_name_based):
        client = document_client.DocumentClient(host,
                                                {'masterKey': masterKey})
        
        # create database
        db = client.CreateDatabase({ 'id': 'sample database' })
        
        # create collection
        collection = client.CreateCollection(
            self.GetDatabaseLink(db, is_name_based),
            { 'id': 'sample collection' })
        
        # read triggers and check count
        triggers = list(client.ReadTriggers(self.GetDocumentCollectionLink(db, collection, is_name_based)))
        before_create_triggers_count = len(triggers)

        # create a trigger
        trigger_definition = {
            'id': 'sample trigger',
            'serverScript': 'function() {var x = 10;}',
            'triggerType': documents.TriggerType.Pre,
            'triggerOperation': documents.TriggerOperation.All
        }

        # create trigger using Upsert API
        created_trigger = client.UpsertTrigger(self.GetDocumentCollectionLink(db, collection, is_name_based),
                                       trigger_definition)

        # verify id property
        self.assertEqual(created_trigger['id'],
                         trigger_definition['id'])

        # read triggers after creation and verify updated count
        triggers = list(client.ReadTriggers(self.GetDocumentCollectionLink(db, collection, is_name_based)))
        self.assertEqual(len(triggers),
                         before_create_triggers_count + 1,
                         'create should increase the number of triggers')
        
        # update trigger
        created_trigger['body'] = 'function() {var x = 20;}'

        # should replace trigger since it already exists
        upserted_trigger = client.UpsertTrigger(self.GetDocumentCollectionLink(db, collection, is_name_based), created_trigger)

        # verify id property
        self.assertEqual(created_trigger['id'],
                         upserted_trigger['id'])

        # verify changed properties
        self.assertEqual(upserted_trigger['body'],
                                 created_trigger['body'])

        # read triggers after upsert and verify count remains same
        triggers = list(client.ReadTriggers(self.GetDocumentCollectionLink(db, collection, is_name_based)))
        self.assertEqual(len(triggers),
                         before_create_triggers_count + 1,
                         'upsert should keep the number of triggers same')

        # update trigger
        created_trigger['id'] = 'new trigger'

        # should create new trigger since id is changed
        new_trigger = client.UpsertTrigger(self.GetDocumentCollectionLink(db, collection, is_name_based), created_trigger)

        # verify id property
        self.assertEqual(created_trigger['id'],
                         new_trigger['id'])

        # read triggers after upsert and verify count increases
        triggers = list(client.ReadTriggers(self.GetDocumentCollectionLink(db, collection, is_name_based)))
        self.assertEqual(len(triggers),
                         before_create_triggers_count + 2,
                         'upsert should increase the number of triggers')
        
        # delete triggers
        res = client.DeleteTrigger(self.GetTriggerLink(db, collection, upserted_trigger, is_name_based))
        res = client.DeleteTrigger(self.GetTriggerLink(db, collection, new_trigger, is_name_based))

        # read triggers after delete and verify count remains the same
        triggers = list(client.ReadTriggers(self.GetDocumentCollectionLink(db, collection, is_name_based)))
        self.assertEqual(len(triggers),
                         before_create_triggers_count,
                         'delete should bring the number of triggers to original')


    def test_udf_crud_self_link(self):
        self._test_udf_crud(False);

    def test_udf_crud_name_based(self):
        self._test_udf_crud(True);
        
    def _test_udf_crud(self, is_name_based):
        client = document_client.DocumentClient(host,
                                                {'masterKey': masterKey})
        # create database
        db = client.CreateDatabase({ 'id': 'sample database' })
        # create collection
        collection = client.CreateCollection(
            self.GetDatabaseLink(db, is_name_based),
            { 'id': 'sample collection' })
        # read udfs
        udfs = list(client.ReadUserDefinedFunctions(self.GetDocumentCollectionLink(db, collection, is_name_based)))
        # create a udf
        before_create_udfs_count = len(udfs)
        udf_definition = {
            'id': 'sample udf',
            'body': 'function() {var x = 10;}'
        }
        udf = client.CreateUserDefinedFunction(self.GetDocumentCollectionLink(db, collection, is_name_based),
                                               udf_definition)
        for property in udf_definition:
                self.assertEqual(
                    udf[property],
                    udf_definition[property],
                    'property {property} should match'.format(property=property))

        # read udfs after creation
        udfs = list(client.ReadUserDefinedFunctions(self.GetDocumentCollectionLink(db, collection, is_name_based)))
        self.assertEqual(len(udfs),
                         before_create_udfs_count + 1,
                         'create should increase the number of udfs')
        # query udfs
        results = list(client.QueryUserDefinedFunctions(
            self.GetDocumentCollectionLink(db, collection, is_name_based),
            {
                'query': 'SELECT * FROM root r WHERE r.id=@id',
                'parameters': [
                    {'name':'@id', 'value':udf_definition['id']}
                ]
            }))
        self.assert_(results)
        # replace udf
        change_udf = udf.copy()
        udf['body'] = 'function() {var x = 20;}'
        replaced_udf = client.ReplaceUserDefinedFunction(self.GetUserDefinedFunctionLink(db, collection, change_udf, is_name_based), udf)
        for property in udf_definition:
                self.assertEqual(
                    replaced_udf[property],
                    udf[property],
                    'property {property} should match'.format(property=property))
        # read udf
        udf = client.ReadUserDefinedFunction(self.GetUserDefinedFunctionLink(db, collection, replaced_udf, is_name_based))
        self.assertEqual(replaced_udf['id'], udf['id'])
        # delete udf
        res = client.DeleteUserDefinedFunction(self.GetUserDefinedFunctionLink(db, collection, replaced_udf, is_name_based))
        # read udfs after deletion
        self.__AssertHTTPFailureWithStatus(404,
                                           client.ReadUserDefinedFunction,
                                           self.GetUserDefinedFunctionLink(db, collection, replaced_udf, is_name_based))


    # Upsert test for User Defined Function resource - selflink version
    def test_udf_upsert_self_link(self):
        self._test_udf_upsert(False);

    # Upsert test for User Defined Function resource - name based routing version
    def test_udf_upsert_name_based(self):
        self._test_udf_upsert(True);
        
    def _test_udf_upsert(self, is_name_based):
        client = document_client.DocumentClient(host,
                                                {'masterKey': masterKey})
        
        # create database
        db = client.CreateDatabase({ 'id': 'sample database' })
        
        # create collection
        collection = client.CreateCollection(
            self.GetDatabaseLink(db, is_name_based),
            { 'id': 'sample collection' })
        
        # read udfs and check count
        udfs = list(client.ReadUserDefinedFunctions(self.GetDocumentCollectionLink(db, collection, is_name_based)))
        before_create_udfs_count = len(udfs)
        
        # create a udf definition
        udf_definition = {
            'id': 'sample udf',
            'body': 'function() {var x = 10;}'
        }

        # create udf using Upsert API
        created_udf = client.UpsertUserDefinedFunction(self.GetDocumentCollectionLink(db, collection, is_name_based),
                                               udf_definition)

        # verify id property
        self.assertEqual(created_udf['id'],
                         udf_definition['id'])

        # read udfs after creation and verify updated count
        udfs = list(client.ReadUserDefinedFunctions(self.GetDocumentCollectionLink(db, collection, is_name_based)))
        self.assertEqual(len(udfs),
                         before_create_udfs_count + 1,
                         'create should increase the number of udfs')

        # update udf
        created_udf['body'] = 'function() {var x = 20;}'
        
        # should replace udf since it already exists
        upserted_udf = client.UpsertUserDefinedFunction(self.GetDocumentCollectionLink(db, collection, is_name_based), created_udf)

        # verify id property
        self.assertEqual(created_udf['id'],
                         upserted_udf['id'])

        # verify changed property
        self.assertEqual(upserted_udf['body'],
                                 created_udf['body'])

        # read udf and verify count doesn't increases again
        udfs = list(client.ReadUserDefinedFunctions(self.GetDocumentCollectionLink(db, collection, is_name_based)))
        self.assertEqual(len(udfs),
                         before_create_udfs_count + 1,
                         'upsert should keep the number of udfs same')

        created_udf['id'] = 'new udf'
        
        # should create new udf since the id is different
        new_udf = client.UpsertUserDefinedFunction(self.GetDocumentCollectionLink(db, collection, is_name_based), created_udf)

        # verify id property
        self.assertEqual(created_udf['id'],
                         new_udf['id'])
        
        # read udf and verify count increases
        udfs = list(client.ReadUserDefinedFunctions(self.GetDocumentCollectionLink(db, collection, is_name_based)))
        self.assertEqual(len(udfs),
                         before_create_udfs_count + 2,
                         'upsert should keep the number of udfs same')
        
        # delete udfs
        client.DeleteUserDefinedFunction(self.GetUserDefinedFunctionLink(db, collection, upserted_udf, is_name_based))
        client.DeleteUserDefinedFunction(self.GetUserDefinedFunctionLink(db, collection, new_udf, is_name_based))

        # read udf and verify count remains the same
        udfs = list(client.ReadUserDefinedFunctions(self.GetDocumentCollectionLink(db, collection, is_name_based)))
        self.assertEqual(len(udfs),
                         before_create_udfs_count,
                         'delete should keep the number of udfs same')


    def test_sproc_crud_self_link(self):
        self._test_sproc_crud(False);

    def test_sproc_crud_name_based(self):
        self._test_sproc_crud(True);
        
    def _test_sproc_crud(self, is_name_based):
        client = document_client.DocumentClient(host,
                                                {'masterKey': masterKey})
        # create database
        db = client.CreateDatabase({ 'id': 'sample database' })
        # create collection
        collection = client.CreateCollection(
            self.GetDatabaseLink(db, is_name_based),
            { 'id': 'sample collection' })
        # read sprocs
        sprocs = list(client.ReadStoredProcedures(self.GetDocumentCollectionLink(db, collection, is_name_based)))
        # create a sproc
        before_create_sprocs_count = len(sprocs)
        sproc_definition = {
            'id': 'sample sproc',
            'serverScript': 'function() {var x = 10;}'
        }
        sproc = client.CreateStoredProcedure(self.GetDocumentCollectionLink(db, collection, is_name_based),
                                             sproc_definition)
        for property in sproc_definition:
            if property != "serverScript":
                self.assertEqual(
                    sproc[property],
                    sproc_definition[property],
                    'property {property} should match'.format(property=property))
            else:
                self.assertEqual(sproc['body'], 'function() {var x = 10;}')

        # read sprocs after creation
        sprocs = list(client.ReadStoredProcedures(self.GetDocumentCollectionLink(db, collection, is_name_based)))
        self.assertEqual(len(sprocs),
                         before_create_sprocs_count + 1,
                         'create should increase the number of sprocs')
        # query sprocs
        sprocs = list(client.QueryStoredProcedures(
            self.GetDocumentCollectionLink(db, collection, is_name_based),
            {
                'query': 'SELECT * FROM root r WHERE r.id=@id',
                'parameters':[
                    { 'name':'@id', 'value':sproc_definition['id'] }
                ]
            }))
        self.assert_(sprocs)
        # replace sproc
        change_sproc = sproc.copy()
        sproc['body'] = 'function() {var x = 20;}'
        replaced_sproc = client.ReplaceStoredProcedure(self.GetStoredProcedureLink(db, collection, change_sproc, is_name_based),
                                                       sproc)
        for property in sproc_definition:
            if property != 'serverScript':
                self.assertEqual(
                    replaced_sproc[property],
                    sproc[property],
                    'property {property} should match'.format(property=property))
            else:
                self.assertEqual(replaced_sproc['body'],
                                 "function() {var x = 20;}")
        # read sproc
        sproc = client.ReadStoredProcedure(self.GetStoredProcedureLink(db, collection, replaced_sproc, is_name_based))
        self.assertEqual(replaced_sproc['id'], sproc['id'])
        # delete sproc
        res = client.DeleteStoredProcedure(self.GetStoredProcedureLink(db, collection, replaced_sproc, is_name_based))
        # read sprocs after deletion
        self.__AssertHTTPFailureWithStatus(404,
                                           client.ReadStoredProcedure,
                                           self.GetStoredProcedureLink(db, collection, replaced_sproc, is_name_based))

    # Upsert test for sproc resource - selflink version
    def test_sproc_upsert_self_link(self):
        self._test_sproc_upsert(False);

    # Upsert test for sproc resource - name based routing version
    def test_sproc_upsert_name_based(self):
        self._test_sproc_upsert(True);
        
    def _test_sproc_upsert(self, is_name_based):
        client = document_client.DocumentClient(host,
                                                {'masterKey': masterKey})
        
        # create database
        db = client.CreateDatabase({ 'id': 'sample database' })
        
        # create collection
        collection = client.CreateCollection(
            self.GetDatabaseLink(db, is_name_based),
            { 'id': 'sample collection' })
        
        # read sprocs and check count
        sprocs = list(client.ReadStoredProcedures(self.GetDocumentCollectionLink(db, collection, is_name_based)))
        before_create_sprocs_count = len(sprocs)

        # create a sproc definition
        sproc_definition = {
            'id': 'sample sproc',
            'serverScript': 'function() {var x = 10;}'
        }

        # create sproc using Upsert API
        created_sproc = client.UpsertStoredProcedure(self.GetDocumentCollectionLink(db, collection, is_name_based),
                                             sproc_definition)

        # verify id property
        self.assertEqual(created_sproc['id'],
                         sproc_definition['id'])
        
        # read sprocs after creation and verify updated count
        sprocs = list(client.ReadStoredProcedures(self.GetDocumentCollectionLink(db, collection, is_name_based)))
        self.assertEqual(len(sprocs),
                         before_create_sprocs_count + 1,
                         'create should increase the number of sprocs')

        # update sproc
        created_sproc['body'] = 'function() {var x = 20;}'

        # should replace sproc since it already exists
        upserted_sproc = client.UpsertStoredProcedure(self.GetDocumentCollectionLink(db, collection, is_name_based),
                                                       created_sproc)

        # verify id property
        self.assertEqual(created_sproc['id'],
                         upserted_sproc['id'])

        # verify changed property
        self.assertEqual(upserted_sproc['body'],
                                 created_sproc['body'])

        # read sprocs after upsert and verify count remains the same
        sprocs = list(client.ReadStoredProcedures(self.GetDocumentCollectionLink(db, collection, is_name_based)))
        self.assertEqual(len(sprocs),
                         before_create_sprocs_count + 1,
                         'upsert should keep the number of sprocs same')

        # update sproc
        created_sproc['id'] = 'new sproc'

        # should create new sproc since id is different
        new_sproc = client.UpsertStoredProcedure(self.GetDocumentCollectionLink(db, collection, is_name_based),
                                                       created_sproc)

        # verify id property
        self.assertEqual(created_sproc['id'],
                         new_sproc['id'])
        
        # read sprocs after upsert and verify count increases
        sprocs = list(client.ReadStoredProcedures(self.GetDocumentCollectionLink(db, collection, is_name_based)))
        self.assertEqual(len(sprocs),
                         before_create_sprocs_count + 2,
                         'upsert should keep the number of sprocs same')
        
        # delete sprocs
        client.DeleteStoredProcedure(self.GetStoredProcedureLink(db, collection, upserted_sproc, is_name_based))
        client.DeleteStoredProcedure(self.GetStoredProcedureLink(db, collection, new_sproc, is_name_based))

        # read sprocs after delete and verify count remains same
        sprocs = list(client.ReadStoredProcedures(self.GetDocumentCollectionLink(db, collection, is_name_based)))
        self.assertEqual(len(sprocs),
                         before_create_sprocs_count,
                         'delete should keep the number of sprocs same')
        

    def test_collection_indexing_policy_self_link(self):
        self._test_collection_indexing_policy(False);

    def test_collection_indexing_policy_name_based(self):
        self._test_collection_indexing_policy(True);

    def _test_collection_indexing_policy(self, is_name_based):
        client = document_client.DocumentClient(host,
                                                {'masterKey': masterKey})
        # create database
        db = client.CreateDatabase({ 'id': 'sample database' })
        # create collection
        collection = client.CreateCollection(
            self.GetDatabaseLink(db, is_name_based),
            { 'id': "sample collection" })
        self.assertEqual(collection['indexingPolicy']['indexingMode'],
                         documents.IndexingMode.Consistent,
                         'default indexing mode should be consistent')
        lazy_collection_definition = {
            'id': 'lazy collection',
            'indexingPolicy': {
                'indexingMode': documents.IndexingMode.Lazy
            }
        }
        coll = client.DeleteCollection(self.GetDocumentCollectionLink(db, collection, is_name_based))
        lazy_collection = client.CreateCollection(
            self.GetDatabaseLink(db, is_name_based),
            lazy_collection_definition)
        self.assertEqual(lazy_collection['indexingPolicy']['indexingMode'],
                         documents.IndexingMode.Lazy,
                         'indexing mode should be lazy')

        consistent_collection_definition = {
            'id': 'lazy collection',
            'indexingPolicy': {
                'indexingMode': documents.IndexingMode.Consistent
            }
        }
        coll = client.DeleteCollection(self.GetDocumentCollectionLink(db, lazy_collection, is_name_based))
        consistent_collection = client.CreateCollection(
            self.GetDatabaseLink(db, is_name_based), consistent_collection_definition)
        self.assertEqual(collection['indexingPolicy']['indexingMode'],
                         documents.IndexingMode.Consistent,
                         'indexing mode should be consistent')
        collection_definition = {
            'id': 'CollectionWithIndexingPolicy',
            'indexingPolicy': {
                'automatic': True,
                'indexingMode': documents.IndexingMode.Lazy,
                'includedPaths': [
                    {
                        'path': '/',
                        'indexes': [
                            {
                                'kind': documents.IndexKind.Hash,
                                'dataType': documents.DataType.Number,
                                'precision': 2
                            }
                        ]
                    }
                ],
                'excludedPaths': [
                    {
                        'path': '/"systemMetadata"/*'
                    }
                ]
            }
        }
        client.DeleteCollection(self.GetDocumentCollectionLink(db, consistent_collection, is_name_based))
        collectio_with_indexing_policy = client.CreateCollection(self.GetDatabaseLink(db, is_name_based), collection_definition)
        self.assertEqual(2,
                         len(collectio_with_indexing_policy['indexingPolicy']['includedPaths']),
                         'Unexpected includedPaths length')
        self.assertEqual(1,
                         len(collectio_with_indexing_policy['indexingPolicy']['excludedPaths']),
                         'Unexpected excluded path count')

    def test_create_default_indexing_policy_self_link(self):
        self._test_create_default_indexing_policy(False);

    def test_create_default_indexing_policy_name_based(self):
        self._test_create_default_indexing_policy(True);
        
    def _test_create_default_indexing_policy(self, is_name_based):
        client = document_client.DocumentClient(host, {'masterKey': masterKey})
        # create database
        db = client.CreateDatabase({ 'id': 'sample database' })

        # no indexing policy specified
        collection = client.CreateCollection(self.GetDatabaseLink(db, is_name_based), {'id': 'TestCreateDefaultPolicy01'})
        self._check_default_indexing_policy_paths(collection['indexingPolicy']);

        # partial policy specified
        collection = client.CreateCollection(
            self.GetDatabaseLink(db, is_name_based),
            {
                'id': 'TestCreateDefaultPolicy02',
                'indexingPolicy': {
                    'indexingMode': documents.IndexingMode.Lazy, 'automatic': True
                }
            })
        self._check_default_indexing_policy_paths(collection['indexingPolicy'])

        # default policy
        collection = client.CreateCollection(
            self.GetDatabaseLink(db, is_name_based),
            {
                'id': 'TestCreateDefaultPolicy03',
                'indexingPolicy': { }
            })
        self._check_default_indexing_policy_paths(collection['indexingPolicy'])

        # missing indexes
        collection = client.CreateCollection(
            self.GetDatabaseLink(db, is_name_based),
            {
                'id': 'TestCreateDefaultPolicy04',
                'indexingPolicy': {
                    'includedPaths': [
                        {
                            'path': '/*'
                        }
                    ]
                }
            })
        self._check_default_indexing_policy_paths(collection['indexingPolicy'])

        # missing precision
        collection = client.CreateCollection(
            self.GetDatabaseLink(db, is_name_based),
            {
                'id': 'TestCreateDefaultPolicy05',
                'indexingPolicy': {
                    'includedPaths': [
                        {
                            'path': '/*',
                            'indexes': [
                                {
                                    'kind': documents.IndexKind.Hash,
                                    'dataType': documents.DataType.String
                                },
                                {
                                    'kind': documents.IndexKind.Range,
                                    'dataType': documents.DataType.Number
                                }
                            ]
                        }
                    ]
                }
            })
        self._check_default_indexing_policy_paths(collection['indexingPolicy'])

    def _check_default_indexing_policy_paths(self, indexing_policy):
        def __get_first(array):
            if array:
                return array[0]
            else:
                return None

        # no excluded paths.
        self.assertEqual(0, len(indexing_policy['excludedPaths']))
        # included paths should be 2: '_ts' and '/'.
        self.assertEqual(2, len(indexing_policy['includedPaths']))

        root_included_path = __get_first([included_path for included_path in indexing_policy['includedPaths']
                              if included_path['path'] == '/*'])
        ts_included_path = __get_first([included_path for included_path in indexing_policy['includedPaths']
                              if included_path['path'] == '/*'])
        self.assert_(root_included_path);
        self.assert_(ts_included_path);

        # There should be one HashIndex of String type and one RangeIndex of Number type in the root included path.
        hash_index = __get_first([index for index in root_included_path['indexes'] if index['kind'] == 'Hash'])
        range_index = __get_first([index for index in root_included_path['indexes'] if index['kind'] == 'Range'])

        self.assert_(hash_index)
        self.assertEqual("String", hash_index['dataType'])
        self.assert_(range_index)
        self.assertEqual("Number", range_index['dataType'])

    def test_client_request_timeout(self):
        connection_policy = documents.ConnectionPolicy()
        # making timeout 1 ms to make sure it will throw
        connection_policy.RequestTimeout = 1
        client = document_client.DocumentClient(host,
                                                {'masterKey': masterKey},
                                                connection_policy)
        # create database
        with self.assertRaises(Exception):
            # Will time out.
            client.CreateDatabase({ 'id': "sample database" })

    def test_query_iterable_functionality(self):
        def __CreateResources(client):
            """Creates resources for this test.

            :Parameters:
                - `client`: document_client.DocumentClient

            :Returns:
                dict

            """
            db = client.CreateDatabase({ 'id': 'sample database' })
            collection = client.CreateCollection(
                db['_self'],
                { 'id': 'sample collection' })
            doc1 = client.CreateDocument(
                collection['_self'],
                { 'id': 'doc1', 'prop1': 'value1'})
            doc2 = client.CreateDocument(
                collection['_self'],
                { 'id': 'doc2', 'prop1': 'value2'})
            doc3 = client.CreateDocument(
                collection['_self'],
                { 'id': 'doc3', 'prop1': 'value3'})
            resources = {
                'coll': collection,
                'doc1': doc1,
                'doc2': doc2,
                'doc3': doc3
            }
            return resources

        # Validate QueryIterable by converting it to a list.
        client = document_client.DocumentClient(host,
                                                {'masterKey': masterKey})
        resources = __CreateResources(client)
        results = client.ReadDocuments(resources['coll']['_self'],
                                       {'maxItemCount':2})
        docs = list(iter(results))
        self.assertEqual(3,
                         len(docs),
                         'QueryIterable should return all documents' +
                         ' using continuation')
        self.assertEqual(resources['doc1']['id'], docs[0]['id'])
        self.assertEqual(resources['doc2']['id'], docs[1]['id'])
        self.assertEqual(resources['doc3']['id'], docs[2]['id'])

        # Validate QueryIterable iterator with 'for'.
        counter = 0
        # test QueryIterable with 'for'.
        for doc in iter(results):
            counter += 1
            if counter == 1:
                self.assertEqual(resources['doc1']['id'],
                                 doc['id'],
                                 'first document should be doc1')
            elif counter == 2:
                self.assertEqual(resources['doc2']['id'],
                                 doc['id'],
                                 'second document should be doc2')
            elif counter == 3:
                self.assertEqual(resources['doc3']['id'],
                                 doc['id'],
                                 'third document should be doc3')
        self.assertEqual(counter, 3)

        # Get query results page by page.
        results = client.ReadDocuments(resources['coll']['_self'],
                                       {'maxItemCount':2})
        first_block = results.fetch_next_block()
        self.assertEqual(2,
                         len(first_block),
                         'First block should have 2 entries.')
        self.assertEqual(resources['doc1']['id'], first_block[0]['id'])
        self.assertEqual(resources['doc2']['id'], first_block[1]['id'])
        self.assertEqual(1,
                         len(results.fetch_next_block()),
                         'Second block should have 1 entry.')
        self.assertEqual(0,
                         len(results.fetch_next_block()),
                         'Then its empty.')

    def test_trigger_functionality_self_link(self):
        self._test_trigger_functionality(False);

    def test_trigger_functionality_name_based(self):
        self._test_trigger_functionality(True);
        
    def _test_trigger_functionality(self, is_name_based):
        triggers_in_collection1 = [
        {
            'id': 't1',
            'body': (
                'function() {' +
                '    var item = getContext().getRequest().getBody();' +
                '    item.id = item.id.toUpperCase() + \'t1\';' +
                '    getContext().getRequest().setBody(item);' +
                '}'),
            'triggerType': documents.TriggerType.Pre,
            'triggerOperation': documents.TriggerOperation.All
        },
        {
            'id': 'response1',
            'body': (
                'function() {' +
                '    var prebody = getContext().getRequest().getBody();' +
                '    if (prebody.id != \'TESTING POST TRIGGERt1\')'
                '        throw \'id mismatch\';' +
                '    var postbody = getContext().getResponse().getBody();' +
                '    if (postbody.id != \'TESTING POST TRIGGERt1\')'
                '        throw \'id mismatch\';'
                '}'),
            'triggerType': documents.TriggerType.Post,
            'triggerOperation': documents.TriggerOperation.All
        },
        {
            'id': 'response2',
            # can't be used because setValue is currently disabled
            'body': (
                'function() {' +
                '    var predoc = getContext().getRequest().getBody();' +
                '    var postdoc = getContext().getResponse().getBody();' +
                '    getContext().getResponse().setValue(' +
                '        \'predocname\', predoc.id + \'response2\');' +
                '    getContext().getResponse().setValue(' +
                '        \'postdocname\', postdoc.id + \'response2\');' +
                '}'),
                'triggerType': documents.TriggerType.Post,
                'triggerOperation': documents.TriggerOperation.All,
        }]
        triggers_in_collection2 = [
        {
            'id': "t2",
            'body': "function() { }", # trigger already stringified
            'triggerType': documents.TriggerType.Pre,
            'triggerOperation': documents.TriggerOperation.All
        },
        {
            'id': "t3",
            'body': (
                'function() {' +
                '    var item = getContext().getRequest().getBody();' +
                '    item.id = item.id.toLowerCase() + \'t3\';' +
                '    getContext().getRequest().setBody(item);' +
                '}'),
            'triggerType': documents.TriggerType.Pre,
            'triggerOperation': documents.TriggerOperation.All
        }]
        triggers_in_collection3 = [
        {
            'id': 'triggerOpType',
            'body': 'function() { }',
            'triggerType': documents.TriggerType.Post,
            'triggerOperation': documents.TriggerOperation.Delete,
        }]

        def __CreateTriggers(client, database, collection, triggers, is_name_based):
            """Creates triggers.

            :Parameters:
                - `client`: document_client.DocumentClient
                - `collection`: dict

            """
            for trigger_i in triggers:
                trigger = client.CreateTrigger(self.GetDocumentCollectionLink(database, collection, is_name_based),
                                               trigger_i)
                for property in trigger_i:
                    self.assertEqual(
                        trigger[property],
                        trigger_i[property],
                        'property {property} should match'.format(property=property))

        client = document_client.DocumentClient(host,
                                                {'masterKey': masterKey})
        # create database
        db = client.CreateDatabase({ 'id': 'sample database' })
        # create collections
        collection1 = client.CreateCollection(
            self.GetDatabaseLink(db, is_name_based), { 'id': 'sample collection 1' })
        collection2 = client.CreateCollection(
            self.GetDatabaseLink(db, is_name_based), { 'id': 'sample collection 2' })
        collection3 = client.CreateCollection(
            self.GetDatabaseLink(db, is_name_based), { 'id': 'sample collection 3' })
        # create triggers
        __CreateTriggers(client, db, collection1, triggers_in_collection1, is_name_based)
        __CreateTriggers(client, db, collection2, triggers_in_collection2, is_name_based)
        __CreateTriggers(client, db, collection3, triggers_in_collection3, is_name_based)
        # create document
        triggers_1 = list(client.ReadTriggers(self.GetDocumentCollectionLink(db, collection1, is_name_based)))
        self.assertEqual(len(triggers_1), 3)
        document_1_1 = client.CreateDocument(self.GetDocumentCollectionLink(db, collection1, is_name_based),
                                             { 'id': 'doc1',
                                               'key': 'value' },
                                             { 'preTriggerInclude': 't1' })
        self.assertEqual(document_1_1['id'],
                         'DOC1t1',
                         'id should be capitalized')
        document_1_2 = client.CreateDocument(
            self.GetDocumentCollectionLink(db, collection1, is_name_based),
            { 'id': 'testing post trigger' },
            { 'postTriggerInclude': 'response1',
              'preTriggerInclude': 't1' })
        self.assertEqual(document_1_2['id'], 'TESTING POST TRIGGERt1')
        document_1_3 = client.CreateDocument(self.GetDocumentCollectionLink(db, collection1, is_name_based),
                                             { 'id': 'responseheaders' },
                                             { 'preTriggerInclude': 't1' })
        self.assertEqual(document_1_3['id'], "RESPONSEHEADERSt1")

        triggers_2 = list(client.ReadTriggers(self.GetDocumentCollectionLink(db, collection2, is_name_based)))
        self.assertEqual(len(triggers_2), 2)
        document_2_1 = client.CreateDocument(self.GetDocumentCollectionLink(db, collection2, is_name_based),
                                             { 'id': 'doc2',
                                               'key2': 'value2' },
                                             { 'preTriggerInclude': 't2' })
        self.assertEqual(document_2_1['id'],
                         'doc2',
                         'id shouldn\'t change')
        document_2_2 = client.CreateDocument(self.GetDocumentCollectionLink(db, collection2, is_name_based),
                                             { 'id': 'Doc3',
                                               'prop': 'empty' },
                                             { 'preTriggerInclude': 't3' })
        self.assertEqual(document_2_2['id'], 'doc3t3')

        triggers_3 = list(client.ReadTriggers(self.GetDocumentCollectionLink(db, collection3, is_name_based)))
        self.assertEqual(len(triggers_3), 1)
        with self.assertRaises(Exception):
            client.CreateDocument(self.GetDocumentCollectionLink(db, collection3, is_name_based),
                                  { 'id': 'Docoptype' },
                                  { 'postTriggerInclude': 'triggerOpType' })

    def test_stored_procedure_functionality_self_link(self):
        self._test_stored_procedure_functionality(False);

    def test_stored_procedure_functionality_name_based(self):
        self._test_stored_procedure_functionality(True);
        
    def _test_stored_procedure_functionality(self, is_name_based):
        client = document_client.DocumentClient(host,
                                                { 'masterKey': masterKey })
        # create database
        db = client.CreateDatabase({ 'id': 'sample database' })
        # create collection
        collection = client.CreateCollection(
            self.GetDatabaseLink(db, is_name_based), { 'id': 'sample collection' })
        sproc1 = {
            'id': 'storedProcedure1',
            'body': (
                'function () {' +
                '  for (var i = 0; i < 1000; i++) {' +
                '    var item = getContext().getResponse().getBody();' +
                '    if (i > 0 && item != i - 1) throw \'body mismatch\';' +
                '    getContext().getResponse().setBody(i);' +
                '  }' +
                '}')
        }

        retrieved_sproc = client.CreateStoredProcedure(self.GetDocumentCollectionLink(db, collection, is_name_based),
                                                       sproc1)
        result = client.ExecuteStoredProcedure(self.GetStoredProcedureLink(db, collection, retrieved_sproc, is_name_based),
                                               None)
        self.assertEqual(result, 999)
        sproc2 = {
            'id': 'storedProcedure2',
            'body': (
                'function () {' +
                '  for (var i = 0; i < 10; i++) {' +
                '    getContext().getResponse().appendValue(\'Body\', i);' +
                '  }' +
                '}')
        }
        retrieved_sproc2 = client.CreateStoredProcedure(self.GetDocumentCollectionLink(db, collection, is_name_based),
                                                        sproc2)
        result = client.ExecuteStoredProcedure(self.GetStoredProcedureLink(db, collection, retrieved_sproc2, is_name_based),
                                               None)
        self.assertEqual(int(result), 123456789)
        sproc3 = {
            'id': 'storedProcedure3',
            'body': (
                'function (input) {' +
                    '  getContext().getResponse().setBody(' +
                    '      \'a\' + input.temp);' +
                '}')
        }
        retrieved_sproc3 = client.CreateStoredProcedure(self.GetDocumentCollectionLink(db, collection, is_name_based),
                                                        sproc3)
        result = client.ExecuteStoredProcedure(self.GetStoredProcedureLink(db, collection, retrieved_sproc3, is_name_based),
                                               {'temp': 'so'})
        self.assertEqual(result, 'aso')

    def __ValidateOfferResponseBody(self, offer, expected_coll_link, expected_offer_type):
        self.assert_(offer.get('id'), 'Id cannot be null.')
        self.assert_(offer.get('_rid'), 'Resource Id (Rid) cannot be null.')
        self.assert_(offer.get('_self'), 'Self Link cannot be null.')
        self.assert_(offer.get('resource'), 'Resource Link cannot be null.')
        self.assertTrue(offer['_self'].find(offer['id']) != -1,
                        'Offer id not contained in offer self link.')
        self.assertEqual(expected_coll_link.strip('/'), offer['resource'].strip('/'))
        if (expected_offer_type):
            self.assertEqual(expected_offer_type, offer.get('offerType'))

    def test_offer_read_and_query(self):
        client = document_client.DocumentClient(host, { 'masterKey': masterKey })
        # Create database.
        db = client.CreateDatabase({ 'id': 'sample database' })
        # Create collection.
        collection = client.CreateCollection(db['_self'], { 'id': 'sample collection' })
        offers = list(client.ReadOffers({}))
        self.assertEqual(1, len(offers))
        expected_offer = offers[0]
        self.__ValidateOfferResponseBody(expected_offer, collection.get('_self'), None)
        # Read the offer.
        read_offer = client.ReadOffer(expected_offer.get('_self'))
        self.__ValidateOfferResponseBody(read_offer, collection.get('_self'), expected_offer.get('offerType'))
        # Check if the read resource is what we expected.
        self.assertEqual(expected_offer.get('id'), read_offer.get('id'))
        self.assertEqual(expected_offer.get('_rid'), read_offer.get('_rid'))
        self.assertEqual(expected_offer.get('_self'), read_offer.get('_self'))
        self.assertEqual(expected_offer.get('resource'), read_offer.get('resource'))
        # Query for the offer.

        offers = list(client.QueryOffers(
            {
                'query': 'SELECT * FROM root r WHERE r.id=@id',
                'parameters': [
                    { 'name': '@id', 'value': expected_offer['id']}
                ]
            }, {}))
        self.assertEqual(1, len(offers))
        query_one_offer = offers[0]
        self.__ValidateOfferResponseBody(query_one_offer, collection.get('_self'), expected_offer.get('offerType'))
        # Check if the query result is what we expected.
        self.assertEqual(expected_offer.get('id'), query_one_offer.get('id'))
        self.assertEqual(expected_offer.get('_rid'), query_one_offer.get('_rid'))
        self.assertEqual(expected_offer.get('_self'), query_one_offer.get('_self'))
        self.assertEqual(expected_offer.get('resource'), query_one_offer.get('resource'))
        # Expects an exception when reading offer with bad offer link.
        self.__AssertHTTPFailureWithStatus(400, client.ReadOffer, expected_offer.get('_self')[:-1] + 'x')
        # Now delete the collection.
        client.DeleteCollection(collection.get('_self'))
        # Reading fails.
        self.__AssertHTTPFailureWithStatus(404, client.ReadOffer, expected_offer.get('_self'))
        # Read feed now returns 0 results.
        offers = list(client.ReadOffers())
        self.assert_(not offers)

    def test_offer_replace(self):
        client = document_client.DocumentClient(host, { 'masterKey': masterKey })
        # Create database.
        db = client.CreateDatabase({ 'id': 'sample database' })
        # Create collection.
        collection = client.CreateCollection(db['_self'], { 'id': 'sample collection' })
        offers = list(client.ReadOffers())
        self.assertEqual(1, len(offers))
        expected_offer = offers[0]
        self.__ValidateOfferResponseBody(expected_offer, collection.get('_self'), None)
        # Replace the offer.
        offer_to_replace = dict(expected_offer)
        offer_to_replace['offerType'] = 'S2'
        replaced_offer = client.ReplaceOffer(offer_to_replace['_self'], offer_to_replace)
        self.__ValidateOfferResponseBody(replaced_offer, collection.get('_self'), 'S2')
        # Check if the replaced offer is what we expect.
        self.assertEqual(offer_to_replace.get('id'), replaced_offer.get('id'))
        self.assertEqual(offer_to_replace.get('_rid'), replaced_offer.get('_rid'))
        self.assertEqual(offer_to_replace.get('_self'), replaced_offer.get('_self'))
        self.assertEqual(offer_to_replace.get('resource'), replaced_offer.get('resource'))
        # Expects an exception when replacing an offer with bad id.
        offer_to_replace_bad_id = dict(offer_to_replace)
        offer_to_replace_bad_id['_rid'] = 'NotAllowed'
        self.__AssertHTTPFailureWithStatus(
            400, client.ReplaceOffer, offer_to_replace_bad_id['_self'], offer_to_replace_bad_id)
        # Expects an exception when replacing an offer with bad rid.
        offer_to_replace_bad_rid = dict(offer_to_replace)
        offer_to_replace_bad_rid['_rid'] = 'InvalidRid'
        self.__AssertHTTPFailureWithStatus(
            400, client.ReplaceOffer, offer_to_replace_bad_rid['_self'], offer_to_replace_bad_rid)
        # Expects an exception when replaceing an offer with null id and rid.
        offer_to_replace_null_ids = dict(offer_to_replace)
        offer_to_replace_null_ids['id'] = None
        offer_to_replace_null_ids['_rid'] = None
        self.__AssertHTTPFailureWithStatus(
            400, client.ReplaceOffer, offer_to_replace_null_ids['_self'], offer_to_replace_null_ids)

    def test_collection_with_offer_type(self):
        client = document_client.DocumentClient(host,
                                                {'masterKey': masterKey})
        # create database
        created_db = client.CreateDatabase({ 'id': 'sample database' })
        collections = list(client.ReadCollections(created_db['_self']))
        # create a collection
        before_create_collections_count = len(collections)
        collection_definition = { 'id': 'sample collection' }
        collection = client.CreateCollection(created_db['_self'],
                                             collection_definition,
                                             {
                                                 'offerType': 'S2'
                                             })
        # We should have an offer of type S2.
        offers = list(client.ReadOffers())
        self.assertEqual(1, len(offers))
        expected_offer = offers[0]
        self.__ValidateOfferResponseBody(expected_offer, collection.get('_self'), 'S2')

    def test_database_account_functionality(self):
        # Validate database account functionality.
        client = document_client.DocumentClient(host,
                                                { 'masterKey':
                                                  masterKey })
        database_account = client.GetDatabaseAccount()
        self.assertEqual(database_account.DatabasesLink, '/dbs/')
        self.assertEqual(database_account.MediaLink, '/media/')
        if (http_constants.HttpHeaders.MaxMediaStorageUsageInMB in
            client.last_response_headers):
            self.assertEqual(
                database_account.MaxMediaStorageUsageInMB,
                client.last_response_headers[
                    http_constants.HttpHeaders.MaxMediaStorageUsageInMB])
        if (http_constants.HttpHeaders.CurrentMediaStorageUsageInMB in
            client.last_response_headers):
            self.assertEqual(
                database_account.CurrentMediaStorageUsageInMB,
                client.last_response_headers[
                    http_constants.HttpHeaders.
                    CurrentMediaStorageUsageInMB])
        self.assertTrue(
            database_account.ConsistencyPolicy['defaultConsistencyLevel']
            != None)

    def test_index_progress_headers_self_link(self):
        self._test_index_progress_headers(False);

    def test_index_progress_headers_name_based(self):
        self._test_index_progress_headers(True);
        
    def _test_index_progress_headers(self, is_name_based):
        client = document_client.DocumentClient(host, { 'masterKey': masterKey })
        created_db = client.CreateDatabase({ 'id': 'sample database' })
        consistent_coll = client.CreateCollection(self.GetDatabaseLink(created_db, is_name_based), { 'id': 'consistent_coll' })
        client.ReadCollection(self.GetDocumentCollectionLink(created_db, consistent_coll, is_name_based))
        self.assertFalse(http_constants.HttpHeaders.LazyIndexingProgress in client.last_response_headers)
        self.assertTrue(http_constants.HttpHeaders.IndexTransformationProgress in client.last_response_headers)
        lazy_coll = client.CreateCollection(self.GetDatabaseLink(created_db, is_name_based),
            {
                'id': 'lazy_coll',
                'indexingPolicy': { 'indexingMode' : documents.IndexingMode.Lazy }
            })
        client.ReadCollection(self.GetDocumentCollectionLink(created_db, lazy_coll, is_name_based))
        self.assertTrue(http_constants.HttpHeaders.LazyIndexingProgress in client.last_response_headers)
        self.assertTrue(http_constants.HttpHeaders.IndexTransformationProgress in client.last_response_headers)
        none_coll = client.CreateCollection(self.GetDatabaseLink(created_db, is_name_based),
            {
                'id': 'none_coll',
                'indexingPolicy': { 'indexingMode': documents.IndexingMode.NoIndex, 'automatic': False }
            })
        client.ReadCollection(self.GetDocumentCollectionLink(created_db, none_coll, is_name_based))
        self.assertFalse(http_constants.HttpHeaders.LazyIndexingProgress in client.last_response_headers)
        self.assertTrue(http_constants.HttpHeaders.IndexTransformationProgress in client.last_response_headers)

    # To run this test, please provide your own CA certs file or download one from
    #     http://curl.haxx.se/docs/caextract.html
    #
    # def test_ssl_connection(self):
    #     connection_policy = documents.ConnectionPolicy()
    #     connection_policy.SSLConfiguration = documents.SSLConfiguration()
    #     connection_policy.SSLConfiguration.SSLCaCerts = './cacert.pem'
    #     client = document_client.DocumentClient(host, {'masterKey': masterKey}, connection_policy)
    #     # Read databases after creation.
    #     databases = list(client.ReadDatabases())


    # To run this test, please specify your own proxy server.
    #
    # def test_proxy_connection(self):
    #     connection_policy = documents.ConnectionPolicy()
    #     connection_policy.ProxyConfiguration = documents.ProxyConfiguration()
    #     connection_policy.ProxyConfiguration.Host = '127.0.0.1'
    #     connection_policy.ProxyConfiguration.Port = 8088
    #     client = document_client.DocumentClient(host, {'masterKey': masterKey}, connection_policy)
    #     # Read databases after creation.
    #     databases = list(client.ReadDatabases())

    def test_id_validation(self):
        client = document_client.DocumentClient(host, {'masterKey': masterKey})

        # Id shouldn't end with space.
        database_definition = { 'id': 'id_with_space ' }
        try:
            client.CreateDatabase(database_definition)
            self.assertFalse(True)
        except ValueError as e:
            self.assertEqual('Id ends with a space.', e.message)
        # Id shouldn't contain '/'.
        database_definition = { 'id': 'id_with_illegal/_char' }
        try:
            client.CreateDatabase(database_definition)
            self.assertFalse(True)
        except ValueError as e:
            self.assertEqual('Id contains illegal chars.', e.message)
        # Id shouldn't contain '\\'.
        database_definition = { 'id': 'id_with_illegal\\_char' }
        try:
            client.CreateDatabase(database_definition)
            self.assertFalse(True)
        except ValueError as e:
            self.assertEqual('Id contains illegal chars.', e.message)
        # Id shouldn't contain '?'.
        database_definition = { 'id': 'id_with_illegal?_char' }
        try:
            client.CreateDatabase(database_definition)
            self.assertFalse(True)
        except ValueError as e:
            self.assertEqual('Id contains illegal chars.', e.message)
        # Id shouldn't contain '#'.
        database_definition = { 'id': 'id_with_illegal#_char' }
        try:
            client.CreateDatabase(database_definition)
            self.assertFalse(True)
        except ValueError as e:
            self.assertEqual('Id contains illegal chars.', e.message)

        # Id can begin with space
        database_definition = { 'id': ' id_begin_space' }
        client.CreateDatabase(database_definition)
        self.assertTrue(True)

    def test_id_case_validation(self):
        client = document_client.DocumentClient(host, {'masterKey': masterKey})

        # create database
        created_db = client.CreateDatabase({ 'id': 'sample database' })

        # pascalCase
        collection_definition1 = { 'id': 'sampleCollection' }

        # CamelCase
        collection_definition2 = { 'id': 'SampleCollection' }

        # Verify that no collections exist
        collections = list(client.ReadCollections(self.GetDatabaseLink(created_db, True)))
        self.assertEqual(len(collections), 0)
        
        # create 2 collections with different casing of IDs
        created_collection1 = client.CreateCollection(self.GetDatabaseLink(created_db, True),
                                                     collection_definition1)

        created_collection2 = client.CreateCollection(self.GetDatabaseLink(created_db, True),
                                                     collection_definition2)

        collections = list(client.ReadCollections(self.GetDatabaseLink(created_db, True)))
        
        # verify if a total of 2 collections got created
        self.assertEqual(len(collections), 2)
        
        # verify that collections are created with specified IDs
        self.assertEqual(collection_definition1['id'], created_collection1['id'])
        self.assertEqual(collection_definition2['id'], created_collection2['id'])

    def test_id_unicode_validation(self):
        client = document_client.DocumentClient(host, {'masterKey': masterKey})

        # create database
        created_db = client.CreateDatabase({ 'id': 'sample database' })

        # unicode chars in Hindi for Id which translates to: "Hindi is the national language of India"
        collection_definition1 = { 'id': u'हिन्दी भारत की राष्ट्रीय भाषा है' }

        # Special chars for Id
        collection_definition2 = { 'id': "!@$%^&*()-~`'_[]{}|;:,.<>" } 

        # verify that collections are created with specified IDs
        created_collection1 = client.CreateCollection(self.GetDatabaseLink(created_db, True),
                                                     collection_definition1)

        created_collection2 = client.CreateCollection(self.GetDatabaseLink(created_db, True),
                                                     collection_definition2)
        
        self.assertEqual(collection_definition1['id'], created_collection1['id'])
        self.assertEqual(collection_definition2['id'], created_collection2['id'])


    def GetDatabaseLink(self, database, is_name_based):
        if is_name_based:
            return 'dbs/' + database['id']
        else:
            return database['_self']

    def GetUserLink(self, database, user, is_name_based):
        if is_name_based:
            return self.GetDatabaseLink(database, True) + '/users/' + user['id']
        else:
            return user['_self']

    def GetPermissionLink(self, database, user, permission, is_name_based):
        if is_name_based:
            return self.GetUserLink(database, user, True) + '/permissions/' + permission['id']
        else:
            return permission['_self']

    def GetDocumentCollectionLink(self, database, document_collection, is_name_based):
        if is_name_based:
            return self.GetDatabaseLink(database, True) + '/colls/' + document_collection['id']
        else:
            return document_collection['_self']

    def GetDocumentLink(self, database, document_collection, document, is_name_based):
        if is_name_based:
            return self.GetDocumentCollectionLink(database, document_collection, True) + '/docs/' + document['id']
        else:
            return document['_self']

    def GetAttachmentLink(self, database, document_collection, document, attachment, is_name_based):
        if is_name_based:
            return self.GetDocumentLink(database, document_collection, document, True) + '/attachments/' + attachment['id']
        else:
            return attachment['_self']

    def GetTriggerLink(self, database, document_collection, trigger, is_name_based):
        if is_name_based:
            return self.GetDocumentCollectionLink(database, document_collection, True) + '/triggers/' + trigger['id']
        else:
            return trigger['_self']

    def GetUserDefinedFunctionLink(self, database, document_collection, user_defined_function, is_name_based):
        if is_name_based:
            return self.GetDocumentCollectionLink(database, document_collection, True) + '/udfs/' + user_defined_function['id']
        else:
            return user_defined_function['_self']

    def GetStoredProcedureLink(self, database, document_collection, stored_procedure, is_name_based):
        if is_name_based:
            return self.GetDocumentCollectionLink(database, document_collection, True) + '/sprocs/' + stored_procedure['id']
        else:
            return stored_procedure['_self']

    def GetConflictLink(self, database, document_collection, conflict, is_name_based):
        if is_name_based:
            return self.GetDocumentCollectionLink(database, document_collection, True) + '/conflicts/' + conflict['id']
        else:
            return conflict['_self']

if __name__ == '__main__':
    try:
        unittest.main()
    except SystemExit as inst:
        if inst.args[0] is True:  # raised by sys.exit(True) when tests failed
            raise
