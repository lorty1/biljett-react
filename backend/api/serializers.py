from rest_framework import serializers
from train.models import Departure, Ride, Train, Capacity

class DepartureSerializer(serializers.ModelSerializer):

    class Meta:
        model = Departure
        fields = '__all__'


class RideSerializer(serializers.ModelSerializer):

    class Meta:
        model = Ride
        fields = '__all__'


class TrainSerializer(serializers.ModelSerializer):

    class Meta:
        model = Train
        fields = '__all__'

class CapacitySerializer(serializers.ModelSerializer):

    class Meta:
        model = Capacity
        fields = '__all__'