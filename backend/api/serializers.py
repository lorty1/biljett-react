from rest_framework import serializers
from train.models import Departure, Ride, Train
from easycheckout.models import Order, CustomerType, Ticket, Avoir

class DepartureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Departure
        fields = '__all__'

class AvoirSerializer(serializers.ModelSerializer):
    class Meta:
        model = Avoir
        fields= '__all__'


class RideSerializer(serializers.ModelSerializer):
    departure = DepartureSerializer()
    class Meta:
        model = Ride
        fields = '__all__'
 
class TrainSerializer(serializers.ModelSerializer):
    ride = RideSerializer()
    
    remaining = serializers.SerializerMethodField('remaining_place')
    def remaining_place(self, Train):
        return Train.get_remaining_place()
    class Meta:
        model = Train
        fields = ['id','title','ride','slug','is_active','date_on','remaining', 'total_capacity']

class CustomerTypeSerializer(serializers.ModelSerializer):

    class Meta:
        model = CustomerType
        fields = '__all__'

class TicketListSerializer(serializers.ModelSerializer):
    customer_type=CustomerTypeSerializer()
    train_departure= TrainSerializer()
    train_arrival=TrainSerializer()

    class Meta:
        model=Ticket
        fields= ['id','order','train_departure','train_arrival','customer_type','number']

class OrderSerializer(serializers.ModelSerializer):
    tickets_list = serializers.SerializerMethodField('get_all_tickets')
    avoirs_list = serializers.SerializerMethodField('get_all_avoir')

    def get_all_avoir(self, Order):
        avoirs = Order.get_avoir()
        serializer = AvoirSerializer(avoirs, many=True)

    def get_all_tickets(self, Order):
        tickets = Order.get_tickets()
        serializer = TicketListSerializer(tickets, many=True)
        return serializer.data

    class Meta:
        model= Order
        fields= [
            'reference',
            'id',
            'created_on',
            'book_to',
            'payment',
            'total',
            'name',
            'email',
            'phone',
            'address',
            'zipcode',
            'city',
            'infos',
            'is_booked',
            'is_updated',
            'is_cancelled',
            'moderated',
            'generated',
            'tickets_list',
            'avoirs_list'
        ]
        
class TicketSerializer(serializers.ModelSerializer):
    order = OrderSerializer(read_only=True)
    customer_type = CustomerTypeSerializer(read_only=True)

    number = serializers.IntegerField(
        required= True,
        error_messages= {
            'null': 'Un nombre de place doit être précisé !'
        }
    )
    order_id = serializers.IntegerField(
        source='order',
        write_only=True,
        error_messages={
            "null": "Une commande est nécessaire avant de créer un nouveaux ticket !"
        }
    )
    departure_id = serializers.IntegerField(
        source='train_departure',
        write_only=True,
        error_messages={
            "null": "Aucun train de départ n'est sélectionné !"
        })
    come_back_id = serializers.IntegerField(
        source='train_arrival',
        write_only=True,
        allow_null=True
    )
    customer_id = serializers.IntegerField(
        source='customer_type',
        write_only=True,
        error_messages={
            "null": "Veuillez sélectionner un type de client !"
        })

    class Meta:
        model = Ticket
        fields = [
            'id','order','order_id', 'train_departure','departure_id','train_arrival','come_back_id','customer_type','customer_id','number','ticket']

    def create(self, validated_data):
        print('validated', validated_data)
        ticket= Ticket.objects.create(
            order_id=validated_data.pop('order'),
            train_departure_id=validated_data.pop('train_departure'),
            train_arrival_id=validated_data.pop('train_arrival'),
            customer_type_id=validated_data.pop('customer_type'),
            **validated_data
        )
        return ticket

