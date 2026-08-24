from django.urls import path

from . import views
from .views import RealisationListView

urlpatterns = [
    path("", views.health_check, name="health-check"),
    path("services/", views.ServiceListView.as_view(), name="service-list"),
    path("tarifs/", views.TarifListView.as_view(), name="tarif-list"),
    path("experts/", views.ExpertListView.as_view(), name="expert-list"),
    path("contact/", views.ContactMessageCreateView.as_view(), name="contact-message-create"),
    path("formations/", views.FormationListView.as_view(), name="formation-list"),
    path("reservations/", views.ReservationListView.as_view(), name="reservation-list"),
    path("reservations/create/", views.ReservationCreateView.as_view(), name="reservation-create"),
    path("realisations/", RealisationListView.as_view(), name="realisations"),
    path("portfolio/", views.PortfolioListView.as_view(), name="portfolio-list"),
]
