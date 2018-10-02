from rest_framework import serializers
from .models import Feedback

class FeedbackSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    relative_url = serializers.CharField(required=True, allow_blank=True, max_length=100)
    thumbs_up = serializers.IntegerField()
    thumbs_down = serializers.IntegerField()

    def create(self, validated_data):
        return Feedback.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.relative_url = validated_data.get('relative_url', instance.relative_url)
        instance.thumbs_up = validated_data.get('thumbs_up', instance.thumbs_up)
        instance.thumbs_down = validated_data.get('thumbs_down', instance.thumbs_down)
        instance.save()
        return instance
