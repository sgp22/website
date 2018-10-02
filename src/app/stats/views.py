from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import Http404
from .models import Thumbs
from .serializers import ThumbsSerializer
import collections

class FeedbackThumbs(APIView):
    def get(self, request, format=None):
        thumbs = Thumbs.objects.filter(relative_url = request.GET.get('relative_url'))
        serializer = ThumbsSerializer(thumbs, many=True)

        thumbs_up = sum(t["thumb_type"] == "thumbs_up" for t in serializer.data)
        thumbs_down = sum(t["thumb_type"] == "thumbs_down" for t in serializer.data)

        response = {}
        response["relative_url"] = request.GET.get('relative_url')
        response["thumbs_up"] = thumbs_up
        response["thumbs_down"] = thumbs_down
        response["total"] = thumbs_up + thumbs_down

        print(response)

        return Response(response)

    def post(self, request, format=None):
        serializer = FeedbackSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
