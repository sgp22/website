from django.conf.urls import url

from feedback import views

urlpatterns = [
    url(r'^thumbs-up/$', views.FeedbackThumbs.as_view()),
    url(r'^thumbs-down/$', views.FeedbackThumbs.as_view()),
]
