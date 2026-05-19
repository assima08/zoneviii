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

class ReservationCreateSerializer(serializers.ModelSerializer):

    nomClient = serializers.CharField(write_only=True)

    prenomClient = serializers.CharField(write_only=True)

    email = serializers.EmailField(write_only=True)



    class Meta:

        model = Reservation

        fields = [

            "dateReservation",

            "heureReservation",

            "tarif",

            "nomClient",

            "prenomClient",

            "email"
        ]



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

            **validated_data
        )



        return reservation