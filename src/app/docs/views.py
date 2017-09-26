import json
import os
import re
import zipfile

from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from django.conf import settings
from django.http import HttpResponse

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from boto.s3.connection import S3Connection
from boto.s3.key import Key

import markdown


class GetCreateDocs(APIView):
    """Upload file on the S3 storage."""
    def post(self, request, **kwargs):
        root_path = request.POST.get('root_path', '')
        file = request.FILES.get('file')
        if file and file.name.endswith('.zip'):
            z = zipfile.ZipFile(file)
            for zipped_file in z.namelist():
                path = os.path.join(*('docs', root_path, zipped_file))
                content = ContentFile(z.read(zipped_file))
                default_storage.save(path, content)
        else:
            return Response({'file': 'ZIP file not found'},
                            status=status.HTTP_400_BAD_REQUEST)

        return Response()

    def get(self, request, **kwargs):
        # Set connection to s3
        conn = S3Connection(settings.AWS_ACCESS_KEY_ID,
                            settings.AWS_SECRET_ACCESS_KEY)
        bucket = conn.get_bucket(settings.AWS_STORAGE_BUCKET_NAME)
        # check if file or folder
        path = request.path_info[5:]
        if re.match(r'[/\-\w,\s]+.[A-Za-z]{2,4}$', path):
            key = Key(bucket=bucket, name=path)
            content = key.get_contents_as_string()
            if path.lower().endswith('.json'):
                try:
                    content = json.loads(content.decode('utf-8'))
                    return Response(content)
                except ValueError:
                    return Response({'error': 'JSON file cannot be decoded'},
                                    status=status.HTTP_400_BAD_REQUEST)
            elif path.lower().endswith('.md'):
                content = markdown.markdown(content.decode("utf-8"),
                                            output_format="html5")
                return HttpResponse(content=content)
            else:
                return HttpResponse(content=content)
        else:
            result = []
            if not path.endswith('/'):
                path += '/'
            for item in bucket.list(path, '/'):
                result.append(item.name)
            return Response({'files': result})
