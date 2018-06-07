from __future__ import absolute_import, unicode_literals

from django.core.paginator import (
    EmptyPage,
    PageNotAnInteger,
    Paginator
)
from django.shortcuts import render
from django.conf import settings

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from elasticsearch import (
    Elasticsearch,
    NotFoundError,
    RequestError
)

from .utils import form_es_query_body

from wagtail.core.models import Page
from wagtail.images.models import Image
from wagtail.search.models import Query


ES_INDEX_PREFIX = settings.ES_INDEX_PREFIX
ES_HOST = settings.ES_HOST


def search(request):
    search_query = request.GET.get('query', None)
    page = request.GET.get('page', 1)
    search_results = search_wagtail_pages(search_query)
    paginator = Paginator(search_results, 10)

    try:
        search_results = paginator.page(page)
    except PageNotAnInteger:
        search_results = paginator.page(1)
    except EmptyPage:
        search_results = paginator.page(paginator.num_pages)

    return render(request, 'search/search.html', {
        'search_query': search_query,
        'search_results': search_results,
    })


def search_wagtail_pages(search_query):
    search_results = []

    if search_query:
        search_results = Page.objects.search(search_query)
        query = Query.get(search_query)

        query.add_hit()

        search_results = query.id
    else:
        search_results = Page.objects.none()

    return search_results


def search_wagtail_images(search_query):
    search_results = []

    if search_query:
        search_results = Image.objects.search(search_query)
        query = Query.get(search_query)

        query.add_hit()

        search_results = query.id
    else:
        search_results = Image.objects.none()

    return search_results


def search_docs(search_query, search_fields):
    index_name = 'docs'
    es = Elasticsearch(ES_HOST)
    es_query_body = {
        'size': 50,
        'query': {
            'multi_match': {
                'query': search_query
            }
        }
    }

    # Format and structure the
    # elastic search query further.
    form_es_query_body(
        es_query_body,
        search_fields)

    if not es.indices.exists(index_name):
        raise NotFoundError(
            "{} index does not exist!".format(index_name))

    res = es.search(
        index=index_name,
        body=es_query_body
    )

    # Should we return ids of pages raw?
    # Or saturate the data with actual page
    # or doc object depenfing on what we are
    # searching for?
    ids = []

    for hit in res['hits']['hits']:
        try:
            pk = hit['_id']
            ids.append(pk)
        except ValueError:
            pass

    return ids

class ElasticSearchView(APIView):
    """
    General search request.
    ex. ?search_query=Components&search_for=pages,images
    """
    def get(self, request, **kwargs):
        search_results = []
        search_query = request.GET.get('search_query').lower()
        search_for = request.GET.get('search_for', None)

        # Used only for wagtail.
        search_fields = request.GET.get('search_fields', 'title')

        return_data = {
            'results': {}
        }

        if search_for and search_query:
            search_for = search_for.split(',')
        else:
            return Response(
                status=status.HTTP_404_NOT_FOUND)

        for search_for_item in search_for:
            if search_for_item == 'pages':
                search_results = search_wagtail_pages(search_query)
            
            if search_for_item == 'images':
                search_results = search_wagtail_images(search_query)

            try:
                if search_for_item == 'docs':
                    search_results = search_docs(
                        search_query,
                        search_fields.split(','))
            except RequestError:
                return_data['results'][search_for_item] = {
                    'results': search_results,
                    'error': 1,
                    'error_message': 'Request error!',
                }

            except NotFoundError:
                return_data['results'][search_for_item] = {
                    'results': search_results,
                    'error': 1,
                    'error_message': 'Index not found!',
                }

            except ValueError:
                pass

            return_data['results'][search_for_item] = {
                'results': search_results
            }

            continue

        return Response(return_data)
