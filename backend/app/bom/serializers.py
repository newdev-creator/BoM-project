from rest_framework import serializers

from .models import Component, Relationship


class RelationshipSerializer(serializers.ModelSerializer):
    child_reference = serializers.CharField(source="child.reference", read_only=True)
    child_description = serializers.CharField(
        source="child.description", read_only=True
    )
    child_component_type = serializers.CharField(
        source="child.component_type", read_only=True
    )

    class Meta:
        model = Relationship
        fields = (
            "id",
            "child",
            "child_reference",
            "child_description",
            "child_component_type",
            "quantity",
            "created_at",
            "updated_at",
        )


class ComponentSerializer(serializers.ModelSerializer):
    child = RelationshipSerializer(source="child_components", many=True, read_only=True)

    class Meta:
        model = Component
        fields = (
            "id",
            "reference",
            "description",
            "quantity",
            "component_type",
            "child",
            "created_at",
            "updated_at",
        )
