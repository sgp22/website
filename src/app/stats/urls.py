from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns

from stats import views

urlpatterns = [
    url(r'^thumbs/$', views.FeedbackThumbs.as_view())
]
