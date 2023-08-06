from django.conf.urls import patterns, url

from .views import (DocumentationRecordListView, DocumentationRecordDetailView,
    MaintenanceRecordDetailView, MaintenanceRecordListView,
    system_maintenance_home_view)


urlpatterns = patterns('',
    url(r'^$', system_maintenance_home_view, name='system_maintenance_home_view'),
    url(r'^authentication/$', 'django.contrib.auth.views.login', {'template_name': 'system_maintenance/authentication.html'}, name='authentication'),
    url(r'^documentation/$', DocumentationRecordListView.as_view(), name='documentation_record_list'),
    url(r'^documentation/(?P<pk>\d+)/$', DocumentationRecordDetailView.as_view(), name='documentation_record_detail'),
    url(r'^logout/$', 'django.contrib.auth.views.logout', {'next_page': '/system_maintenance/'}, name='logout'),
    url(r'^records/$', MaintenanceRecordListView.as_view(), name='maintenance_record_list'),
    url(r'^records/(?P<pk>\d+)/$', MaintenanceRecordDetailView.as_view(), name='maintenance_record_detail'),
)
