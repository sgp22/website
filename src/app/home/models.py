from __future__ import absolute_import, unicode_literals

from django.contrib.postgres.fields import JSONField
from django.db import models
from rest_framework import serializers

from wagtail.core.models import Page
from wagtail.core.fields import (
    StreamField,
    RichTextField
)
from wagtail.core import blocks
from wagtail.images.blocks import ImageChooserBlock
from wagtail.api import APIField
from wagtail.snippets.blocks import SnippetChooserBlock as DefaultSnippetChooserBlock
from wagtail.admin.edit_handlers import (
    FieldPanel,
    FieldRowPanel,
    StreamFieldPanel,
    MultiFieldPanel
)
from wagtail.images.edit_handlers import ImageChooserPanel
from wagtail.snippets.edit_handlers import SnippetChooserPanel
from wagtail.contrib.table_block.blocks import TableBlock
from wagtail.search import index

from home import relationships

from home.serializers import (
    ElementDescriptorSerializer,
    WagtailImageSerializer
)

import markdown
from wagtailmarkdown.blocks import MarkdownBlock

class APIImageChooserBlock(ImageChooserBlock):
    def get_api_representation(self, value, context=None):
        if value:
            return WagtailImageSerializer(context=context).to_representation(value)

def markdown_filter(data):
    if not data:
        return ''

    md = markdown.Markdown()

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


class GridBlock(blocks.StreamBlock):
    image = APIImageChooserBlock()
    title = blocks.CharBlock()
    text = blocks.TextBlock()


class PageBase(Page):
    is_creatable = False

    @property
    def get_live_children(self):
        return self.get_children().live()

    class Meta:
        proxy = True

    def content(self):
        return ""

    search_fields = Page.search_fields + [
        index.SearchField('content'),
    ]


class LandingPage(PageBase):
    menu_order = models.IntegerField(default=0)

    page_hero = StreamField([
        ('page_hero', blocks.StructBlock([
            ('heading', blocks.CharBlock(required=True)),
            ('text', blocks.CharBlock(required=True)),
            ('image', APIImageChooserBlock(required=True)),
            ('text_color', blocks.CharBlock(required=True, help_text="enter hex code without #")),
            ('background_color', blocks.CharBlock(required=True, help_text="enter hex code without #")),
        ]))
    ], null=True, blank=True)

    content = StreamField([
        ('fullWidth', FullWidthStreamField()),
        ('twoColumn', TwoColumnStreamField()),
        ('twoColTextImage', TwoColTextImageStreamField()),
        ('markdown', APIMarkDownBlock()),
        ('rawHtml', blocks.RawHTMLBlock()),
        ('richText', APIRichTextBlock())
    ], null=True, blank=True)

    grid_blocks = StreamField([
        ('grid_blocks', blocks.StructBlock([
            ('image', APIImageChooserBlock(required=True)),
            ('title', blocks.CharBlock(required=True)),
            ('text', blocks.CharBlock(required=True))
        ]))
    ], null=True, blank=True)

    content_panels = Page.content_panels + [
        StreamFieldPanel('page_hero'),
        StreamFieldPanel('content'),
        StreamFieldPanel('grid_blocks')
    ]

    promote_panels = Page.promote_panels + [
        FieldPanel('menu_order', classname="full"),
    ]

    api_fields = [
        APIField('menu_order'),
        APIField('title'),
        APIField('page_hero'),
        APIField('content'),
        APIField('grid_blocks')
    ]

    search_fields = Page.search_fields + [
        index.SearchField('content'),
        index.SearchField('page_hero'),
        index.SearchField('grid_blocks'),
    ]


