from __future__ import absolute_import, unicode_literals

from django.db import models

from wagtail.wagtailsnippets.edit_handlers import SnippetChooserPanel
from wagtail.wagtailcore.models import Orderable

from modelcluster.fields import ParentalKey


class ElementsPageElementDescriptorsRelationship(Orderable, models.Model):
    """
    An index of references between Pages and ElementDescriptors.
    """
    elements_page = ParentalKey(
        'ElementsPage',
        related_name='elements_page_element_descriptors_relationship'
    )

    element_descriptor = models.ForeignKey(
        'ElementDescriptor',
        related_name="+"
    )

    panels = [
        SnippetChooserPanel('element_descriptor')
    ]


class CoreContentPageCornerstoneRelationship(Orderable, models.Model):
    """
    An index of references between CoreContentPage and Cornerstone.
    """
    core_content_page = ParentalKey(
        'CoreContentPage',
        related_name='core_content_page_cornerstone_relationship'
    )

    cornerstone = models.ForeignKey(
        'Cornerstone',
        related_name="+"
    )

    panels = [
        SnippetChooserPanel('cornerstone')
    ]


class LandingPageCornerstoneRelationship(Orderable, models.Model):
    """
    An index of references between LandingPage and Cornerstone.
    """
    landing_page = ParentalKey(
        'LandingPage',
        related_name='landing_page_cornerstone_relationship'
    )

    cornerstone = models.ForeignKey(
        'Cornerstone',
        related_name="+"
    )

    panels = [
        SnippetChooserPanel('cornerstone')
    ]
