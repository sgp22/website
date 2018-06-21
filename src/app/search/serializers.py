from rest_framework import serializers


class SearchPageSerializer(serializers.Serializer):
    title =  serializers.CharField()
    _score =  serializers.FloatField()

class SearchImageSerializer(serializers.Serializer):
    title =  serializers.CharField()
    _score =  serializers.FloatField()