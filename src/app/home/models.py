from __future__ import absolute_import, unicode_literals

from django.db import models

from wagtail.wagtailcore.models import Page
from wagtail.wagtailcore.fields import RichTextField
from wagtail.wagtailcore.fields import StreamField
from wagtail.wagtailcore import blocks
from wagtail.wagtailsnippets.blocks import SnippetChooserBlock as DefaultSnippetChooserBlock
from wagtail.wagtailadmin.edit_handlers import FieldPanel, StreamFieldPanel
from wagtail.wagtailimages.blocks import ImageChooserBlock
from wagtail.api import APIField
from wagtail.wagtailsnippets.models import register_snippet
from wagtail.wagtailadmin.edit_handlers import (
    PageChooserPanel
)

class SnippetChooserBlock(DefaultSnippetChooserBlock):
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

@register_snippet
class Footer(models.Model):
    related_page = models.ForeignKey(
        'wagtailcore.Page',
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+',
        verbose_name='Page link',
        help_text='Choose a page to link'
    )

    panels = [
        PageChooserPanel('related_page')
    ]

    def __str__(self):
        return self.related_page.title

class ButtonBlock(blocks.StructBlock):
    label = blocks.CharBlock(required=True)
    link = blocks.CharBlock(required=True)

class DemoStreamBlock(blocks.StreamBlock):
    h2 = blocks.CharBlock(icon="title", classname="title")
    h3 = blocks.CharBlock(icon="title", classname="title")
    h4 = blocks.CharBlock(icon="title", classname="title")
    intro = blocks.RichTextBlock(icon="pilcrow")
    paragraph = blocks.RichTextBlock(icon="pilcrow")

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
            ('page', blocks.PageChooserBlock()),
            ('copy', blocks.TextBlock()),
            ('snippet', SnippetChooserBlock(Footer)),
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

    # Export fields over the API
    api_fields = [
        APIField('title'),
        APIField('content'),
        APIField('body')
    ]
