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

from .serializers import (
    SearchPageSerializer,
    SearchImageSerializer,
)


ES_INDEX_PREFIX = settings.ES_INDEX_PREFIX
ES_HOST = settings.ES_HOST


def search(request):
    search_query = request.GET.get('query', None)
    page = request.GET.get('page', 1)
    search_results = search_wagtail(search_query)
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


def search_wagtail(search_query, search_for='pages', fields=[]):
    """
    Searches wagtail image and page data, combines the results.

    Inspect the result object in search_results like so dir(result)
    to populate the serializers with the fields that are needed
    for the frontend.
    """
    results = []

    if search_query:
        if search_for == 'pages':
            search_results = Page.objects.live().search(
                search_query,
                fields=fields).annotate_score('_score')

            for result in search_results:
                serializer = SearchPageSerializer(result)
                results.append(serializer.data)
        
        if search_for == 'images':
            search_results = Image.objects.search(search_query).annotate_score('_score')

            for result in search_results:
                serializer = SearchImageSerializer(result)
                results.append(serializer.data)

    else:
        if search_for == 'pages':
            search_results = Page.objects.none()

        if search_for == 'images':
            search_results = Image.objects.none()

        print(search_results)

    return results


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
    ex. ?search_query=Components&search_in=pages,images,docs
    """
    def get(self, request, **kwargs):
        search_results = []
        search_query = request.GET.get('search_query', None)
        search_in = request.GET.get('search_in', None)

        # Used only for wagtail.
        search_fields = request.GET.get('search_fields', [])

        return_data = {
            'results': {}
        }

        if search_in and search_query:
            search_in = search_in.split(',')
            search_query = search_query.lower()
        else:
            return Response(
                status=status.HTTP_404_NOT_FOUND)

        for search_in_item in search_in:
            if search_in_item == 'pages':
                search_results = search_wagtail(
                    search_query,
                    fields=search_fields.split(','))

                return_data['results'][search_in_item] = {
                    'results': search_results
                }
            
            if search_in_item == 'images':
                search_results = search_wagtail(search_query, search_for='images')

                return_data['results'][search_in_item] = {
                    'results': search_results
                }

            try:
                if search_in_item == 'docs':
                    search_results = search_docs(
                        search_query,
                        search_fields.split(','))
            except RequestError:
                return_data['results'][search_in_item] = {
                    'results': search_results,
                    'error': 1,
                    'error_message': 'Request error!',
                }

            except NotFoundError:
                return_data['results'][search_in_item] = {
                    'results': search_results,
                    'error': 1,
                    'error_message': 'Index not found!',
                }

            except ValueError:
                pass

            continue

        return Response(return_data)
