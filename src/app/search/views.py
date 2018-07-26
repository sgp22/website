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

from .utils import DocsIndexer

from wagtail.core.models import Page
from wagtail.images.models import Image
from wagtail.search.models import Query
from wagtail.api.v2.serializers import (
    StreamField
)

from wagtail.search.backends.base import SearchFieldError

from home.serializers import (
    get_page_serializer_class,
    CustomPageSerializer,
    PageStatusField,
    PageSerializer,
    PageMenuOrderField,
)

from home.models import (
    PageBase,
    LandingPage,
    CoreContentPage,
    ElementsPage,
    BlocksPage,
    BlogPostPage,
    BlogLandingPage,
)

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


class LandingPageSerializer(CustomPageSerializer):
    meta_fields = ['type', 'detail_url', 'html_url']

    class Meta:
        model = LandingPage
        fields = (
            'id',
            'html_url',
            'search_description',
            'title',
            'page_hero',
            'content',
            'status',
            'menu_order'
        )


class CoreContentPageSerializer(CustomPageSerializer):
    meta_fields = ['type', 'detail_url', 'html_url']

    class Meta:
        model = CoreContentPage
        fields = (
            'id',
            'html_url',
            'search_description',
            'title',
            'body',
            'cross_link',
            'demo_link',
            'description',
            'status',
            'menu_order'
        )

class ElementsPageSerializer(CustomPageSerializer):
    meta_fields = ['type', 'detail_url', 'html_url']

    class Meta:
        model = ElementsPage
        fields = (
            'id',
            'html_url',
            'search_description',
            'title',
            'cross_link',
            'demo_link',
            'fka',
            'types',
            'modifiers',
            'tokensCategory',
            'states',
            'body'
        )

class BlocksPageSerializer(CustomPageSerializer):
    meta_fields = ['type', 'detail_url', 'html_url']

    class Meta:
        model = BlocksPage
        fields = (
            'id',
            'html_url',
            'search_description',
            'title',
            'cross_link',
            'demo_link',
            'fka',
            'types',
            'modifiers',
            'tokensCategory',
            'body'
        )

class BlogPostPageSerializer(CustomPageSerializer):
    meta_fields = ['type', 'detail_url', 'html_url']

    class Meta:
        model = BlogPostPage
        fields = (
            'id',
            'title',
            'search_description',
            'author',
            'content'
        )

def serialize_by_page_type(model_class_name, pk):
    if model_class_name == 'LandingPage':
        obj = LandingPage.objects.get(pk=pk)
        serializer = LandingPageSerializer

        return serializer(obj)

    if model_class_name == 'CoreContentPage':
        obj = CoreContentPage.objects.get(pk=pk)
        serializer = CoreContentPageSerializer

        return serializer(obj)

    if model_class_name == 'ElementsPage':
        obj = ElementsPage.objects.get(pk=pk)
        serializer = ElementsPageSerializer

        return serializer(obj)

    if model_class_name == 'BlocksPage':
        obj = BlocksPage.objects.get(pk=pk)
        serializer = BlocksPageSerializer

        return serializer(obj)

    if model_class_name == 'BlogPostPage':
        obj = BlogPostPage.objects.get(pk=pk)
        serializer = BlogPostPageSerializer

        return serializer(obj)

    return None


def search_wagtail(search_query, search_for='pages', fill_data=False, fields=[]):
    """
    Searches wagtail image and page data, combines the results.

    Inspect the result object in search_results like so dir(result)
    to populate the serializers with the fields that are needed
    for the frontend.
    """
    results = []

    if search_query:
        if search_for == 'pages':
            page_models = [
                'LandingPage',
                'CoreContentPage',
                'ElementsPage',
                'BlocksPage',
                'BlogLandingPage',
                'BlogPostPage',
            ]

            for page_model in page_models:
                model = eval(page_model)
                search_results = model.objects.all().search(
                    search_query,
                    fields=fields).annotate_score('_score')

                for result in search_results:
                    page_class_name = result.specific.__class__.__name__
                    page_serializer = serialize_by_page_type(page_class_name, result.pk)

                    if page_serializer != None:
                        results.append(page_serializer.data)

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

    return results

class ElasticSearchView(APIView):
    """
    General search request.
    ex. ?search_query=Components
        &search_in=pages,images,docs
        &wt_search_fields=title,content
        &docs_search_fields=path,content
    """
    def get(self, request, **kwargs):
        search_query = request.GET.get('search_query', None)
        search_in = request.GET.get('search_in', None)

        # Used only for wagtail.
        # This is optional, and is used to only narrow down scope.
        # If this is omitted then wagtail searches the fields defined
        # as searchable.
        wt_search_fields = request.GET.get('wt_search_fields', None)

        # Used only for docs.
        docs_search_fields = request.GET.get('docs_search_fields', None)

        return_data = {
            'results': {}
        }

        if search_in and search_query:
            search_in_list = list(set(search_in.split(',')))
            search_in_list = list(filter(None, search_in_list))
            search_query = search_query.lower()
        else:
            return Response(
                status=status.HTTP_404_NOT_FOUND)

        for search_in_item in search_in_list:
            if search_in_item == 'pages':
                search_results = []

                if wt_search_fields is not None:
                    wt_search_fields = wt_search_fields.split(',')
                    search_results = search_wagtail(
                        search_query,
                        fields=wt_search_fields)
                else:
                    search_results = search_wagtail(
                        search_query)

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
                    search_results = []
                    docs_search = DocsIndexer(
                        ES_HOST,
                        'docs',
                        ES_INDEX_PREFIX)

                    if docs_search_fields is not None:
                        docs_search_fields = docs_search_fields.split(',')
                        search_results = docs_search.search(
                            search_query,
                            docs_search_fields)
                    else:
                        search_results = docs_search.search(
                            search_query)

                return_data['results'][search_in_item] = search_results
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
