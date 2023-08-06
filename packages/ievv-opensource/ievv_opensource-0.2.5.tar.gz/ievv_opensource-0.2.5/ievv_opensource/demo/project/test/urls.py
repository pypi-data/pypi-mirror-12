from django.conf.urls import patterns, include, url

from django_cradmin.demo.usermanagerdemo.cradmin import UsermanagerCrAdminInstance
from django_cradmin.demo.webdemo.cradmin import WebdemoCrAdminInstance

urlpatterns = patterns(
    '',
    url(r'^cradmin_authenticate/', include('django_cradmin.apps.cradmin_authenticate.urls')),
    url(r'^cradmin_temporaryfileuploadstore/', include('django_cradmin.apps.cradmin_temporaryfileuploadstore.urls')),
    url(r'^cradmin_resetpassword/', include('django_cradmin.apps.cradmin_resetpassword.urls')),
    url(r'^cradmin_activate_account/', include('django_cradmin.apps.cradmin_activate_account.urls')),
    url(r'^cradmin_register_account/', include('django_cradmin.apps.cradmin_register_account.urls')),

    # Demo apps
    url(r'^webdemoadmin/', include(WebdemoCrAdminInstance.urls())),
    url(r'^webdemo/', include('django_cradmin.demo.webdemo.urls')),
    url(r'^usermanagerdemo/', include(UsermanagerCrAdminInstance.urls())),

)
