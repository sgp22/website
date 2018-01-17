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
    FieldPanel,
    StreamFieldPanel,
    MultiFieldPanel
)
from wagtail.wagtailsnippets.edit_handlers import SnippetChooserPanel

from home import relationships

from home.serializers import (
    ElementDescriptorSerializer,
    WagtailImageSerializer
)

import markdown
from wagtailmarkdownblock.blocks import MarkdownBlock

class APIImageChooserBlock(ImageChooserBlock):
    def get_api_representation(self, value, context=None):
        if value:
            return WagtailImageSerializer(context=context).to_representation(value)

def markdown_filter(data):
    if not data:
        return ''

    md = markdown.Markdown(
        safe_mode="replace",
        html_replacement_text="--RAW HTML NOT ALLOWED--"
    )

    return md.convert(data)


class APIMarkDownBlock(MarkdownBlock):
    def get_api_representation(self, value, context=None):
        if value:
            return markdown_filter(value)


class APIRichTextBlock(blocks.RichTextBlock):
    # By overriding this function, we get the raw data value
    # which is what we wanted, so we return the string.
    def get_api_representation(self, value, context=None):
        if value:
            return str(value)


class FullWidthStreamField(blocks.StructBlock):
    title = blocks.CharBlock()
    content = blocks.TextBlock()
    cta_text = blocks.CharBlock(required=False)
    cta_link = blocks.CharBlock(required=False, help_text="enter slug or link")
    hero_image = APIImageChooserBlock(required=False)
    background_image = APIImageChooserBlock(required=False)
    background_color = blocks.CharBlock(required=False, max_length=6, help_text="enter hex code")
    invert_text_color = blocks.BooleanBlock(required=False, help_text="check to invert text color")
    text_align = blocks.ChoiceBlock(choices=[
        ('left', 'left'),
        ('center', 'center'),
        ('right', 'right')
    ], required=False)


class TwoColumnStreamField(blocks.StructBlock):
    column_1_title = blocks.CharBlock()
    column_1_content = blocks.TextBlock()
    column_1_cta_text = blocks.CharBlock(required=False)
    column_1_cta_link = blocks.CharBlock(required=False, help_text="enter slug or link")
    column_1_hero_image = APIImageChooserBlock(required=False)
    column_1_background_image = APIImageChooserBlock(required=False)
    column_1_background_color = blocks.CharBlock(required=False, max_length=6, help_text="enter 6 digit hex code without #")
    column_1_invert_text_color = blocks.BooleanBlock(required=False, help_text="check to invert text color")
    column_1_text_align = blocks.ChoiceBlock(choices=[
        ('left', 'left'),
        ('center', 'center'),
        ('right', 'right')
    ], required=False)
    column_2_title = blocks.CharBlock()
    column_2_content = blocks.TextBlock()
    column_2_cta_text = blocks.CharBlock(required=False)
    column_2_cta_link = blocks.CharBlock(required=False, help_text="enter slug or link")
    column_2_hero_image = APIImageChooserBlock(required=False)
    column_2_background_image = APIImageChooserBlock(required=False)
    column_2_background_color = blocks.CharBlock(required=False, max_length=6, help_text="enter 6 digit hex code without #")
    column_2_invert_text_color = blocks.BooleanBlock(required=False, help_text="check to invert text color")
    column_2_text_align = blocks.ChoiceBlock(choices=[
        ('left', 'left'),
        ('center', 'center'),
        ('right', 'right')
    ], required=False)
    class Meta:
        form_classname = 'two-column-block struct-block'


class TwoColTextImageStreamField(blocks.StructBlock):
    title = blocks.CharBlock()
    content = blocks.TextBlock()
    cta_text = blocks.CharBlock(required=False)
    cta_link = blocks.CharBlock(required=False, help_text="enter slug or link")
    image = APIImageChooserBlock(required=False)
    image_align = blocks.ChoiceBlock(choices=[
        ('left', 'left'),
        ('right', 'right')
    ], required=False)
    background_image = APIImageChooserBlock(required=False)
    background_color = blocks.CharBlock(required=False, max_length=6, help_text="enter hex code")
    invert_text_color = blocks.BooleanBlock(required=False, help_text="check to invert text color")


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


class PageBase(Page):
    is_creatable = False

    @property
    def get_live_children(self):
        return self.get_children().live()

    class Meta:
        proxy = True


class LandingPage(PageBase):
    menu_order = models.IntegerField(default=0)
    content = StreamField([
        ('fullWidth', FullWidthStreamField()),
        ('twoColumn', TwoColumnStreamField()),
        ('twoColTextImage', TwoColTextImageStreamField()),
        ('markdown', APIMarkDownBlock()),
        ('rawHtml', blocks.RawHTMLBlock()),
        ('richText', APIRichTextBlock())
    ], null=True, blank=True)

    content_panels = Page.content_panels + [
        StreamFieldPanel('content')
    ]

    promote_panels = Page.promote_panels + [
        FieldPanel('menu_order', classname="full"),
    ]

    api_fields = [
        APIField('menu_order'),
        APIField('title'),
        APIField('content')
    ]


