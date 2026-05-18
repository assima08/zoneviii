from rest_framework import serializers
from .models import *

class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = '__all__'

class TarifSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tarifs
        fields = '__all__'

class ReservationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tarifs
        fields = '__all__'

class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = '__all__'

class ExpertSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expert
        fields = '__all__' 

class ExpertServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExpertSerializer
        fields = '__all__'     
        