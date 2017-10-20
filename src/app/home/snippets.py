from __future__ import absolute_import, unicode_literals

from django.db import models

from wagtail.wagtailsnippets.models import register_snippet
from wagtail.wagtailadmin.edit_handlers import (
    PageChooserPanel
)

from modelcluster.models import ClusterableModel
from modelcluster.fields import ParentalKey

from taggit.models import TaggedItemBase
from taggit.managers import TaggableManager

class DescriptorTag(TaggedItemBase):
    content_object = ParentalKey('ElementDescriptor', related_name="tagged_descriptors")

@register_snippet
class ElementDescriptor(ClusterableModel):
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
class WhatItDoes(models.Model):
    """There can be many ElementDescriptors
    related to many pages."""
    name = models.CharField(max_length=255)
    description = models.TextField()

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "What it does"
        ordering = ['name']

@register_snippet
class WhatUserCanDo(models.Model):
    """There can be many ElementDescriptors
    related to many pages."""
    name = models.CharField(max_length=255)
    description = models.TextField()

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "What user can do"
        ordering = ['name']

@register_snippet
class WhenToUseIt(models.Model):
    """There can be many ElementDescriptors
    related to many pages."""
    name = models.CharField(max_length=255)
    description = models.TextField()

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "When to use it"
        ordering = ['name']

@register_snippet
class Cornerstone(models.Model):
    """There can be many cornerstones
    related to many pages."""
    name = models.CharField(max_length=255)
    description = models.TextField()

    def __str__(self):
        return self.name
