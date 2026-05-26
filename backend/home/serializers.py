from datetime import datetime

from django.db import transaction
from rest_framework import serializers

from .models import Client, Expert, ExpertService, Formation, Reservation, Service, Tarifs


class TarifSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tarifs
        fields = ["id", "nomTarif", "typeTarif", "prix", "service"]


class ServiceSerializer(serializers.ModelSerializer):
    tarifs = TarifSerializer(many=True, read_only=True)

    class Meta:
        model = Service
        fields = ["id", "nomService", "description", "tarifs"]


class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = ["id", "nomClient", "prenomClient", "telephone", "email"]


class ReservationSerializer(serializers.ModelSerializer):
    client = ClientSerializer(read_only=True)
    tarif = TarifSerializer(read_only=True)

    class Meta:
        model = Reservation
        fields = ["id", "date", "heure", "duree", "client", "tarif", "statut"]


class ReservationCreateSerializer(serializers.ModelSerializer):
    nomClient = serializers.CharField(write_only=True, max_length=100)
    prenomClient = serializers.CharField(write_only=True, max_length=100)
    telephone = serializers.CharField(write_only=True, max_length=20)
    email = serializers.EmailField(write_only=True)

    class Meta:
        model = Reservation
        fields = [
            "date",
            "heure",
            "duree",
            "tarif",
            "nomClient",
            "prenomClient",
            "telephone",
            "email",
        ]

    def validate(self, data):
        reservation_date = data["date"]
        reservation_heure = data["heure"]
        reservation_duree = data["duree"]

        nouvelle_heure_debut = datetime.combine(
            reservation_date,
            reservation_heure,
        )
        nouvelle_heure_fin = nouvelle_heure_debut + reservation_duree

        reservations = Reservation.objects.filter(
            date=reservation_date,
        ).exclude(
            statut="decline",
        )

        for reservation in reservations:
            ancienne_heure_debut = datetime.combine(
                reservation.date,
                reservation.heure,
            )
            ancienne_heure_fin = ancienne_heure_debut + reservation.duree

            if nouvelle_heure_debut < ancienne_heure_fin and nouvelle_heure_fin > ancienne_heure_debut:
                raise serializers.ValidationError(
                    "Ce creneau horaire est deja reserve.",
                )

        return data

    @transaction.atomic
    def create(self, validated_data):
        nom = validated_data.pop("nomClient")
        prenom = validated_data.pop("prenomClient")
        telephone = validated_data.pop("telephone")
        email = validated_data.pop("email")

        client, _created = Client.objects.update_or_create(
            email=email,
            defaults={
                "nomClient": nom,
                "prenomClient": prenom,
                "telephone": telephone,
            },
        )

        return Reservation.objects.create(
            client=client,
            **validated_data,
        )

    def to_representation(self, instance):
        return ReservationSerializer(instance).data


class ExpertSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expert
        fields = ["id", "nomExpert", "telephone", "email", "photo"]


class ExpertServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExpertService
        fields = ["id", "expert", "service"]


class FormationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Formation
        fields = ["id", "nomFormation", "expert", "cout", "duree"]
