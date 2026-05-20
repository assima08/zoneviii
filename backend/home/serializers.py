from rest_framework import serializers
from .models import *

class TarifSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tarifs
        fields = '__all__'

class ServiceSerializer(serializers.ModelSerializer):
    tarifs = TarifSerializer(
        many=True,
        read_only=True
    )
    class Meta:
        model = Service
        fields = '__all__'


class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = '__all__'

class ReservationSerializer(serializers.ModelSerializer):
    client = ClientSerializer()
    tarif = TarifSerializer()
    class Meta:
        model = Tarifs
        fields = '__all__'


class ExpertSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expert
        fields = '__all__' 

class ExpertServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExpertSerializer
        fields = '__all__'

#cette classe permet d'envoyer des données a Django via un formulaire JS (le lien entre les deux)

class ReservationCreateSerializer(serializers.ModelSerializer):

    nomClient = serializers.CharField(write_only=True)

    prenomClient = serializers.CharField(write_only=True)

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

            "email"
        ]



    def validate(self, data):

        from datetime import datetime
        from datetime import timedelta



        reservation_date = data["date"]

        reservation_heure = data["heure"]

        reservation_duree = data["duree"]



        nouvelle_heure_debut = datetime.combine(

            reservation_date,

            reservation_heure
        )



        nouvelle_heure_fin = (

            nouvelle_heure_debut

            + reservation_duree
        )



        reservations = Reservation.objects.filter(

            date=reservation_date
        )



        for reservation in reservations:



            ancienne_heure_debut = datetime.combine(

                reservation.date,

                reservation.heure
            )



            ancienne_heure_fin = (

                ancienne_heure_debut

                + reservation.duree
            )



            conflit = (

                nouvelle_heure_debut

                < ancienne_heure_fin

                and

                nouvelle_heure_fin

                > ancienne_heure_debut
            )



            if conflit:

                raise serializers.ValidationError(

                    "Ce créneau horaire est déjà réservé."
                )



        return data



    def create(self, validated_data):

        nom = validated_data.pop("nomClient")

        prenom = validated_data.pop("prenomClient")

        email = validated_data.pop("email")



        client, created = Client.objects.get_or_create(

            email=email,

            defaults={

                "nomClient": nom,

                "prenomClient": prenom
            }
        )



        reservation = Reservation.objects.create(

            client=client,

            date=validated_data["date"],

            heure=validated_data["heure"],

            duree=validated_data["duree"],

            tarif=validated_data["tarif"]
        )



        return reservation


class FormationSerializer(serializers.ModelSerializer):
    class  Meta:
        model = Formation
        fields = '__all__'