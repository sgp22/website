from django.conf import settings
from rest_framework.views import APIView
from .models import Feedback

class FeedbackThumbsUp(APIView):
    def post(self, request, **kwargs):
        return self.create(request, *args, **kwargs)

    def get(self, request, **kwargs):
        return self.list(request, *args, **kwargs)


class FeedbackThumbsDown(APIView):
    def post(self, request, **kwargs):
        return self.create(request, *args, **kwargs)

    def get(self, request, **kwargs):
        return self.list(request, *args, **kwargs)

