import json

from rest_framework.decorators import api_view
from rest_framework.response import Response

from app.bom.models import Component
from app.bom.serializers import ComponentSerializer
from settings import settings


@api_view(["GET"])
def component_list(request):
    components = Component.objects.all()
    serializer = ComponentSerializer(components, many=True)
    return Response(serializer.data)


@api_view(["GET"])
def component_detail(request, pk):
    component = Component.objects.get(pk=pk)
    serializer = ComponentSerializer(component)
    return Response(serializer.data)


@api_view(["POST"])
def ask_ia(request):
    """AI bot that answers questions"""

    user_message = request.data.get("message", "")
    if not user_message:
        return Response({"error": "No message provided"}, status=400)

    # Build context with all components
    components = Component.objects.prefetch_related("child_components__child").all()
    context = {
        "components": [
            {
                "id": c.id,
                "reference": c.reference,
                "description": c.description,
                "quantity": c.quantity,
                "component_type": c.component_type,
                "children": [
                    {
                        "reference": rel.child.reference,
                        "description": rel.child.description,
                        "quantity": rel.quantity,
                    }
                    for rel in c.child_components.all()
                ],
            }
            for c in components
        ]
    }

    system_prompt = f"""
    You are an expert assistant in industrial bills of materials (BOM) management.
    You must answer ONLY based on the provided BOM data.

    If the information is not in the data, state this clearly.

    Here is the complete BOM in JSON format:

    {json.dumps(context, ensure_ascii=False, indent=2)}

    Answer concisely and precisely. You may use technical vocabulary related to machining and mechanics.
    """

    try:
        from mistralai import Mistral
        from mistralai.models import SDKError

        api_key = settings.MISTRAL_API_KEY

        if api_key is None or api_key == "NoValue":
            raise ValueError("API key is not set or is invalid")

        client = Mistral(api_key=api_key)
        response = client.chat.complete(
            model="mistral-small-latest",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_message},
            ],
        )
        if not response.choices or not hasattr(response.choices[0], "message"):
            answer = "Réponse vide ou invalide de l'API."
        else:
            answer = response.choices[0].message.content

    except SDKError as e:
        if e.status_code == 401:
            answer = "Clé API invalide ou manquante."
        elif e.status_code == 429:
            answer = "Quota API dépassé, réessayez plus tard."
        else:
            answer = f"Erreur API Mistral : {str(e)}"
    except Exception as e:
        answer = f"Erreur inattendue : {str(e)}"

    return Response({"answer": answer})
