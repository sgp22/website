from django.conf.urls import url

from feedback import views

urlpatterns = [
    url(r'^thumbs/.*/$', views.FeedbackThumbs.as_view()),
    url(r'^thumbs/.*/(?P<pk>[0-9]+)/$', views.UpdataFeedbackThumbs.as_view()),
]
