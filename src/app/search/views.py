from __future__ import absolute_import, unicode_literals

from django.core.paginator import EmptyPage, PageNotAnInteger, Paginator
from django.shortcuts import render

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
from wagtail.search.models import Query


def search(request):
    search_query = request.GET.get('query', None)
    page = request.GET.get('page', 1)

    # Search
    if search_query:
        search_results = Page.objects.live().search(search_query)
        query = Query.get(search_query)

        # Record hit
        query.add_hit()
    else:
        search_results = Page.objects.none()

    # Pagination
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


class ElasticSearchView(APIView):
    def get(self, request, **kwargs):
        raw_query = request.GET.get('search')

        if raw_query:
            index = kwargs['index']
            es = Elasticsearch('elasticsearch')
            es_query_body = {
                'size': 50,
                'query': {
                    'multi_match': {
                        'type': 'best_fields',
                        'query': raw_query,
                        'operator': 'and',
                        'fields': []
                    }
                }
            }

            # Format and structure the
            # elastic search query further.
            form_es_query_body(
                es_query_body,
                request.GET.get('filters'))

            if not es.indices.exists(index):
                return Response(
                    'Index does not exist',
                    status=status.HTTP_404_NOT_FOUND
                )

            try:
                res = es.search(
                    index=index,
                    body=es_query_body
                )
            except (NotFoundError, RequestError):
                return Response(
                    'The data is indexed and the index exists.  However, '
                    'this error is invoked because there are no '
                    'fields to search against. ',
                    status=status.HTTP_404_NOT_FOUND,
                )

            # Should we return ids of pages raw?
            # Or saturate the data with actual page
            # or doc object depenfing on what we are
            # searching for?
            ids = []

            for hit in res['hits']['hits']:
                try:
                    pk = int(hit['_id'])
                    ids.append(pk)
                except ValueError:
                    pass

            return Response(res)

        return Response(
            status=status.HTTP_404_NOT_FOUND)
