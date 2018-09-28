from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import Http404
from .models import Feedback
from .serializers import FeedbackSerializer

class FeedbackThumbs(APIView):
    def get(self, request, **kwargs):
        feedback = Feedback.objects.all()
        serializer = FeedbackSerializer(feedback, many=True)
        return Response(serializer.data)

    def post(self, request, **kwargs):
        serializer = FeedbackSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UpdataFeedbackThumbs(APIView):
    def get_object(self, pk):
        try:
            return Feedback.objects.get(pk=pk)
        except Feedback.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        feedback = self.get_object(pk)
        serializer = FeedbackSerializer(feedback)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        feedback = self.get_object(pk)
        serializer = FeedbackSerializer(feedback, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
