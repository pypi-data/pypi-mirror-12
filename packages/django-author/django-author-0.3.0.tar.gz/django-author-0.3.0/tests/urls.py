try:
    from django.conf.urls import patterns, include, url
except ImportError: # in Django < 1.6
    from django.conf.urls.defaults import patterns, include, url

# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    url(r'^admin/', include(admin.site.urls)),
    url(r'^registration/login/$', 'django.contrib.auth.views.login',
        name='login'),
    url(r'^registration/logout/$', 'django.contrib.auth.views.logout',
        name='logout'),
    url(r'^', include('blog.urls')),
)
