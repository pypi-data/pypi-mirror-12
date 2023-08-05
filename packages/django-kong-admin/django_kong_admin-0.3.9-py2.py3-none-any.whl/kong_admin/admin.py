# -*- coding: utf-8 -*-
from __future__ import unicode_literals, print_function
from contextlib import closing

from django.utils.translation import ugettext_lazy as _
from django.contrib import admin, messages
from django.contrib.admin.views.decorators import staff_member_required
from django.http.response import HttpResponseRedirect
from jsonfield2.fields import JSONField

from .models import APIReference, PluginConfigurationReference, ConsumerReference, \
    BasicAuthReference, KeyAuthReference, OAuth2Reference
from .factory import get_kong_client
from .logic import synchronize_apis, synchronize_api, synchronize_plugin_configurations, \
    synchronize_plugin_configuration, synchronize_consumers, synchronize_consumer
from .contrib import CustomModelAdmin
from .widgets import JSONWidget


@staff_member_required
def synchronize_api_references(request, queryset=None):
    try:
        with closing(get_kong_client()) as client:
            queryset = synchronize_apis(client, queryset=queryset)
    except Exception as e:
        messages.add_message(
            request, messages.ERROR, 'Could not synchronize API References: %s' % str(e))
    else:
        messages.add_message(
            request, messages.SUCCESS, 'Successfully synchronized %d API References (it can take a while before the '
                                       'changes are visible!)' % queryset.count())
    return HttpResponseRedirect(request.META["HTTP_REFERER"])


@staff_member_required
def synchronize_api_reference(request, pk, toggle_enable=False):
    obj = APIReference.objects.get(id=pk)

    try:
        with closing(get_kong_client()) as client:
            synchronize_api(client, obj, toggle=toggle_enable)
    except Exception as e:
        messages.add_message(
            request, messages.ERROR, 'Could not sync API Reference: %s (was it published?)' % str(e))
    else:
        messages.add_message(
            request, messages.SUCCESS, 'Successfully synced API Reference (it can take a while before the '
                                       'changes are visible!)')

    return HttpResponseRedirect(request.META["HTTP_REFERER"])


@staff_member_required
def synchronize_plugin_configuration_references(request, queryset=None):
    try:
        with closing(get_kong_client()) as client:
            queryset = synchronize_plugin_configurations(client, queryset=queryset)
    except Exception as e:
        messages.add_message(
            request, messages.ERROR, 'Could not synchronize Plugin Configuration References: %s' % str(e))
    else:
        messages.add_message(
            request, messages.SUCCESS, 'Successfully synchronized %d Plugin Configuration References (it can take a '
                                       'while before the changes are visible!)' % queryset.count())

    return HttpResponseRedirect(request.META["HTTP_REFERER"])


@staff_member_required
def synchronize_plugin_configuration_reference(request, pk, toggle_enable=False):

    obj = PluginConfigurationReference.objects.get(id=pk)

    try:
        with closing(get_kong_client()) as client:
            obj = synchronize_plugin_configuration(client, obj, toggle=toggle_enable)
    except Exception as e:
        messages.add_message(
            request, messages.ERROR, 'Could not publish Plugin Configuration Reference: %s' % str(e))
    else:
        messages.add_message(
            request, messages.SUCCESS, 'Successfully published Plugin Configuration Reference (it can take a while '
                                       'before the changes are visible!)')

    return HttpResponseRedirect(request.META["HTTP_REFERER"])


@staff_member_required
def synchronize_consumer_references(request, queryset=None):
    try:
        with closing(get_kong_client()) as client:
            queryset = synchronize_consumers(client, queryset=queryset)
    except Exception as e:
        messages.add_message(
            request, messages.ERROR, 'Could not synchronize Consumer References: %s' % str(e))
    else:
        messages.add_message(
            request, messages.SUCCESS, 'Successfully synchronized %d Consumer References (it can take a while before '
                                       'the changes are visible!)' % queryset.count())

    return HttpResponseRedirect(request.META["HTTP_REFERER"])


