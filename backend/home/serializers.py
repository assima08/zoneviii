from datetime import datetime
import re
from urllib.parse import urljoin

from django.conf import settings
from django.db import transaction
from django.utils.html import strip_tags
from rest_framework import serializers

def build_image_url(image, request=None):
    if not image:
        return ""

    try:
        url = image.url
    except ValueError:
        return ""

    if not url:
        return ""

    if url.startswith(("http://", "https://")):
        return url

    if request:
        return request.build_absolute_uri(url)

    return urljoin(settings.MEDIA_URL, image.name)


from .models import (
    Client,
    ContactMessage,
    Expert,
    ExpertService,
    Formation,
    Reservation,
    Service,
    Tarifs,
    Realisation
)


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
    imageUrl = serializers.SerializerMethodField()

    class Meta:
        model = Expert
        fields = [
            "id",
            "nomExpert",
            "role",
            "specialite",
            "description",
            "telephone",
            "email",
            "photo",
            "image",
            "imageUrl",
            "instagram",
        ]

    def get_imageUrl(self, obj):
        return build_image_url(obj.image or obj.photo, self.context.get("request"))


class ExpertServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExpertService
        fields = ["id", "expert", "service"]


class FormationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Formation
        fields = ["id", "nomFormation", "expert", "cout", "duree"]


class ContactMessageSerializer(serializers.ModelSerializer):
    website = serializers.CharField(required=False, allow_blank=True, write_only=True)

    class Meta:
        model = ContactMessage
        fields = [
            "id",
            "nom",
            "prenom",
            "email",
            "telephone",
            "sujet",
            "message",
            "created_at",
            "website",
        ]
        read_only_fields = ["id", "created_at"]

    def validate_nom(self, value):
        return self._clean_short_text(value, "nom")

    def validate_prenom(self, value):
        return self._clean_short_text(value, "prenom")

    def validate_sujet(self, value):
        return self._clean_short_text(value, "sujet")

    def validate_telephone(self, value):
        cleaned = self._clean_short_text(value, "telephone")

        if not re.fullmatch(r"[0-9+().\-\s]{6,30}", cleaned):
            raise serializers.ValidationError("Le numero de telephone est invalide.")

        return cleaned

    def validate_message(self, value):
        cleaned = strip_tags(value).strip()

        if len(cleaned) < 10:
            raise serializers.ValidationError("Le message doit contenir au moins 10 caracteres.")

        if len(cleaned) > 2500:
            raise serializers.ValidationError("Le message est trop long.")

        return cleaned

    def validate(self, attrs):
        if attrs.pop("website", ""):
            raise serializers.ValidationError("Votre message n'a pas pu etre envoye.")

        return attrs

    def _clean_short_text(self, value, field_name):
        cleaned = strip_tags(value).strip()

        if len(cleaned) < 2:
            raise serializers.ValidationError(f"Le champ {field_name} est trop court.")

        return cleaned

class RealisationSerializer(serializers.ModelSerializer):
    expert_nom = serializers.CharField(source="expert.nomExpert", read_only=True)
    services_noms = serializers.SerializerMethodField()
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = Realisation
        fields = [
            "id",
            "titre",
            "description",
            "expert",
            "expert_nom",
            "services",
            "services_noms",
            "categorie",
            "image",
            "image_url",
            "lien",
            "date_realisation",
            "est_publiee",
            "created_at",
        ]

    def get_services_noms(self, obj):
        return [service.nomService for service in obj.services.all()]

    def get_image_url(self, obj):
        return build_image_url(obj.image, self.context.get("request")) or None
