from django.http import JsonResponse
from rest_framework import generics

from .models import Expert, Formation, Reservation, Service, Tarifs
from .serializers import (
    ExpertSerializer,
    FormationSerializer,
    ReservationCreateSerializer,
    ReservationSerializer,
    ServiceSerializer,
    TarifSerializer,
)


def health_check(_request):
    return JsonResponse({"status": "ok", "service": "zoneviii"})


class ServiceListView(generics.ListAPIView):
    serializer_class = ServiceSerializer

    def get_queryset(self):
        return Service.objects.prefetch_related("tarifs").order_by("id")


class TarifListView(generics.ListAPIView):
    serializer_class = TarifSerializer
    queryset = Tarifs.objects.select_related("service").order_by("id")


class ExpertListView(generics.ListAPIView):
    serializer_class = ExpertSerializer
    queryset = Expert.objects.order_by("id")


class FormationListView(generics.ListAPIView):
    serializer_class = FormationSerializer
    queryset = Formation.objects.select_related("expert").order_by("id")


class ReservationListView(generics.ListAPIView):
    serializer_class = ReservationSerializer
    queryset = Reservation.objects.select_related("client", "tarif").order_by("-date", "-heure")


class ReservationCreateView(generics.CreateAPIView):
    serializer_class = ReservationCreateSerializer
    queryset = Reservation.objects.select_related("client", "tarif")
