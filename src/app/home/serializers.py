from __future__ import absolute_import, unicode_literals

from collections import OrderedDict

from rest_framework import serializers

from wagtail import wagtailimages
from wagtail.api.v2.serializers import PageSerializer, Field, StreamField, get_serializer_class
from wagtail.api.v2.utils import get_full_url
from wagtail.wagtailcore.models import Page
from wagtail.wagtailimages.blocks import ImageChooserBlock
from wagtail.wagtailimages.models import Image as WagtailImage

from rest_framework.fields import Field, ReadOnlyField

import bleach
import markdown
from markdown.extensions import Extension

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
    menu_order = getattr(obj.specific, 'menu_order', 0)

    if children:
        children_count = children.count()

        for child in children:
            children_list.append(get_children_hirarchy(child))
    
    return OrderedDict([
        ('id', obj.id),
        ('title', obj.title),
        ('slug', obj.slug),
        ('url', obj.url),
        ('url_path', obj.url_path),
        ('children_count', children_count),
        ('children', children_list),
        ('menu_order', menu_order),
    ])

class WagtailImageSerializer(serializers.ModelSerializer):
    """Serializes the image field that is used in
    the CoreContent Page StreamField.."""
    class Meta:
        model = WagtailImage
        fields = ['title', 'file', 'width', 'height', 'file_size']


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


class PageMenuOrderField(Field):
    """Serializes the "menu_order" field.
     It shows up in meta, this is the only way we where able to
     get it to show up in list view. For some reason, just adding
     it to listing_default_fields does not work."""
    def get_attribute(self, instance):
        return instance

    def to_representation(self, page):
        obj = page.specific

        return obj.menu_order if hasattr(obj, 'menu_order') else None


'''
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
'''


class PageChildrenField(Field):
    """Serializes the "children" field."""
    def get_attribute(self, instance):
        return instance

    def to_representation(self, page):
        child_structure = get_children_hirarchy(page)

        return OrderedDict([
            ('children_count', child_structure['children_count']),
            ('children', child_structure['children']),
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


def element_single_descriptor_serializer(obj):
    """
    Serializes the WhatItDoes, WhatUserCanDo WhenToUseIt snippets,
    since they are all the same structure.  Could be refactored.
    """
    if obj is None:
        return None

    return {
        'id': obj.id,
        'name': obj.name,
        'description': obj.description
    }


class ElementDescriptorSerializer(serializers.ModelSerializer):
    """Default ElementDescriptior snippet serializer."""
    def get_attribute(self, instance):
        return instance

    def to_representation(self, page):
        return {
            'what_it_does': element_single_descriptor_serializer(page.what_it_does),
            'what_user_can_do': element_single_descriptor_serializer(page.what_user_can_do),
            'when_to_use_it': element_single_descriptor_serializer(page.when_to_use_it),
        }


class CornerstoneSerializer(serializers.ModelSerializer):
    """Default Cornerstone snippet serializer."""
    class Meta:
        model = 'home.Cornerstone'
        fields = ('id', 'name', 'description')


class EscapeHtml(Extension):
    def extendMarkdown(self, md, md_globals):
        del md.preprocessors['html_block']
        del md.inlinePatterns['html']


class CustomPageSerializer(PageSerializer):
    status = PageStatusField(read_only=True)
    children = PageChildrenField(read_only=True)
    parent = PageParentField(read_only=True)
    menu_order = PageMenuOrderField(read_only=True)