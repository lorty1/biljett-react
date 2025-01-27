from django.shortcuts import render
from django.db.models import Q
from train.models import Departure, Ride, Train
from easycheckout.models import Order, CustomerType, Ticket, Checkout
from .serializers import *
from django.http import Http404
from rest_framework import viewsets, status
import datetime
from decimal import Decimal
from .utils.exceptions import CapacityTrainError, TicketError
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from pagination import OrderListPagination
from django.core.exceptions import ValidationError 
import json
# Create your views here.

class CustomerList(viewsets.ModelViewSet):
    serializer_class = CustomerTypeSerializer
    queryset = CustomerType.objects.all()
    permission_classes = [IsAuthenticated]

    def list(self, request):
        serializer = self.serializer_class(self.queryset, many=True)
        return Response(serializer.data)

class DepartureList(viewsets.ModelViewSet):
    serializer_class = DepartureSerializer
    queryset = Departure.objects.all()
    permission_classes = [IsAuthenticated]

    def list(self, request):
        serializer = self.serializer_class(self.queryset, many=True)
        return Response(serializer.data)

class TrainList(viewsets.ModelViewSet):
    serializer_class = TrainSerializer
    queryset = Train.objects.all()
    permission_classes = [IsAuthenticated]

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
    queryset = Order.objects.all().order_by('-created_on')
    pagination_class = OrderListPagination
    permission_classes = [IsAuthenticated]
    
    def retrieve_object(self, id):
        try:
            return self.queryset.get(pk=id)
        except:
            raise Http404
    
    def list(self, request):
        if 'search' in request.GET:
            search = request.GET['search']
            filter_name = Q(name__contains=search)
            filter_reference= Q(reference__contains=search)
            self.queryset = self.queryset.filter(filter_name | filter_reference)

        page = self.paginate_queryset(self.queryset)
        if page is not None:
            serializer = self.serializer_class(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.serializer_class(self.queryset, many=True)
        return Response(serializer.data)

    def create(self, request):
        self.queryset.create()
        return self.list(request)
    
    def patch(self, request):
        pk = request.data['id']
        order = self.retrieve_object(pk)
        serializer = OrderSerializer(order, data=request.data)
        if serializer.is_valid():
            serializer.save()
            if 'generated' in request.data: # if order will be saved
                order.checkout.update_order_checkout(order.id)
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TicketList(viewsets.ModelViewSet):
    serializer_class = TicketSerializer
    queryset = Ticket.objects.filter(is_cancelled=False)
    permission_classes = [IsAuthenticated]

    def retrieve_object(self, pk):
        try:
            return self.queryset.get(pk=pk)
        except:
            raise Http404

    def retrieve_order(self, pk):
        try:
            return Order.objects.get(pk=pk)
        except:
            raise Http404

    def check_capacity_all_train(self, trains, place):
        trains_copy= [Train.objects.get(pk=pk) for pk in trains if pk]
        for train in trains_copy: #check train capacity
            if train.actual_capacity + place > train.total_capacity :
                raise ValidationError(
                    'La capacité du train de {0} est dépassé !'.format(train.ride.departure_hour)
                )
            train.actual_capacity += place

    def create(self, request):

        ticket_data = {
            'order_id': request.data['order_id'] if 'order_id' in request.data else None,
            'departure_id': request.data['ticket']['departure']['train'],
            'come_back_id': request.data['ticket']['comeBack']['train'],
            'customer_id': request.data['ticket']['customerType']['id'],
            'number': request.data['ticket']['customerType']['number']
        }
        serializer = self.serializer_class(data=ticket_data)
        if serializer.is_valid():
            try:
                trains = [ticket_data['departure_id'], ticket_data['come_back_id']]
                self.check_capacity_all_train(trains,ticket_data['number'])
                for pk in trains: # decrease train capacity
                    if pk:
                        train = Train.objects.get(pk=pk)
                        train.decrease_capacity(ticket_data['number'])
            except Exception as e:
                return Response({'capacité': e}, status=status.HTTP_400_BAD_REQUEST)
            order = self.retrieve_order(ticket_data['order_id'])
            try: # check if order has been already print
                order.check_is_printed()
                order.total += Decimal(
                    request.data['ticket']['customerType']['price'] * request.data['ticket']['customerType']['number']
                    )
                order.save()
            except Exception as e:
                return Response({'order': e}, status=status.HTTP_400_BAD_REQUEST)
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk=None):
        data = request.data
        order = self.retrieve_order(data[0]['order_id'])
        # if payment has done, avoir will be created
        avoir = Avoir.objects.create(order_id=order.pk) if order.generated == True else None
        for item in data:
            ticket = self.retrieve_object(item['id'])
            #ticket deleted if placeDeleted == ticket.number:
            if ticket.number == item['placeDeleted']:
                ticket.is_cancelled = True
            else:
                ticket.number -= item['placeDeleted']
                order.total -= ticket.customer_type.price * item['placeDeleted']
            ticket.save()
            order.save()
            try: # if variable avoir has been create we compute the amount refunded
                avoir.total = ticket.customer_type.price * item['placeDeleted']
                avoir.cancelled += item['placeDeleted']
                avoir.save()
                checkout, created = Checkout.objects.get_or_create(created_on=datetime.datetime.today())
                checkout.avoir_checkout(avoir.total)
            except:
                pass
        serializer = OrderSerializer(order)
        return Response(serializer.data)

class CheckoutList(viewsets.ModelViewSet):
    serializer_class = CheckoutSerializer
    queryset = Checkout.objects.all()
    permission_classes = [IsAdminUser]

    def list(self, request):
        serializer = CheckoutSerializer(self.queryset,many=True)
        return Response(serializer.data)

class AuthTest(viewsets.ModelViewSet):
    def list(self, request):
        t = 'ok'
        return Response(t)