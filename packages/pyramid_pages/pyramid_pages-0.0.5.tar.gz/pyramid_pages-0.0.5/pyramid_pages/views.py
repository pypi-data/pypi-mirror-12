#! /usr/bin/env python
# -*- coding: utf-8 -*-
# vim:fenc=utf-8
#
# Copyright © 2014 uralbash <root@uralbash.ru>
#
# Distributed under terms of the MIT license.

"""
Views for pages
"""
from pyramid.response import Response
from pyramid.renderers import render_to_response
from pyramid.httpexceptions import HTTPNotFound

from . import CONFIG_MODELS


class PageView(object):

    def __init__(self, context, request):
        self.request = request
        self.context = context
        self.page = context.node

        if not getattr(self.page, 'visible', False):
            raise HTTPNotFound

    def page_with_redirect(self):

        if all([hasattr(self.page, attr)
                for attr in ('redirect', 'redirect_url', 'redirect_page')]):
            # Prohibit redirect both url and page
            if self.page.redirect_url and self.page.redirect_page:
                raise HTTPNotFound

            # check redirect type
            if not self.page.redirect_type and self.page.redirect_url:
                redirect_type = '302'
            elif not self.page.redirect_type and self.page.redirect_page:
                redirect_type = '200'
            else:
                redirect_type = str(self.page.redirect_type)

            # Prohibit redirect itself
            if self.page.redirect == self.page and redirect_type != '200':
                raise HTTPNotFound

            # Redirect to Page
            if self.page.redirect_page:
                if not self.page.redirect.visible:
                    raise HTTPNotFound
                if redirect_type == '200':
                    self.page = self.page.redirect
                    return render_to_response(
                        getattr(self.page,
                                'pyramid_pages_template',
                                self.context.template),
                        {'page': self.page},
                        request=self.request
                    )
                else:
                    from .resources import (
                        resource_of_node,
                        resources_of_config
                    )
                    redirect = self.page.redirect
                    pages_config = self.request.registry\
                        .settings[CONFIG_MODELS]
                    resources = resources_of_config(pages_config)
                    resource = resource_of_node(resources, redirect)(redirect)
                    redirect_resource_url = self.request.resource_url(resource)
                    return Response(status_code=int(redirect_type),
                                    location=redirect_resource_url)
            # Redirect to URL
            if self.page.redirect_url:
                if redirect_type == '200':
                    raise HTTPNotFound
                return Response(status_code=int(redirect_type),
                                location=self.page.redirect_url)
        return {'page': self.page}
