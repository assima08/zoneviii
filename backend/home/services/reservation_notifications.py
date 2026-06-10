import logging

from django.conf import settings
from django.core.mail import send_mail

logger = logging.getLogger(__name__)


def send_reservation_notification_emails(reservation):
    warnings = []

    try:
        _send_internal_email(reservation)
    except Exception:
        logger.exception(
            "Internal reservation email failed for reservation %s",
            reservation.id,
        )
        warnings.append("email_interne")

    if reservation.client.email:
        try:
            _send_client_email(reservation)
        except Exception:
            logger.exception(
                "Client reservation email failed for reservation %s",
                reservation.id,
            )
            warnings.append("email_client")

    return warnings


def _send_internal_email(reservation):
    subject = "Nouvelle reservation ZoneVIII"
    body = "\n".join(
        [
            "Nouvelle demande de reservation ZoneVIII",
            "",
            *_reservation_details(reservation),
            "",
            f"Admin Django: /admin/home/reservation/{reservation.id}/change/",
        ]
    )

    send_mail(
        subject=subject,
        message=body,
        from_email=settings.DEFAULT_FROM_EMAIL,
        recipient_list=[settings.CONTACT_EMAIL_TO],
        fail_silently=False,
    )


def _send_client_email(reservation):
    client = reservation.client
    subject = "Votre demande de reservation ZoneVIII a bien ete recue"
    body = "\n".join(
        [
            f"Bonjour {client.prenomClient},",
            "",
            "Votre demande de reservation ZoneVIII a bien ete recue.",
            "Notre equipe reviendra vers vous rapidement pour la suite.",
            "",
            *_client_reservation_details(reservation),
            "",
            "Merci pour votre confiance.",
            "ZoneVIII",
        ]
    )

    send_mail(
        subject=subject,
        message=body,
        from_email=settings.DEFAULT_FROM_EMAIL,
        recipient_list=[client.email],
        fail_silently=False,
    )


def _reservation_details(reservation):
    client = reservation.client
    return [
        f"Nom: {client.nomClient}",
        f"Prenom: {client.prenomClient}",
        f"Email: {client.email}",
        f"Telephone: {client.telephone}",
        f"Service: {_service_name(reservation)}",
        f"Tarif: {reservation.tarif.nomTarif}",
        f"Date: {reservation.date.isoformat()}",
        f"Heure: {reservation.heure.strftime('%H:%M')}",
        f"Duree: {reservation.duree}",
        f"Statut: {reservation.statut}",
    ]


def _client_reservation_details(reservation):
    return [
        f"Service: {_service_name(reservation)}",
        f"Tarif: {reservation.tarif.nomTarif}",
        f"Date: {reservation.date.isoformat()}",
        f"Heure: {reservation.heure.strftime('%H:%M')}",
        f"Duree: {reservation.duree}",
    ]


def _service_name(reservation):
    service = getattr(reservation.tarif, "service", None)

    if not service:
        return "Non precise"

    return service.nomService
