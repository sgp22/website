from __future__ import absolute_import, unicode_literals

from collections import OrderedDict

from rest_framework import serializers

from wagtail.api.v2.serializers import PageSerializer, Field, StreamField, get_serializer_class
from wagtail.api.v2.utils import get_full_url
from wagtail.wagtailcore.models import Page

from rest_framework.fields import Field, ReadOnlyField


def get_page_serializer_class(value):
    return get_serializer_class(
        value.__class__,
        ['id', 'type', 'detail_url', 'html_url', 'title', 'slug'],
        meta_fields=['type', 'detail_url', 'html_url'],
        base=PageSerializer
    )


def get_children_hirarchy(obj):
    """Recursively generate the children hirarchy."""
    children_list = []
    children_count = 0
    children = obj.get_children().live()

    if children:
        children_count = children.count()

        for child in children:
            children_list.append(get_children_hirarchy(child))

    return OrderedDict([
        ('id', obj.id),
        ('slug', obj.slug),
        ('url', obj.url),
        ('url_path', obj.url_path),
        ('children_count', children_count),
        ('children', children_list),
    ])


class PageStatusField(Field):
    """Serializes the "status" field."""
    def get_attribute(self, instance):
        return instance

    def to_representation(self, page):
        return OrderedDict([
            ('status', page.status_string),
            ('live', page.live),
            ('has_unpublished_changes', page.has_unpublished_changes),
        ])


class PageListField(Field):
    """Serializes a list of Page objects."""
    def to_representation(self, value):
        if not value:
            return []

        serializer_class = get_page_serializer_class(value[0])
        serializer = serializer_class(context=self.context)

        return [
            serializer.to_representation(child_object)
            for child_object in value
        ]


class PageChildrenField(Field):
    """Serializes the "children" field."""
    def get_attribute(self, instance):
        return instance

    def to_representation(self, page):
        child_structure = get_children_hirarchy(page)

        return OrderedDict([
            ('children_count', child_structure['children_count']),
            ('children', child_structure['children'])
        ])


class PageParentField(Field):
    def get_attribute(self, instance):
        return instance

    def to_representation(self, page):
        return {
            'id': page.get_parent().id,
            'slug': page.get_parent().slug,
            'url': page.get_parent().url,
            'url_path': page.get_parent().url_path
        }


class ElementDescriptorSerializer(serializers.ModelSerializer):
    """Default ElementDescriptior snippet serializer."""
    class Meta:
        model = 'home.ElementDescriptor'
        fields = ('id', 'name', 'descriptor_type', 'description')


class CornerstoneSerializer(serializers.ModelSerializer):
    """Default Cornerstone snippet serializer."""
    class Meta:
        model = 'home.Cornerstone'
        fields = ('id', 'name', 'description')


class CustomPageSerializer(PageSerializer):
    status = PageStatusField(read_only=True)
    children = PageChildrenField(read_only=True)
    parent = PageParentField(read_only=True)
