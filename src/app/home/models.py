from __future__ import absolute_import, unicode_literals

from django.db import models
from rest_framework import serializers

from wagtail.wagtailcore.models import Page
from wagtail.wagtailcore.fields import (
    StreamField,
    RichTextField
)
from wagtail.wagtailcore import blocks
from wagtail.wagtailimages.blocks import ImageChooserBlock
from wagtail.api import APIField
from wagtail.wagtailsnippets.blocks import SnippetChooserBlock as DefaultSnippetChooserBlock
from wagtail.wagtailadmin.edit_handlers import (
    InlinePanel,
    FieldPanel,
    StreamFieldPanel
)
from wagtail.contrib.table_block.blocks import TableBlock

from home import snippets
from home import relationships
from home.snippets import Footer
from home.snippets import Cornerstone
from home.serializers import (
    ElementDescriptorSerializer,
    CornerstoneSerializer
)


class ButtonBlock(blocks.StructBlock):
    label = blocks.CharBlock(required=True)
    link = blocks.CharBlock(required=True)


class DemoStreamBlock(blocks.StreamBlock):
    h2 = blocks.CharBlock(icon="title", classname="title")
    h3 = blocks.CharBlock(icon="title", classname="title")
    h4 = blocks.CharBlock(icon="title", classname="title")
    intro = blocks.RichTextBlock(icon="pilcrow")
    paragraph = blocks.RichTextBlock(icon="pilcrow")


class LandingPageSnippetChooserBlock(DefaultSnippetChooserBlock):
    def get_api_representation(self, value, context=None):
        if value:
            return {
                'id': value.id,
                'page': value.related_page.id,
                'title': value.related_page.title,
                'url': value.related_page.url,
                'url_path': value.related_page.url_path,
                'content_type': value.related_page.content_type.name,
            }


class CoreContentSnippetChooserBlock(DefaultSnippetChooserBlock):
    def get_api_representation(self, value, context=None):
        if value:
            return {
                'id': value.id,
                'name': value.name,
                'description': value.description
            }


class LandingPage(Page):
    content = StreamField([
        ('ContentBanner', blocks.StructBlock([
            ('image', ImageChooserBlock(required=False)),
            ('header', blocks.CharBlock()),
            ('page', blocks.PageChooserBlock()),
            ('copy', blocks.TextBlock()),
            ('snippet', LandingPageSnippetChooserBlock(Footer)),
            ('button', ButtonBlock()),
            ('stream', DemoStreamBlock())
        ], label="Content Banner")),
        ('OneColumnBanner', blocks.StructBlock([
            ('header', blocks.CharBlock()),
            ('intro', blocks.TextBlock()),
            ('image', ImageChooserBlock(required=False))
        ], label="One Column Banner")),
        ('test_list_block', blocks.ListBlock(blocks.StructBlock([
            ('name', blocks.CharBlock(required=True)),
            ('description', blocks.CharBlock()),
        ])))
    ], null=True, blank=True)

    @property
    def cornerstones(self):
        """
        There can be many Cornerstones
        related to many CoreContentPage.
        """
        cornerstones = [
            n.cornerstone
            for n in self.landing_page_cornerstone_relationship.all()
        ]

        return cornerstones

    content_panels = Page.content_panels + [
        StreamFieldPanel('content'),
        InlinePanel('landing_page_cornerstone_relationship')
    ]

    api_fields = [
        APIField('title'),
        APIField('content'),
        APIField(
            'cornerstones',
            serializer=serializers.ListField(
                child=CornerstoneSerializer()
            )
        )
    ]


class CoreContentPage(Page):
    content = StreamField([
        ('list_block_cornerstone_snippet', blocks.ListBlock(blocks.StructBlock([
            ('name', blocks.CharBlock(required=True)),
            ('description', blocks.CharBlock()),
            ('snippet', CoreContentSnippetChooserBlock(Cornerstone)),
        ])))
    ], null=True, blank=True)
    description = models.CharField(max_length=255)

    @property
    def cornerstones(self):
        """
        There can be many Cornerstones
        related to many CoreContentPage.
        """
        cornerstones = [
            n.cornerstone
            for n in self.core_content_page_cornerstone_relationship.all()
        ]

        return cornerstones

    content_panels = Page.content_panels + [
        StreamFieldPanel('content'),
        FieldPanel('description', classname="full"),
        InlinePanel('core_content_page_cornerstone_relationship')
    ]

    api_fields = [
        APIField('title'),
        APIField('content'),
        APIField('description'),
        APIField(
            'cornerstones',
            serializer=serializers.ListField(
                child=CornerstoneSerializer()
            )
        )
    ]


class ElementsPage(Page):
    """Elements page type."""
    @property
    def description(self):
        """
        There can be many ElementDescriptors
        related to many ElementPages.
        """
        element_descriptors = [
            n.element_descriptor
            for n in self.elements_page_element_descriptors_relationship.all()
        ]

        return element_descriptors

    types = StreamField([
        ('types', blocks.StructBlock([
            ('name', blocks.CharBlock(required=True)),
            ('detail', blocks.CharBlock(required=True))
        ]))
    ], null=True, blank=True)

    options = StreamField([
        ('options', blocks.StructBlock([
            ('name', blocks.CharBlock(required=True)),
            ('detail', blocks.CharBlock(required=True))
        ]))
    ], null=True, blank=True)

    states = models.CharField(
        max_length=255,
        null=True,
        blank=True)

    content_panels = Page.content_panels + [
        InlinePanel('elements_page_element_descriptors_relationship'),
        StreamFieldPanel('types'),
        StreamFieldPanel('options'),
        FieldPanel('states')
    ]

    api_fields = [
        APIField('title'),
        APIField(
            'description',
            serializer=serializers.ListField(
                child=ElementDescriptorSerializer()
            )
        ),
        APIField('types'),
        APIField('options'),
        APIField('states'),
    ]
