from rest_framework.views import APIView
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response

import semver

from home.snippets import LibraryVersion

def get_active_versions_for_lib(name):
    versions_qs = LibraryVersion.objects.all().filter(
        name = name,
        isActive = True
    )
    versions_list = [v.version for v in versions_qs]
    return semver.rsort(versions_list, True)

class ActiveVersionsForLibrary(APIView):
    def get(self, request, **kwargs):
        versions = get_active_versions_for_lib(kwargs['name'])
        return Response(versions)

class AllActiveLibraries(APIView):
    def get(self, request, **kwargs):
        unqiue_lib_qs = LibraryVersion.objects.distinct('name').filter(
            isActive = True
        ).order_by('name').values_list('name', flat=True)

        all_libs = []

        for lib in unqiue_lib_qs:
            sorted_versions = get_active_versions_for_lib(lib)
            if (sorted_versions):
                all_libs.append({
                    'name': lib,
                    'latest': sorted_versions[0]
                })
        return Response(all_libs)