@staff_member_required
def synchronize_consumer_reference(request, pk, toggle_enable=False):
    obj = ConsumerReference.objects.get(id=pk)

    try:
        with closing(get_kong_client()) as client:
            obj = synchronize_consumer(client, obj, toggle=toggle_enable)
    except Exception as e:
        messages.add_message(
            request, messages.ERROR, 'Could not sync Consumer Reference: %s (was it published?)' % str(e))
    else:
        messages.add_message(
            request, messages.SUCCESS, 'Successfully synced Consumer Reference (it can take a while before the '
                                       'changes are visible!)')

    return HttpResponseRedirect(request.META["HTTP_REFERER"])


def get_toggle_enable_caption(obj):
    return 'Disable' if obj.enabled else 'Enable'


class PluginConfigurationReferenceInline(admin.StackedInline):
    model = PluginConfigurationReference
    extra = 0
    fields = ('plugin', 'config', 'enabled', 'consumer')
    formfield_overrides = {
        JSONField: {'widget': JSONWidget(mode='json', width='800px', height='180px', theme='twilight')},
    }


class APIReferenceAdmin(CustomModelAdmin):
    list_display = ('upstream_url', 'name', 'request_host', 'preserve_host', 'request_path', 'strip_request_path',
                    'enabled', 'synchronized', 'kong_id')
    list_display_buttons = [{
        'caption': 'Synchronize',
        'url': 'sync-api-ref/',
        'view': synchronize_api_reference
    }, {
        'caption': get_toggle_enable_caption,
        'url': 'toggle-enable/',
        'view': lambda request, pk: synchronize_api_reference(request, pk, toggle_enable=True)
    }]
    action_buttons = [{
        'caption': 'Synchronize all',
        'url': 'sync-api-refs/',
        'view': synchronize_api_references
    }]
    list_select_related = True
    fieldsets = (
        (None, {
            'fields': ('upstream_url', 'name', 'enabled')
        }),
        (_('Host'), {
            'fields': ('request_host', 'preserve_host')
        }),
        (_('Path'), {
            'fields': ('request_path', 'strip_request_path')
        }),
        (_('Audit'), {
            'fields': ('created_at', 'updated_at')
        }),
    )
    inlines = [
        PluginConfigurationReferenceInline
    ]
    readonly_fields = ('created_at', 'updated_at')

admin.site.register(APIReference, APIReferenceAdmin)


class BasicAuthInline(admin.StackedInline):
    model = BasicAuthReference
    extra = 0
    fields = ('username', 'password')


class KeyAuthInline(admin.StackedInline):
    model = KeyAuthReference
    extra = 0
    fields = ('key',)


class OAuthInline(admin.StackedInline):
    model = OAuth2Reference
    extra = 0
    fields = ('name', 'redirect_uri', 'client_id', 'client_secret')


class ConsumerReferenceAdmin(CustomModelAdmin):
    list_display = ('username_or_custom_id', 'enabled', 'synchronized', 'kong_id')
    list_display_buttons = [{
        'caption': 'Synchronize',
        'url': 'sync-consumer-ref/',
        'view': synchronize_consumer_reference
    }, {
        'caption': get_toggle_enable_caption,
        'url': 'toggle-enable/',
        'view': lambda request, pk: synchronize_consumer_reference(request, pk, toggle_enable=True)
    }]
    action_buttons = [{
        'caption': 'Synchronize all',
        'url': 'sync-consumer-refs/',
        'view': synchronize_consumer_references
    }]
    list_select_related = True
    fieldsets = (
        (None, {
            'fields': ('username', 'custom_id', 'enabled')
        }),
        (_('Audit'), {
            'fields': ('created_at', 'updated_at')
        }),
    )
    readonly_fields = ('created_at', 'updated_at')
    inlines = [
        BasicAuthInline,
        KeyAuthInline,
        OAuthInline
    ]

    def username_or_custom_id(self, obj):
        return obj.username or obj.custom_id

admin.site.register(ConsumerReference, ConsumerReferenceAdmin)
