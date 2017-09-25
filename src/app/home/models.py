from __future__ import absolute_import, unicode_literals

from django.db import models

from wagtail.wagtailcore.models import Page
from wagtail.wagtailcore.fields import RichTextField
from wagtail.wagtailcore.fields import StreamField
from wagtail.wagtailcore import blocks
from wagtail.wagtailsnippets.blocks import SnippetChooserBlock
from wagtail.wagtailadmin.edit_handlers import FieldPanel, StreamFieldPanel
from wagtail.wagtailimages.blocks import ImageChooserBlock
from wagtail.api import APIField
from wagtail.wagtailsnippets.models import register_snippet
from wagtail.wagtailadmin.edit_handlers import (
    PageChooserPanel
)

@register_snippet
class FooterPages(models.Model):
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
            ('snippet', SnippetChooserBlock(FooterPages)),
            ('button', ButtonBlock()),
            ('stream', DemoStreamBlock())
        ], label="Content Banner")),
        ('OneColumnBanner', blocks.StructBlock([
            ('header', blocks.CharBlock()),
            ('intro', blocks.TextBlock()),
            ('image', ImageChooserBlock(required=False))
        ], label="One Column Banner"))
    ], null=True, blank=True)

    # Export fields over the API
    api_fields = [
        APIField('title'),
        APIField('content'),
        APIField('body')
    ]
