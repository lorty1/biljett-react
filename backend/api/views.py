from django.shortcuts import render
from train.models import Departure, Ride, Train, Capacity
from .serializers import DepartureSerializer, TrainSerializer, RideSerializer, CapacitySerializer
from rest_framework import viewsets

# Create your views here.

class DepartureList(viewsets.ModelViewSet):
    serializer_class = DepartureSerializer
    queryset = Departure.objects.all()

class TrainList(viewsets.ModelViewSet):
    serializer_class = TrainSerializer
    queryset = Train.objects.all()

class RideList(viewsets.ModelViewSet):
    serializer_class = RideSerializer
    queryset = Ride.objects.all()
