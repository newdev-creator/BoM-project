from django.contrib import admin

from .models import Component, Relationship


class ChildRelationshipInline(admin.TabularInline):
    model = Relationship
    fk_name = "parent"
    extra = 0  # Don't show extra empty forms
    fields = ("child", "quantity")
    readonly_fields = (
        "child",
    )  # Make child field read-only to prevent accidental changes


class ParentRelationshipInline(admin.TabularInline):
    model = Relationship
    fk_name = "child"
    extra = 0
    fields = ("parent", "quantity")
    readonly_fields = ("parent",)  # Make parent field read-only


@admin.register(Component)
class ComponentAdmin(admin.ModelAdmin):
    list_per_page = 25
    list_display = ("reference", "description", "quantity", "component_type")
    list_filter = ("component_type",)
    inlines = [ChildRelationshipInline, ParentRelationshipInline]


@admin.register(Relationship)
class RelationshipAdmin(admin.ModelAdmin):
    list_per_page = 25
    list_display = (
        "parent",
        "child",
        "quantity",
    )
