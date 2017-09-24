import zipfile

from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from django.conf import settings

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from boto.s3.connection import S3Connection


class CreateDocs(APIView):
    """Upload file on the S3 storage."""
    def post(self, request, **kwargs):
        root_path = request.POST.get('root_path', '')
        file = request.FILES.get('file')
        if file and file.name.endswith('.zip'):
            z = zipfile.ZipFile(file)
            for zipped_file in z.namelist():
                content = ContentFile(z.read(zipped_file))
                default_storage.save(zipped_file, content)
        else:
            return Response({"file": "ZIP file not found"},
                            status=status.HTTP_400_BAD_REQUEST)

        return Response()
