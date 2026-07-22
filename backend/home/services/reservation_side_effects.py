import logging
import threading

from django.db import close_old_connections

from .google_calendar import create_google_calendar_event
from .reservation_notifications import send_reservation_notification_emails

logger = logging.getLogger(__name__)


def run_reservation_side_effects_async(reservation_id):
    thread = threading.Thread(
        target=_run_reservation_side_effects,
        args=(reservation_id,),
        daemon=True,
        name=f"reservation-side-effects-{reservation_id}",
    )
    thread.start()


def _run_reservation_side_effects(reservation_id):
    close_old_connections()

    try:
        from home.models import Reservation

        reservation = (
            Reservation.objects
            .select_related("client", "tarif", "tarif__service")
            .get(id=reservation_id)
        )

        try:
            event_id = create_google_calendar_event(reservation)
            if event_id:
                reservation.google_calendar_event_id = event_id
                reservation.save(update_fields=["google_calendar_event_id"])
        except Exception:
            logger.exception(
                "Google Calendar sync failed for reservation %s",
                reservation.id,
            )

        try:
            email_warnings = send_reservation_notification_emails(reservation)
            if email_warnings:
                logger.warning(
                    "Reservation notification email warnings for reservation %s: %s",
                    reservation.id,
                    ", ".join(email_warnings),
                )
        except Exception:
            logger.exception(
                "Reservation notification email failed for reservation %s",
                reservation.id,
            )
    except Exception:
        logger.exception("Reservation side effects failed for reservation %s", reservation_id)
    finally:
        close_old_connections()
