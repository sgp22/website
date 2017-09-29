from __future__ import absolute_import, unicode_literals

from rest_framework import serializers

from home.snippets import (
    ElementDescriptor,
    Cornerstone
)


class ElementDescriptorSerializer(serializers.ModelSerializer):
    """Default ElementDescriptior snippet serializer."""
    class Meta:
        model = ElementDescriptor
        fields = ('id', 'name', 'descriptor_type', 'description')


class CornerstoneSerializer(serializers.ModelSerializer):
    """Default Cornerstone snippet serializer."""
    class Meta:
        model = Cornerstone
        fields = ('id', 'name', 'description')
