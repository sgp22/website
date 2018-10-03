from rest_framework import serializers
from .models import Thumbs

class ThumbsSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    relative_url = serializers.CharField(required=True, allow_blank=True, max_length=100)
    thumb_type = serializers.CharField(required=True, allow_blank=True, max_length=100)

    def create(self, validated_data):
        return Thumbs.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.relative_url = validated_data.get('relative_url', instance.relative_url)
        instance.thumb_type = validated_data.get('thumb_type', instance.thumb_type)
        instance.save()
        return instance
