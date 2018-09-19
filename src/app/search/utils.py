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

DOCS_QUERY_BODY = {
    'size': 50,
    'query': {
        'multi_match': {
            'query': '',
            'fields': []
        }
    },
    "highlight" : {
        "fields" : {
            "content" : {},
            "api" : {},
            "*__content" : {},
            "*__body" : {},
            "home_elementspage__*" : {},
            "home_blocksspage__*" : {},
        },
        "fragment_size" : 100,
        "encoder" : "html"
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
                'title': {
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
    def __init__(self, es_host, es_port, es_index, es_index_prefix):

        self.es_host = es_host
        self.es_index = es_index
        self.es_index_prefix = es_index_prefix
        self.es_index_name = "{0}__{1}".format(es_index_prefix, es_index)
        self.es = Elasticsearch(
            es_host,
            connection_class=RequestsHttpConnection,
            port=int(es_port)
        )

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

    def search(self, index_list, raw_query, search_fields=[], library_versions={}):
        # Format and structure the
        # elastic search query further.
        search_results = {
            'hits': []
        }
        es_query_body = copy.deepcopy(DOCS_QUERY_BODY)
        es_query_body['query']['multi_match']['query'] = raw_query

        for idx, val in enumerate(index_list):
            index_list[idx] = ("{0}__{1}".format(self.es_index_prefix, val))
        es_query_indexes = ",".join(index_list)

        if search_fields and type(search_fields) is not list:
            raise WrongFieldsTypeError(
                'wrong type',
                'field search_fields is of type {},'
                'should be list'.format(type(search_fields)))

        for field in search_fields:
            es_query_body['query']['multi_match']['fields'].append(field)

        if library_versions and type(library_versions) is not dict:
            raise WrongFieldsTypeError(
                'wrong type',
                'field library_versions is of type {},'
                'should be list'.format(type(library_versions)))

        if not self.es.indices.exists(self.es_index_name):
            raise NotFoundError(
                "{} index does not exist!".format(self.es_index_name))

        res = self.es.search(
            index=es_query_indexes,
            body=es_query_body
        )

        for h in res['hits']['hits']:
            # Flatten highlights if they exist and take the first index
            highlight = ""
            if 'highlight' in h:
                for k in h['highlight']:
                    for hl in h['highlight'][k]:
                        highlight += " %s" % hl

            if h["_index"] == "%s__docs" % self.es_index_prefix:
                if h['_source']['library'] in library_versions:
                    version = 'latest' if h['_source']['version'] == library_versions[h['_source']['library']] else h['_source']['version']
                else:
                    version = h['_source']['version']
                if version != 'latest' and library_versions:
                    # In case where `library_versions` is not empty
                    # and the version is considered latest
                    # throw away anything that isn't the latest version
                    continue
                try:
                    result = {
                        'type': 'doc',
                        'title': h['_source']['title'],
                        '_score': h['_score'],
                        'highlight' : highlight,
                        'library': h['_source']['library'],
                        'version': "%s (Latest)" % h['_source']['version'] if version == "latest" else version,
                        'url': "/code/{0}/{1}/{2}".format(h['_source']['library'], version, h['_source']['slug'])
                    }
                    search_results['hits'].append(result)
                except ValueError:
                    pass
                except KeyError:
                    pass
            elif h["_index"] == "%s__wagtailcore_page" % self.es_index_prefix:
                from wagtail.core.models import Page
                p = Page.objects.get(id__exact=h["_id"])
                if p.live == True:
                    try:
                        result = {
                            'type': 'page',
                            'title': h['_source']['title'],
                            '_score': h['_score'],
                            'url': '/%s' % p.url_path.split('/', 2)[2],
                            'highlight': highlight
                        }
                        search_results['hits'].append(result)
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
