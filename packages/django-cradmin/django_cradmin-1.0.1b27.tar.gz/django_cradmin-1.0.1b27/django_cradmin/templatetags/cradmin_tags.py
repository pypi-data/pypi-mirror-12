from __future__ import unicode_literals

import json

from django import template
from django.conf import settings
from django.contrib.staticfiles.templatetags.staticfiles import static

from django_cradmin import crapp
from django_cradmin.crinstance import reverse_cradmin_url
from django_cradmin.registry import cradmin_instance_registry

register = template.Library()


@register.simple_tag(takes_context=True)
def cradmin_titletext_for_role(context, role):
    """
    Template tag implementation of
    :meth:`django_cradmin.crinstance.BaseCrAdminInstance.get_titletext_for_role`.
    """
    request = context['request']
    cradmin_instance = cradmin_instance_registry.get_current_instance(request)
    return cradmin_instance.get_titletext_for_role(role)


@register.assignment_tag(takes_context=True)
def cradmin_descriptionhtml_for_role(context, role):
    """
    Template tag implementation of
    :meth:`django_cradmin.crinstance.BaseCrAdminInstance.get_titletext_for_role`.
    """
    request = context['request']
    cradmin_instance = cradmin_instance_registry.get_current_instance(request)
    return cradmin_instance.get_descriptionhtml_for_role(role)


@register.simple_tag(takes_context=True)
def cradmin_rolefrontpage_url(context, role):
    """
    Template tag implementation of
    :meth:`django_cradmin.crinstance.BaseCrAdminInstance.rolefrontpage_url`.
    """
    request = context['request']
    cradmin_instance = cradmin_instance_registry.get_current_instance(request)
    return cradmin_instance.rolefrontpage_url(cradmin_instance.get_roleid(role))


@register.simple_tag(takes_context=True)
def cradmin_appurl(context, viewname, *args, **kwargs):
    """
    Template tag implementation of :meth:`django_cradmin.crapp.App.reverse_appurl`.
    """
    request = context['request']
    return request.cradmin_app.reverse_appurl(viewname, args=args, kwargs=kwargs)


@register.simple_tag(takes_context=True)
def cradmin_instance_url(context, appname, viewname, *args, **kwargs):
    """
    Template tag implementation of :meth:`django_cradmin.crinstance.BaseCrAdminInstance.reverse_url`.
    """
    request = context['request']
    return request.cradmin_instance.reverse_url(
        appname=appname, viewname=viewname, args=args, kwargs=kwargs)


@register.simple_tag(takes_context=True)
def cradmin_instanceindex_url(context, appname):
    """
    Template tag implementation of :meth:`django_cradmin.crinstance.BaseCrAdminInstance.appindex_url`.
    """
    request = context['request']
    return request.cradmin_instance.reverse_url(
        appname=appname, viewname=crapp.INDEXVIEW_NAME)


@register.simple_tag(takes_context=True)
def cradmin_url(context, instanceid, appname, roleid, viewname, *args, **kwargs):
    """
    Template tag implementation of :meth:`django_cradmin.crinstance.reverse_cradmin_url`.
    """
    return reverse_cradmin_url(
        instanceid=instanceid,
        appname=appname,
        roleid=roleid,
        viewname=viewname, args=args, kwargs=kwargs)


@register.simple_tag(takes_context=True)
def cradmin_render_menu(context):
    """
    Template tag that renders the cradmin menu.

    We use this instead of an include tag to handle some issues
    with mocking tests.
    """
    request = context['request']
    if hasattr(request, 'cradmin_instance'):
        return request.cradmin_instance.get_menu().render(context)
    return ''


@register.filter
def cradmin_jsonencode(json_serializable_pythonobject):
    """
    Template filter that converts a json serializable object
    to a json encoded string.
    """
    return json.dumps(json_serializable_pythonobject)


@register.simple_tag(takes_context=True)
def cradmin_theme_staticpath(context):
    """
    """
    if 'request' in context:
        request = context['request']
        theme_path = None
        if hasattr(request, 'cradmin_instance'):
            theme_path = request.cradmin_instance.get_cradmin_theme_path()
            if theme_path:
                theme_path = str(theme_path)
        if not theme_path:
            theme_path = getattr(settings,
                                 'DJANGO_CRADMIN_THEME_PATH',
                                 'django_cradmin/dist/css/cradmin_theme_default/theme.css')
        return static(theme_path)
    else:
        return ''
