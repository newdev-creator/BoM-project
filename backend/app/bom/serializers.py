from rest_framework import serializers
from .models import Component, Relationship


class ComponentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Component
        fields = "__all__"
