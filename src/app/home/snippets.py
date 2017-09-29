from __future__ import absolute_import, unicode_literals

from django.db import models

from wagtail.wagtailsnippets.models import register_snippet
from wagtail.wagtailadmin.edit_handlers import (
    PageChooserPanel
)


@register_snippet
class ElementDescriptor(models.Model):
    """There can be many ElementDescriptors
    related to many pages."""
    name = models.CharField(max_length=255)
    descriptor_type = models.SmallIntegerField()
    description = models.TextField()

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Element Descriptors"
        ordering = ['name']


@register_snippet
class Cornerstone(models.Model):
    """There can be many cornerstones
    related to many pages."""
    name = models.CharField(max_length=255)
    description = models.TextField()


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
