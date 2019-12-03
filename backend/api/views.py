from django.shortcuts import render
from train.models import Departure, Ride, Train
from easycheckout.models import Order, CustomerType, Ticket
from .serializers import *
from rest_framework import viewsets, status
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

    def retrieve_or_create(self, date, station):
        trains = self.queryset.filter(date_on=date, ride__departure_id=station)
        if not trains:
            trains =  [ 
                self.queryset.create(date_on=date, ride=ride)
                for ride in Ride.objects.filter(departure_id=station) 
            ]
        return trains

    def list(self, request):
        date = request.GET['date_on']
        departure_station = request.GET['departure']

        departure_trains = self.retrieve_or_create(date, departure_station)
        departure_serializer = self.serializer_class(departure_trains, many=True)
        if 'comeBack' in request.GET:
            come_back_station = request.GET['comeBack']
            come_back_trains = self.retrieve_or_create(date,come_back_station)
            come_back_serializer = self.serializer_class(come_back_trains, many=True)
            return Response({'departure':departure_serializer.data, 'comeBack': come_back_serializer.data})
        
        return Response({'departure':departure_serializer.data,'comeBack': None})

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

class TicketList(viewsets.ModelViewSet):
    serializer_class = TicketSerializer
    queryset = Ticket.objects.all()

    def create(self, request):
        print(request.data['order_id'])
        ticket_data = {
            'order_id': request.data['order_id'],
            'departure_id': request.data['ticket']['departure']['train'],
            'come_back_id': request.data['ticket']['comeBack']['train'],
            'customer_id': request.data['ticket']['customerType']['id'],
            'number': request.data['ticket']['customerType']['number']
        }
        serializer = self.serializer_class(data=ticket_data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # ticket: {
    #     departure: {
    #         station: null,
    #         train: null
    #     },
    #     comeBack: {
    #         station: null,
    #         train: null
    #     },
    #     customerType: {
    #         id: null,
    #         number: null
    #     }
    # }


