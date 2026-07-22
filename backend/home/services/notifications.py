import logging
from datetime import datetime

from django.conf import settings
from django.core.mail import send_mail

logger = logging.getLogger(__name__)

DEFAULT_RESERVATION_EMAIL = "info@zooneviii.com"


def send_reservation_notification_email(reservation):
    """Send the internal reservation notification without blocking reservations."""
    recipient = getattr(
        settings,
        "RESERVATION_NOTIFICATION_EMAIL",
        DEFAULT_RESERVATION_EMAIL,
    ) or DEFAULT_RESERVATION_EMAIL

    from_email = (
        getattr(settings, "DEFAULT_FROM_EMAIL", "")
        or getattr(settings, "EMAIL_HOST_USER", "")
    )

    missing_settings = _missing_smtp_settings(from_email)

    if missing_settings:
        logger.warning(
            "Reservation notification email skipped for reservation %s: missing SMTP settings: %s",
            reservation.id,
            ", ".join(missing_settings),
        )
        return False

    try:
        send_mail(
            subject="Nouvelle reservation ZooneVIII",
            message=_build_internal_reservation_message(reservation),
            from_email=from_email,
            recipient_list=[recipient],
            fail_silently=False,
        )
    except Exception:
        logger.exception(
            "Reservation notification email failed for reservation %s",
            reservation.id,
        )
        return False

    return True


def _missing_smtp_settings(from_email):
    required_settings = {
        "EMAIL_HOST": getattr(settings, "EMAIL_HOST", ""),
        "EMAIL_PORT": getattr(settings, "EMAIL_PORT", ""),
        "EMAIL_HOST_USER": getattr(settings, "EMAIL_HOST_USER", ""),
        "EMAIL_HOST_PASSWORD": getattr(settings, "EMAIL_HOST_PASSWORD", ""),
        "DEFAULT_FROM_EMAIL": from_email,
    }

    return [name for name, value in required_settings.items() if not value]


def _build_internal_reservation_message(reservation):
    client = reservation.client
    tarif = reservation.tarif
    service = getattr(tarif, "service", None)
    start_at = datetime.combine(reservation.date, reservation.heure)
    end_at = start_at + reservation.duree

    lines = [
        "Nouvelle reservation ZooneVIII",
        "",
        f"ID reservation : {reservation.id}",
        f"Client : {client.prenomClient} {client.nomClient}".strip(),
        f"Nom : {client.nomClient}",
        f"Prenom : {client.prenomClient}",
        f"Email : {client.email}",
        f"Telephone : {client.telephone}",
        f"Service/Tarif : {_service_name(service)} / {tarif.nomTarif}",
        f"Date : {reservation.date.isoformat()}",
        f"Heure debut : {reservation.heure.strftime('%H:%M')}",
        f"Heure fin : {end_at.time().strftime('%H:%M')}",
        f"Duree : {reservation.duree}",
        f"Statut : {reservation.statut}",
    ]

    if reservation.google_calendar_event_id:
        lines.extend(
            [
                "",
                f"Google Calendar Event ID : {reservation.google_calendar_event_id}",
            ]
        )

    lines.extend(
        [
            "",
            f"Admin Django : /admin/home/reservation/{reservation.id}/change/",
            "",
            "Cette notification a ete generee automatiquement depuis le site ZooneVIII.",
        ]
    )

    return "\n".join(lines)


def _service_name(service):
    if not service:
        return "Non precise"

    return service.nomService
