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

    filter_backends = PagesAPIEndpoint.filter_backends + [
        ChildOfFilter,
        DescendantOfFilter,
        HasChildrenFilter,
    ]

    # Set the fields that show up in meta.
    meta_fields = PagesAPIEndpoint.meta_fields + [
        'latest_revision_created_at',
        'status',
        'children',
        'menu_order',
    ]

    listing_default_fields = PagesAPIEndpoint.listing_default_fields + [
        'latest_revision_created_at',
        'status',
        'children',
        'parent',
        'menu_order',
    ]

    # Leaving this just in case if somewhere in the app we still
    # use the "&has_children=false/true" url parameter.
    known_query_parameters = PagesAPIEndpoint.known_query_parameters.union([
        'preview',
        'has_children'
    ])

    # Including all of the below just for reference,
    # even tho it can be deleted.
    def listing_view(self, request):
        response = super(CustomPageAPIEndpoint, self).listing_view(request)
        return response


    def detail_view(self, request, pk):
        response = super(CustomPageAPIEndpoint, self).detail_view(request, pk)
        return response

    def filter_page_type(self, queryset, page_models):
        qs = queryset.none()

        for model in page_models:
            qs |= queryset.type(model)

        return qs

    def get_queryset(self):
        request = self.request

        # Allow pages to be filtered to a specific type.
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
            queryset = self.filter_page_type(queryset, models)

        # Get live pages that are not in a private section.
        queryset = queryset.public().live()

        # Filter by site.
        queryset = queryset.descendant_of(request.site.root_page, inclusive=True)

        return queryset

    def get_object(self):
        request = self.request
        base = super(CustomPageAPIEndpoint, self).get_object()
        preview = request.GET.get('preview', False)

        if preview:
            return base.get_latest_revision().as_page_object().specific

        return base.specific

    @classmethod
    def get_urlpatterns(cls):
        """GET on list and detail."""
        return [
            url(r'^$', cls.as_view({'get': 'listing_view'}), name='listing'),
            url(r'^(?P<pk>\d+)/$', cls.as_view({'get': 'detail_view'}), name='detail'),
        ]
