from rest_framework import serializers
from home.snippets import LibraryVersion

class LibraryVersionSerializer(serializers.ModelSerializer):
    class Meta:
        model = LibraryVersion
        fields = ('name', 'version', 'isActive')
