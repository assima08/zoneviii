import logging
import threading

from django.conf import settings
from django.db import close_old_connections

from .google_calendar import create_google_calendar_event
from .reservation_notifications import send_reservation_notification_emails

logger = logging.getLogger(__name__)


def run_reservation_side_effects_async(reservation_id):
    logger.info("Reservation side effects thread scheduled for id=%s", reservation_id)
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

        logger.info("Reservation side effects started for id=%s", reservation_id)
        reservation = (
            Reservation.objects
            .select_related("client", "tarif", "tarif__service")
            .get(id=reservation_id)
        )

        if settings.ENABLE_GOOGLE_CALENDAR_SYNC:
            try:
                logger.info(
                    "Google Calendar sync started for reservation id=%s",
                    reservation.id,
                )
                event_id = create_google_calendar_event(reservation)
                logger.info(
                    "Google Calendar sync finished for reservation id=%s",
                    reservation.id,
                )
                if event_id:
                    reservation.google_calendar_event_id = event_id
                    reservation.save(update_fields=["google_calendar_event_id"])
                    logger.info(
                        "Google Calendar event id saved for reservation id=%s event_id=%s",
                        reservation.id,
                        event_id,
                    )
            except Exception:
                logger.exception(
                    "Google Calendar sync failed for reservation id=%s",
                    reservation.id,
                )
        else:
            logger.info(
                "Google Calendar sync skipped for reservation id=%s: feature disabled",
                reservation.id,
            )

        if settings.ENABLE_RESERVATION_EMAIL_NOTIFICATION:
            try:
                logger.info(
                    "SMTP notification started for reservation id=%s",
                    reservation.id,
                )
                email_warnings = send_reservation_notification_emails(reservation)
                logger.info(
                    "SMTP notification finished for reservation id=%s",
                    reservation.id,
                )
                if email_warnings:
                    logger.warning(
                        "Reservation notification email warnings for reservation %s: %s",
                        reservation.id,
                        ", ".join(email_warnings),
                    )
            except Exception:
                logger.exception(
                    "SMTP notification failed for reservation id=%s",
                    reservation.id,
                )
        else:
            logger.info(
                "SMTP notification skipped for reservation id=%s: feature disabled",
                reservation.id,
            )

        logger.info("Reservation side effects finished for id=%s", reservation_id)
    except Exception:
        logger.exception("Reservation side effects failed for reservation %s", reservation_id)
    finally:
        close_old_connections()
