from django.shortcuts import render
from train.models import Departure, Ride, Train
from easycheckout.models import Order, CustomerType
from .serializers import *
from rest_framework import viewsets
from rest_framework.response import Response
from pagination import OrderListPagination

# Create your views here.

class CustomerList(viewsets.ModelViewSet):
    serializer_class = CustomerTypeSerializer
    queryset = CustomerType.objects.all()
    def list(self, request):
        serializer = self.serializer_class(self.queryset, many=True)
        return Response(serializer.data)

class DepartureList(viewsets.ModelViewSet):
    serializer_class = DepartureSerializer
    queryset = Departure.objects.all()
    def list(self, request):
        serializer = self.serializer_class(self.queryset, many=True)
        return Response(serializer.data)

class TrainList(viewsets.ModelViewSet):
    serializer_class = TrainSerializer
    queryset = Train.objects.all()

    def list(self, request):
        date = request.GET['date_on']
        departure = request.GET['departure']
        trains = self.queryset.filter(date_on=date, ride__departure_id=departure)
        print('trains', trains)
        if not trains:
            for ride in Ride.objects.filter(departure_id=departure):
                trains = [trains] + [self.queryset.create(
                    date_on=date,
                    ride=ride,
                )]
        serializer = self.serializer_class(trains, many=True)
        return Response(serializer.data)

class RideList(viewsets.ModelViewSet):
    serializer_class = RideSerializer
    queryset = Ride.objects.all()

class OrderList(viewsets.ModelViewSet):
    serializer_class = OrderSerializer
    queryset = Order.objects.all().order_by('-id')
    pagination_class = OrderListPagination

    def list(self, request):
        page = self.paginate_queryset(self.queryset)
        if page is not None:
            serializer = self.serializer_class(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.serializer_class(self.queryset, many=True)
        return Response(serializer.data)

    def create(self, request):
        orderSelected = self.queryset.create(reference = request.data['reference'])
        return self.list(request)




