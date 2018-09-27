from rest_framework import serializers
from .models import Feedback

class FeedbackSerializer(serializers.Serializer):
    thumbs_up = serializers.IntegerField()
    thumbs_down = serializers.IntegerField()

    def create(self, validated_data):
        return Feedback.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.thumbs_up = validated_data.get('thumbs_up', instance.thumbs_up)
        instance.thumbs_down = validated_data.get('thumbs_down', instance.thumbs_down)
        instance.save()
        return instance
