import json
import logging
from datetime import datetime
from pathlib import Path
from zoneinfo import ZoneInfo

from django.conf import settings

logger = logging.getLogger(__name__)

GOOGLE_CALENDAR_SCOPE = "https://www.googleapis.com/auth/calendar"


class GoogleCalendarError(Exception):
    """Raised when a reservation cannot be synchronized with Google Calendar."""


def create_google_calendar_event(reservation):
    calendar_id = settings.GOOGLE_CALENDAR_ID

    if not calendar_id:
        raise GoogleCalendarError("GOOGLE_CALENDAR_ID is not configured.")

    credentials = _load_credentials()
    service = _build_calendar_service(credentials)
    event = _build_event_payload(reservation)

    created_event = (
        service.events()
        .insert(calendarId=calendar_id, body=event)
        .execute()
    )

    event_id = created_event.get("id")

    if not event_id:
        raise GoogleCalendarError("Google Calendar did not return an event id.")

    return event_id


def _load_credentials():
    try:
        from google.oauth2 import service_account
    except ImportError as exc:
        raise GoogleCalendarError("Google Calendar dependencies are not installed.") from exc

    service_account_json = settings.GOOGLE_SERVICE_ACCOUNT_JSON
    service_account_file = settings.GOOGLE_SERVICE_ACCOUNT_FILE

    if service_account_json:
        try:
            credentials_info = json.loads(service_account_json)
        except json.JSONDecodeError as exc:
            raise GoogleCalendarError("GOOGLE_SERVICE_ACCOUNT_JSON is not valid JSON.") from exc

        return service_account.Credentials.from_service_account_info(
            credentials_info,
            scopes=[GOOGLE_CALENDAR_SCOPE],
        )

    if service_account_file:
        credentials_path = Path(service_account_file)

        if not credentials_path.is_absolute():
            credentials_path = settings.BASE_DIR / credentials_path

        if not credentials_path.exists():
            raise GoogleCalendarError(
                f"Google service account file not found: {credentials_path}"
            )

        return service_account.Credentials.from_service_account_file(
            credentials_path,
            scopes=[GOOGLE_CALENDAR_SCOPE],
        )

    raise GoogleCalendarError(
        "GOOGLE_SERVICE_ACCOUNT_JSON or GOOGLE_SERVICE_ACCOUNT_FILE must be configured."
    )


def _build_calendar_service(credentials):
    try:
        from googleapiclient.discovery import build
    except ImportError as exc:
        raise GoogleCalendarError("Google Calendar API client is not installed.") from exc

    return build("calendar", "v3", credentials=credentials, cache_discovery=False)


def _build_event_payload(reservation):
    calendar_timezone = settings.GOOGLE_CALENDAR_TIME_ZONE
    timezone = ZoneInfo(calendar_timezone)
    start_at = datetime.combine(reservation.date, reservation.heure).replace(tzinfo=timezone)
    end_at = start_at + reservation.duree
    client = reservation.client
    tarif = reservation.tarif
    service = getattr(tarif, "service", None)
    client_name = f"{client.prenomClient} {client.nomClient}".strip()

    description_lines = [
        "Nouvelle reservation ZoneVIII",
        "",
        f"Client: {client_name}",
        f"Email: {client.email}",
        f"Telephone: {client.telephone}",
        f"Tarif: {tarif.nomTarif}",
        f"Service: {service.nomService if service else 'Non precise'}",
        f"Date: {reservation.date.isoformat()}",
        f"Heure: {reservation.heure.strftime('%H:%M')}",
        f"Duree: {reservation.duree}",
    ]

    return {
        "summary": f"Reservation ZoneVIII - {client_name}",
        "description": "\n".join(description_lines),
        "start": {
            "dateTime": start_at.isoformat(),
            "timeZone": calendar_timezone,
        },
        "end": {
            "dateTime": end_at.isoformat(),
            "timeZone": calendar_timezone,
        },
        "reminders": {
            "useDefault": False,
            "overrides": [
                {"method": "email", "minutes": 1440},
                {"method": "popup", "minutes": 60},
                {"method": "popup", "minutes": 30},
            ],
        },
    }
