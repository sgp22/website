from rest_framework import serializers
from .models import Feedback

class FeedbackSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    page_slug = serializers.CharField(required=True, allow_blank=True, max_length=100)
    thumbs_up = serializers.IntegerField()
    thumbs_down = serializers.IntegerField()

    def create(self, validated_data):
        return Feedback.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.page_slug = validated_data.get('page_slug', instance.page_slug)
        instance.thumbs_up = validated_data.get('thumbs_up', instance.thumbs_up)
        instance.thumbs_down = validated_data.get('thumbs_down', instance.thumbs_down)
        instance.save()
        return instance
