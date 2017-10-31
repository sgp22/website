from collections import OrderedDict

from django.conf.urls import url

from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from wagtail.api.v2.endpoints import PagesAPIEndpoint
from wagtail.api.v2.endpoints import BaseAPIEndpoint
from wagtail.api.v2.router import WagtailAPIRouter


from wagtail.api.v2.filters import (
    ChildOfFilter, DescendantOfFilter, FieldsFilter, OrderingFilter, SearchFilter)
from wagtail.api.v2.utils import (
    BadRequestError, filter_page_type, page_models_from_string)
from wagtail.wagtailcore.models import Page


from .filters import HasChildrenFilter
from .serializers import CustomPageSerializer


class CustomPageAPIEndpoint(PagesAPIEndpoint):
    """
    Same as Pages API Endpoint but returns page with
    custom content like the child hirarchy and other
    extra data.
    """
    base_serializer_class = CustomPageSerializer

    filter_backends = [
        FieldsFilter,
        ChildOfFilter,
        DescendantOfFilter,
        HasChildrenFilter,
        OrderingFilter,
        SearchFilter,
    ]

    meta_fields = PagesAPIEndpoint.meta_fields + [
        'latest_revision_created_at',
        'status',
        'children',
    ]

    body_fields = PagesAPIEndpoint.body_fields + []

    listing_default_fields = PagesAPIEndpoint.listing_default_fields + [
        'latest_revision_created_at',
        'status',
        'children',
        'parent'
    ]

    # Allow the parent field to appear on listings.
    detail_only_fields = []

    # Leaving this just in case if somewhere in the app we still
    # use the "&has_children=false/true" url parameter.
    known_query_parameters = PagesAPIEndpoint.known_query_parameters.union([
        'has_children'
    ])

    def get_queryset(self):
        request = self.request

        # Allow pages to be filtered to a specific type
        # (Core, Elements, Blocks, Landing, etc...).
        # Default to wagtailcore.Page.
        try:
            models = page_models_from_string(request.GET.get('type', 'wagtailcore.Page'))
        except (LookupError, ValueError):
            raise BadRequestError("type doesn't exist")

        if not models:
            models = [Page]

        if len(models) == 1:
            queryset = models[0].objects.all()
        else:
            queryset = Page.objects.all()

            # Filter pages by specified models.
            queryset = filter_page_type(queryset, models)

        queryset = queryset.exclude(depth=1).specific()

        return queryset

    def get_type_info(self):
        types = OrderedDict()

        for name, model in self.seen_types.items():
            types[name] = OrderedDict([
                ('verbose_name', model._meta.verbose_name),
                ('verbose_name_plural', model._meta.verbose_name_plural),
            ])

        return types

    def listing_view(self, request):
        response = super(CustomPageAPIEndpoint, self).listing_view(request)
        return response


    def detail_view(self, request, pk):
        response = super(CustomPageAPIEndpoint, self).detail_view(request, pk)
        return response

    @classmethod
    def get_urlpatterns(cls):
        """GET on list and detail."""
        return [
            url(r'^$', cls.as_view({'get': 'listing_view'}), name='listing'),
            url(r'^(?P<pk>\d+)/$', cls.as_view({'get': 'detail_view'}), name='detail'),
        ]
