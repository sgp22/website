from django.conf.urls import re_path
from django.urls import path

from . import views

urlpatterns = [
    path('<name>/', views.ActiveVersionsForLibrary.as_view()),
    path('', views.AllActiveLibraries.as_view())
]
