# coding: utf-8

from django.conf.urls import url

from . import views
from . import forms


urlpatterns = [
    url(r'^upload-image/(?P<app>\w+)/(?P<model>\w+)/$',
        views.upload_file,
        {'form_class': forms.UploadImageForm},
        name='upload_image',
    ),
    url(r'^upload-file/(?P<app>\w+)/(?P<model>\w+)/$',
        views.upload_file,
        {'form_class': forms.UploadFileForm},
        name='upload_file',
    ),
]