class CoreContentPage(PageBase):
    menu_order = models.IntegerField(default=0)
    body = StreamField([
        ('heading', blocks.CharBlock(classname="full title")),
        ('image', APIImageChooserBlock()),
        ('table', TableBlock()),
        ('markdown', APIMarkDownBlock()),
        ('richText', APIRichTextBlock()),
        ('tokensCategory', blocks.CharBlock()),
        ('iconType', blocks.CharBlock(label="Icon Type"))
    ], null=True, blank=True)

    description = models.CharField(max_length=255)

    cross_link = models.CharField(
        verbose_name="Cross Link",
        max_length=255,
        blank=True,
        help_text="i.e. button"
    )

    demo_link = models.CharField(
        verbose_name="Demo Link",
        max_length=255,
        blank=True,
        help_text="i.e. code/ids-web/latest/demo/ids-button/index.html"
    )

    content_panels = Page.content_panels + [
        StreamFieldPanel('body'),
        FieldPanel('cross_link'),
        FieldPanel('demo_link'),
        FieldPanel('description', classname="full"),
    ]

    promote_panels = Page.promote_panels + [
        FieldPanel('menu_order', classname="full"),
    ]

    api_fields = [
        APIField('menu_order'),
        APIField('title'),
        APIField('body'),
        APIField('cross_link'),
        APIField('demo_link'),
        APIField('description'),
    ]

    def content(self):
        return ""

    search_fields = Page.search_fields + [
        index.SearchField('body'),
        index.SearchField('description'),
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

    cross_link = models.CharField(
        verbose_name="Cross Link",
        max_length=255,
        blank=True,
        help_text="i.e. button"
    )

    demo_link = models.CharField(
        verbose_name="Demo Link",
        max_length=255,
        blank=True,
        help_text="i.e. code/ids-web/latest/demo/ids-button/index.html"
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

    modifiers = StreamField([
        # @TODO: Figure out how to rename structblock
        #        from `options` to `modifiers`
        ('options', blocks.StructBlock([
            ('name', blocks.CharBlock(required=True)),
            ('detail', blocks.CharBlock(required=True)),
            ('token', blocks.CharBlock(required=False))
        ]))
    ], null=True, blank=True )

    tokensCategory = models.CharField(
        verbose_name="Tokens Category",
        max_length=255,
        blank=True,
    )

    states = StreamField([
        ('states', blocks.StructBlock([
            ('state', blocks.CharBlock(required=True)),
        ]))
    ], null=True, blank=True)

    body = StreamField([
        ('markdown', APIMarkDownBlock()),
        ('richText', APIRichTextBlock()),
        ('heading', blocks.CharBlock(classname="full title")),
        ('image', APIImageChooserBlock())
    ], null=True, blank=True)

    content_panels = Page.content_panels + [
        FieldPanel('fka'),
        FieldPanel('cross_link'),
        FieldPanel('demo_link'),
        MultiFieldPanel([
            SnippetChooserPanel('what_it_does'),
            SnippetChooserPanel('what_user_can_do'),
            SnippetChooserPanel('when_to_use_it')
        ]),
        StreamFieldPanel('types'),
        StreamFieldPanel('modifiers'),
        FieldPanel('tokensCategory'),
        StreamFieldPanel('states'),
        StreamFieldPanel('body')
    ]

    api_fields = [
        APIField('title'),
        APIField('fka'),
        APIField('cross_link'),
        APIField('demo_link'),
        APIField('descriptors', serializer=ElementDescriptorSerializer()),
        APIField('types'),
        APIField('modifiers'),
        APIField('tokensCategory'),
        APIField('states'),
        APIField('body')
    ]

    def content(self):
        return ""

    search_fields = Page.search_fields + [
        index.SearchField('body'),
        index.SearchField('what_it_does'),
        index.SearchField('what_user_can_do'),
        index.SearchField('when_to_use_it'),
        index.SearchField('fka'),
        index.SearchField('types'),
        index.SearchField('modifiers'),
        index.SearchField('states'),
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

    cross_link = models.CharField(
        verbose_name="Cross Link",
        max_length=255,
        blank=True,
        help_text="i.e. button"
    )

    demo_link = models.CharField(
        verbose_name="Demo Link",
        max_length=255,
        blank=True,
        help_text="i.e. code/ids-web/latest/demo/ids-button/index.html"
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

    modifiers = StreamField([
        # @TODO: Figure out how to rename structblock
        #        from `options` to `modifiers`
        ('options', blocks.StructBlock([
            ('name', blocks.CharBlock(required=True)),
            ('detail', blocks.CharBlock(required=True)),
            ('token', blocks.CharBlock(required=False))
        ]))
    ], null=True, blank=True)

    tokensCategory = models.CharField(
        verbose_name="Tokens Category",
        max_length=255,
        blank=True,
    )

    body = StreamField([
        ('image', APIImageChooserBlock()),
        ('heading', blocks.CharBlock(classname="full title")),
        ('richText', APIRichTextBlock()),
        ('markdown', APIMarkDownBlock())
    ], null=True, blank=True)

    content_panels = Page.content_panels + [
        FieldPanel('fka'),
        FieldPanel('cross_link'),
        FieldPanel('demo_link'),
        MultiFieldPanel([
            SnippetChooserPanel('what_it_does'),
            SnippetChooserPanel('what_user_can_do'),
            SnippetChooserPanel('when_to_use_it')
        ]),
        StreamFieldPanel('types'),
        StreamFieldPanel('modifiers'),
        FieldPanel('tokensCategory'),
        StreamFieldPanel('body')
    ]

    api_fields = [
        APIField('title'),
        APIField('fka'),
        APIField('cross_link'),
        APIField('demo_link'),
        APIField('descriptors', serializer=ElementDescriptorSerializer()),
        APIField('types'),
        APIField('modifiers'),
        APIField('tokensCategory'),
        APIField('body')
    ]

    def content(self):
        return ""

    search_fields = Page.search_fields + [
        index.SearchField('body'),
        index.SearchField('what_it_does'),
        index.SearchField('what_user_can_do'),
        index.SearchField('when_to_use_it'),
        index.SearchField('fka'),
        index.SearchField('types'),
        index.SearchField('modifiers'),
    ]

class BlogLandingPage(PageBase):
    menu_order = models.IntegerField(default=0)

    description = models.CharField(max_length=255)

    promote_panels = Page.promote_panels + [
        FieldPanel('menu_order', classname="full"),
    ]

    content_panels = Page.content_panels + [
        FieldPanel('description')
    ]

    api_fields = [
        APIField('description')
    ]

    def content(self):
        return ""

    search_fields = Page.search_fields + [
        index.SearchField('content'),
    ]

class BlogPostPage(PageBase):
    author = models.CharField(
        verbose_name="Author",
        max_length=255,
        blank=True,
    )

    content = StreamField([
        ('markdown', APIMarkDownBlock()),
        ('richText', APIRichTextBlock()),
        ('table', TableBlock())
    ], null=True, blank=True)

    content_panels = Page.content_panels + [
        FieldPanel('author'),
        StreamFieldPanel('content')
    ]

    search_fields = Page.search_fields + [
        index.SearchField('content'),
    ]

    api_fields = [
        APIField('author'),
        APIField('content')
    ]
