from rest_framework import serializers


class SearchPageSerializer(serializers.Serializer):
    title =  serializers.CharField()
    _score =  serializers.FloatField()
    pk =  serializers.IntegerField()

class SearchImageSerializer(serializers.Serializer):
    title =  serializers.CharField()
    _score =  serializers.FloatField()
    pk =  serializers.IntegerField()