import logging

from django.conf import settings
from django.core.cache import cache
from django.core.mail import send_mail
from django.http import JsonResponse
from django.template.defaultfilters import date as date_filter
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.throttling import AnonRateThrottle

from .models import ContactMessage, Expert, Formation, Realisation, Reservation, Service, Tarifs
from .serializers import (
    ContactMessageSerializer,
    ExpertSerializer,
    FormationSerializer,
    ReservationCreateSerializer,
    ReservationSerializer,
    ServiceSerializer,
    TarifSerializer,
    RealisationSerializer,
)

logger = logging.getLogger(__name__)


class ContactAnonThrottle(AnonRateThrottle):
    scope = "contact"


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


class ContactMessageCreateView(generics.CreateAPIView):
    serializer_class = ContactMessageSerializer
    queryset = ContactMessage.objects.all()
    throttle_classes = [ContactAnonThrottle]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        email = serializer.validated_data["email"].lower()
        client_ip = self._get_client_ip(request)
        spam_cache_key = f"contact-submit:{client_ip}:{email}"

        if cache.get(spam_cache_key):
            logger.warning("Contact form throttled for ip=%s email=%s", client_ip, email)
            return Response(
                {
                    "status": "error",
                    "message": "Merci de patienter avant de renvoyer un message.",
                    "detail": "Merci de patienter avant de renvoyer un message.",
                },
                status=status.HTTP_429_TOO_MANY_REQUESTS,
            )

        message = serializer.save()
        cache.set(spam_cache_key, True, timeout=60)

        try:
            self._send_contact_email(message)
        except Exception:
            logger.exception("Contact email failed for message_id=%s", message.id)
            return Response(
                {
                    "status": "warning",
                    "message": "Votre message a bien ete enregistre. L'email n'a pas pu etre envoye automatiquement.",
                    "warning": "email_delivery_failed",
                    "id": message.id,
                },
                status=status.HTTP_201_CREATED,
            )

        logger.info("Contact email sent for message_id=%s email=%s", message.id, message.email)
        return Response(
            {
                "status": "success",
                "message": "Votre message a bien ete envoye.",
                "id": message.id,
            },
            status=status.HTTP_201_CREATED,
        )

    def _send_contact_email(self, message):
        created_at = date_filter(message.created_at, "Y-m-d H:i:s T")
        subject = "Nouveau message depuis le site ZoneVIII"
        body = "\n".join(
            [
                "Nouveau message depuis le formulaire ZoneVIII",
                "",
                f"Date: {created_at}",
                f"Nom: {message.prenom} {message.nom}",
                f"Email: {message.email}",
                f"Telephone: {message.telephone}",
                f"Sujet: {message.sujet}",
                "",
                "Message:",
                message.message,
            ]
        )

        send_mail(
            subject=subject,
            message=body,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[settings.CONTACT_EMAIL_TO],
            fail_silently=False,
        )

    def _get_client_ip(self, request):
        forwarded_for = request.META.get("HTTP_X_FORWARDED_FOR")

        if forwarded_for:
            return forwarded_for.split(",")[0].strip()

        return request.META.get("REMOTE_ADDR", "unknown")

class RealisationListView(generics.ListAPIView):
    serializer_class = RealisationSerializer

    def get_queryset(self):
        queryset = (
            Realisation.objects
            .filter(est_publiee=True)
            .select_related("expert")
            .prefetch_related("services")
            .order_by("-created_at")
        )

        categorie = self.request.query_params.get("categorie")
        service = self.request.query_params.get("service")

        if categorie:
            queryset = queryset.filter(categorie__iexact=categorie)

        if service:
            queryset = queryset.filter(services__nomService__icontains=service)

        return queryset.distinct()

    def get_serializer_context(self):
        return {"request": self.request}
