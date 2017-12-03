from django.conf import settings

from rest_framework.views import APIView

from . import (
    local,
    aws
)


class GetCreateDocs(APIView):
    """Upload file on the S3 storage."""
    def post(self, request, **kwargs):
        """Accept file uploads to AWS and local filesystem."""
        if settings.S3_STORAGE:
            return aws.post(request)
        else:
            return local.post(request)


    def get(self, request, **kwargs):
        """List doc files from S3 or local file system."""
        if settings.S3_STORAGE:
            return aws.get(request)
        else:
            return local.get(request)
