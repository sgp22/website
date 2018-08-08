import os
import hashlib
import copy
import json
import urllib3

from elasticsearch import (
    Elasticsearch,
    NotFoundError,
    RequestError,
    RequestsHttpConnection
)

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

ES_USER = os.environ['ES_USER']
ES_PASS = os.environ['ES_PASS']

DOCS_QUERY_BODY = {
    'size': 50,
    'query': {
        'multi_match': {
            'query': '',
            'fields': []
        }
    }
}


INDEX_STRUCTURE = {
    "settings" : {
        "number_of_shards": 1,
        "number_of_replicas": 1
    },
    'mappings': {
        'doc': {
            'properties': {
                'content': {
                    'type': 'text'
                },
                'path': {
                    'type': 'text'
                },
                "created":  {
                    "type":   "date",
                    "format": "strict_date_optional_time||epoch_millis"
                }
            }
        }
    }
}


class WrongFieldsTypeError(Exception):
    def __init__(self, expression, message):
        self.expression = expression
        self.message = message


def form_es_query_body(es_query_body, fields=[]):
    """Structure the elasticsearch query body."""
    body = es_query_body

    if fields and type(fields) is list:
        for field in fields:
            body['query']['multi_match']['fields'].append(field)

    return body


class DocsIndexer:
    def __init__(self, es_host, es_index, es_index_prefix):
        self.es_host = es_host
        self.es_index = es_index
        self.es_index_prefix = es_index_prefix
        self.es_index_name = "{0}__{1}".format(es_index_prefix, es_index)
        self.es = Elasticsearch(
            es_host,
            connection_class=RequestsHttpConnection,
            use_ssl=True,
            verify_certs=False,
            http_auth=(ES_USER, ES_PASS))

        print(self.es.info())

    def _create_index(self):
        """Create ES index."""
        self.es.indices.create(
            index=self.es_index_name,
            body=INDEX_STRUCTURE)

    def _generate_hash(self, string):
        """MD5 hash."""
        string = string.encode('utf-8')
        hash_object = hashlib.md5(string)

        return hash_object.hexdigest()

    def search(self, raw_query, search_fields=[]):
        # Format and structure the
        # elastic search query further.
        search_results = {
            'ids': [],
            'hits': []
        }
        es_query_body = copy.deepcopy(DOCS_QUERY_BODY)
        es_query_body['query']['multi_match']['query'] = raw_query

        if search_fields and type(search_fields) is not list:
            raise WrongFieldsTypeError(
                'wrong type',
                'field search_fields is of type {},'
                'should be list'.format(type(search_fields)))

        for field in search_fields:
            es_query_body['query']['multi_match']['fields'].append(field)

        if not self.es.indices.exists(self.es_index_name):
            raise NotFoundError(
                "{} index does not exist!".format(self.es_index_name))

        res = self.es.search(
            index=self.es_index_name,
            body=es_query_body
        )

        for hit in res['hits']['hits']:
            pk = hit['_id']
            content = json.loads(hit['_source']['content'])

            # Inspecting a very strange object.
            #if not 'description' in content.keys():
            #    print(json.dumps(content))

            try:
                structured_result = {
                    '_id': pk,
                    '_index': hit['_index'],
                    '_type': hit['_type'],
                    '_score': hit['_score'],
                    '_source': hit['_source'],
                    'title': content['title'],
                    'description': content['description'],
                    'api': content['api'],
                    'body': content['body'],
                    'relativeUrl': hit['_source']['path'],
                }
                search_results['ids'].append(pk)
                search_results['hits'].append(structured_result)
            except ValueError:
                pass
            except KeyError:
                pass

        return search_results

    def index_doc(self, doc):
        _id = self._generate_hash(doc['path'])

        if not self.es.indices.exists(index=self.es_index_name):
            self._create_index()

        res = self.es.index(
            id=_id,
            index=self.es_index_name,
            doc_type='doc',
            body=doc)
