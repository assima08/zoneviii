from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('services/',views.service_list),
    path('reservations/', views.create_reservation),
    path("reservations/create/",views.ReservationCreateView.as_view()),
    path('experts/', views.experts_list),
]