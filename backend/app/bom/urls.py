from django.urls import path

from . import views

urlpatterns = [
    path("components/", views.component_list, name="component-list"),
    path("components/<int:pk>/", views.component_detail, name="component-detail"),
    path("chat/", views.ask_ia, name="chat"),
]