class CoreContentPage(PageBase):
    menu_order = models.IntegerField(default=0)
    body = StreamField([
        ('heading', blocks.CharBlock(classname="full title")),
        ('richText', APIRichTextBlock()),
        ('image', APIImageChooserBlock()),
        ('markdown', APIMarkDownBlock())
    ], null=True, blank=True)
    description = models.CharField(max_length=255)

    content_panels = Page.content_panels + [
        StreamFieldPanel('body'),
        FieldPanel('description', classname="full"),
    ]

    promote_panels = Page.promote_panels + [
        FieldPanel('menu_order', classname="full"),
    ]

    api_fields = [
        APIField('menu_order'),
        APIField('title'),
        APIField('body'),
        APIField('description'),
    ]


class ElementsPage(PageBase):
    """Elements page type."""
    @property
    def description(self):
        """
        There can be many ElementDescriptors
        related to many ElementPages.
        TODO: This is not showing up in the admin panel
        and the rest response for this page type returns an
        empty description array description: [ ]...
        """
        element_descriptors = [
            n.element_descriptor
            for n in self.elements_page_element_descriptors_relationship.all()
        ]

        return element_descriptors

    what_it_does = models.ForeignKey(
        'WhatItDoes',
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+',
        help_text='select a snippet from the what it does type',
        verbose_name='What it does',
    )

    what_user_can_do = models.ForeignKey(
        'WhatUserCanDo',
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+',
        help_text='select a snippet from the what user can do type',
        verbose_name='What user can do',
    )

    when_to_use_it = models.ForeignKey(
        'WhenToUseIt',
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+',
        help_text='select a snippet from the when to use it type',
        verbose_name='When to use it',
    )

    fka = models.CharField(
        verbose_name="Formerly Known As",
        max_length=255,
        blank=True
    )

    types = StreamField([
        ('types', blocks.StructBlock([
            ('name', blocks.CharBlock(required=True)),
            ('detail', blocks.CharBlock(required=True)),
            ('image', APIImageChooserBlock(required=False)),
            ('image_type', blocks.ChoiceBlock(choices=[
                ('full-width', 'Full Width'),
                ('inline', 'Inline')
            ], required=False )),
        ]))
    ], null=True, blank=True)

    options = StreamField([
        ('options', blocks.StructBlock([
            ('name', blocks.CharBlock(required=True)),
            ('detail', blocks.CharBlock(required=True))
        ]))
    ], null=True, blank=True)

    states = StreamField([
        ('states', blocks.StructBlock([
            ('state', blocks.CharBlock(required=True)),
        ]))
    ], null=True, blank=True)

    body = StreamField([
        ('richText', APIRichTextBlock()),
        ('markdown', APIMarkDownBlock())
    ], null=True, blank=True)

    content_panels = Page.content_panels + [
        FieldPanel('fka'),
        MultiFieldPanel([
            SnippetChooserPanel('what_it_does'),
            SnippetChooserPanel('what_user_can_do'),
            SnippetChooserPanel('when_to_use_it')
        ]),
        StreamFieldPanel('types'),
        StreamFieldPanel('options'),
        StreamFieldPanel('states'),
        StreamFieldPanel('body')
    ]

    api_fields = [
        APIField('title'),
        APIField('fka'),
        APIField('descriptors', serializer=ElementDescriptorSerializer()),
        APIField('types'),
        APIField('options'),
        APIField('states'),
        APIField('body')
    ]

class BlocksPage(PageBase):
    @property
    def description(self):

        element_descriptors = [
            n.element_descriptor
            for n in self.blocks_page_element_descriptors_relationship.all()
        ]

        return element_descriptors

    what_it_does = models.ForeignKey(
        'WhatItDoes',
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+',
        help_text='select a snippet from the what it does type',
        verbose_name='What it does',
    )

    what_user_can_do = models.ForeignKey(
        'WhatUserCanDo',
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+',
        help_text='select a snippet from the what user can do type',
        verbose_name='What user can do',
    )

    when_to_use_it = models.ForeignKey(
        'WhenToUseIt',
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+',
        help_text='select a snippet from the when to use it type',
        verbose_name='When to use it',
    )

    fka = models.CharField(
        verbose_name="Formerly Known As",
        max_length=255,
        blank=True
    )

    types = StreamField([
        ('types', blocks.StructBlock([
            ('name', blocks.CharBlock(required=True)),
            ('detail', blocks.CharBlock(required=True)),
            ('image', APIImageChooserBlock(required=False)),
            ('image', APIImageChooserBlock(required=False)),
            ('image_type', blocks.ChoiceBlock(choices=[
                ('full-width', 'Full Width'),
                ('inline', 'Inline')
            ], required=False )),
        ]))
    ], null=True, blank=True)

    options = StreamField([
        ('options', blocks.StructBlock([
            ('name', blocks.CharBlock(required=True)),
            ('detail', blocks.CharBlock(required=True))
        ]))
    ], null=True, blank=True)

    body = StreamField([
        ('richText', APIRichTextBlock()),
        ('markdown', APIMarkDownBlock())
    ], null=True, blank=True)

    content_panels = Page.content_panels + [
        FieldPanel('fka'),
        MultiFieldPanel([
            SnippetChooserPanel('what_it_does'),
            SnippetChooserPanel('what_user_can_do'),
            SnippetChooserPanel('when_to_use_it')
        ]),
        StreamFieldPanel('types'),
        StreamFieldPanel('options'),
        StreamFieldPanel('body')
    ]

    api_fields = [
        APIField('title'),
        APIField('fka'),
        APIField('descriptors', serializer=ElementDescriptorSerializer()),
        APIField('types'),
        APIField('options'),
        APIField('body')
    ]
