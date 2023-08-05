# -*- coding: utf-8 -*-
from __future__ import unicode_literals, print_function
from django.conf.urls import include, url
from django.contrib import admin


urlpatterns = [
    url(r'^admin/', include(admin.site.urls)),

    #Debug
    url(r'^kongconfig/', 'kong_admin.views.show_config')
]
