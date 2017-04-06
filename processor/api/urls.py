from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from . import views

urlpatterns = [
    url(r'^error404$', views.handle404, name="error404"),
    url(r'^(?P<setid>[0-9]+)/(?P<mode>[0-9]+)$', views.MapSetAPI.as_view(), name="index"),
    url(r'^(?P<setid>[0-9]+)/(?P<mode>[0-9]+)/(?P<update>[0-9]+)$', views.MapSetAPI.as_view(), name="index"),
]

urlpatterns = format_suffix_patterns(urlpatterns)
