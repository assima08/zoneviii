from rest_framework.response import Response
from rest_framework.decorators import api_view

from .models import *
from .serializers import *

def home():
    pass

@api_view(['GET'])
def service_list(request):

    services = Service.objects.all()

    serializer = ServiceSerializer(
        services,
        many = True
    )
    return Response(serializer.data)


@api_view(['GET'])
def experts_list(request):

    experts = Expert.objects.all()

    serializer = ExpertSerializer(
        experts,
        many = True
    )
    return Response(serializer.data)

@api_view(['POST'])
def create_reservation(request):

    serializer = ReservationSerializer(data = request.data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    
    return Response(serializer.errors)

