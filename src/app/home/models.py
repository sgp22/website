from __future__ import absolute_import, unicode_literals

from django.db import models

from wagtail.wagtailcore.models import Page
from wagtail.wagtailcore.fields import RichTextField
from wagtail.wagtailcore.fields import StreamField
from wagtail.wagtailcore import blocks
from wagtail.wagtailadmin.edit_handlers import FieldPanel, StreamFieldPanel
from wagtail.wagtailimages.blocks import ImageChooserBlock
from wagtail.wagtailsnippets.models import register_snippet
from wagtail.wagtailsnippets.blocks import SnippetChooserBlock
from wagtail.api import APIField

class ButtonBlock(blocks.StructBlock):
    label = blocks.CharBlock(required=True)
    link = blocks.CharBlock(required=True)

class HomePage(Page):
    content = RichTextField(blank=True)

    content_panels = Page.content_panels + [
        FieldPanel('content', classname="full"),
        StreamFieldPanel('body')
    ]

    body = StreamField([
        ('ContentBanner', blocks.StructBlock([
            ('image', ImageChooserBlock(required=False)),
            ('header', blocks.CharBlock()),
            ('copy', blocks.TextBlock()),
            ('button', ButtonBlock())
        ], label="Content Banner")),
        ('OneColumnBanner', blocks.StructBlock([
            ('header', blocks.CharBlock()),
            ('intro', blocks.TextBlock()),
            ('image', ImageChooserBlock(required=False)),
        ], label="One Column Banner")),
        ('carousel', blocks.StreamBlock(
            [
                ('item', blocks.StructBlock([
                    ('image', ImageChooserBlock(required=False)),
                    ('text', blocks.TextBlock()),
                    ('author', blocks.CharBlock()),
                ]))
            ],
            label="Carousel"
        )),
    ], null=True, blank=True)

    # Export fields over the API
    api_fields = [
        APIField('title'),
        APIField('content'),
        APIField('body')
    ]