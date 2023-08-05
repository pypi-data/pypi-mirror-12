# -*- coding: utf-8 -*-

from django import forms
from django.conf import settings
from django.contrib import admin
from django.forms.models import modelformset_factory
from django.utils.translation import ugettext as _
from mptt.admin import MPTTModelAdmin

from .models import (AttributeOption, AttributeOptionTranslation, Category,
                     CategoryTranslation, Client, ClientTranslation, Project,
                     ProjectAttribute, ProjectFile, ProjectTranslation, Service,
                     ServiceTranslation)


class CategoryTranslation_Inline(admin.StackedInline):
    model = CategoryTranslation
    max_num = len(settings.LANGUAGES)
    prepopulated_fields = {"slug": ("title",)}


class CategoryAdmin(MPTTModelAdmin):
    list_display = ['__unicode__', 'ordering', 'active', ]
    list_filter = ('active',)
    inlines = [CategoryTranslation_Inline, ]
    mptt_indent_field = '__unicode__'


class ServiceTranslation_Inline(admin.StackedInline):
    model = ServiceTranslation
    max_num = len(settings.LANGUAGES)
    prepopulated_fields = {"slug": ("title",)}


class ServiceAdmin(admin.ModelAdmin):
    list_display = ['__unicode__', 'ordering', 'active', ]
    list_filter = ('active',)
    inlines = [ServiceTranslation_Inline, ]


class ClientTranslation_Inline(admin.StackedInline):
    model = ClientTranslation
    max_num = len(settings.LANGUAGES)
    prepopulated_fields = {"slug": ("title",)}


class ClientAdmin(admin.ModelAdmin):
    list_display = ['__unicode__', 'ordering', 'active', ]
    list_filter = ('active',)
    inlines = [ClientTranslation_Inline, ]


class AttributeOptionTranslation_Inline(admin.StackedInline):
    model = AttributeOptionTranslation
    max_num = len(settings.LANGUAGES)


class AttributeOptionAdmin(admin.ModelAdmin):
    list_display = ['__unicode__', 'ordering', ]
    inlines = [AttributeOptionTranslation_Inline, ]


class ProjectTranslation_Inline(admin.StackedInline):
    model = ProjectTranslation
    max_num = len(settings.LANGUAGES)
    prepopulated_fields = {"slug": ("title",)}


class ProjectAttribute_Inline(admin.StackedInline):
    model = ProjectAttribute


class ProjectFile_Inline(admin.TabularInline):
    model = ProjectFile


class ProjectAdmin(admin.ModelAdmin):
    #    prepopulated_fields = {"uri": ("title",)}
    list_display = ('__unicode__', 'featured', 'active', 'created', )
    list_filter = ('active', 'featured', 'categories', 'services', )
    filter_horizontal = ('services', 'categories',)
    inlines = [ProjectTranslation_Inline, ProjectAttribute_Inline, ]

admin.site.register(Project, ProjectAdmin)
admin.site.register(Service, ServiceAdmin)
admin.site.register(AttributeOption, AttributeOptionAdmin)
admin.site.register(Category, CategoryAdmin)
admin.site.register(Client, ClientAdmin)
