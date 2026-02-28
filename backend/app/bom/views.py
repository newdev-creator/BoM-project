
from rest_framework.decorators import api_view
from rest_framework.response import Response

from app.bom.models import Component
from app.bom.serializers import ComponentSerializer


@api_view(['GET'])
def component_list(request):
    components = Component.objects.all()
    serializer = ComponentSerializer(components, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def component_detail(request, pk):
    component = Component.objects.get(pk=pk)
    serializer = ComponentSerializer(component)
    return Response(serializer.data)
