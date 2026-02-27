from rest_framework import serializers
from .models import Component, Relationship


class SnippetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Component
        fields = "__all__"
