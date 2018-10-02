from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns

from feedback import views

urlpatterns = [
    url(r'^thumbs/$', views.FeedbackThumbs.as_view()),
    url(r'^thumbs/(?P<pk>[0-9]+)/$', views.UpdataFeedbackThumbs.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns, allowed=['json', 'html'])
