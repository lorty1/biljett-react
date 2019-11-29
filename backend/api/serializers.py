from rest_framework import serializers
from train.models import Departure, Ride, Train
from easycheckout.models import Order, CustomerType

class DepartureSerializer(serializers.ModelSerializer):

    class Meta:
        model = Departure
        fields = '__all__'


class RideSerializer(serializers.ModelSerializer):

    class Meta:
        model = Ride
        fields = '__all__'


class TrainSerializer(serializers.ModelSerializer):
    ride = RideSerializer()
    class Meta:
        model = Train
        fields = '__all__'


class OrderSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Order
        fields = '__all__'

class CustomerTypeSerializer(serializers.ModelSerializer):

    class Meta:
        model = CustomerType
        fields = '__all__'