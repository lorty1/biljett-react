from rest_framework import serializers
from train.models import Departure, Ride, Train
from easycheckout.models import Order, CustomerType, Ticket

class DepartureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Departure
        fields = '__all__'


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
    #     order = models.ForeignKey(Order, verbose_name=_('order'), help_text=_('Choose your order'),on_delete=models.CASCADE)
    # customer_type = models.ForeignKey(CustomerType, verbose_name=_('price type'), help_text=_('price customer type'),on_delete=models.CASCADE)
    # number = models.IntegerField(verbose_name=_(u'number'), null=True, blank=True, help_text=_('Ticket number'))
    # train_departure = models.ForeignKey(Train, verbose_name=_('train departure'), help_text=_('Choose a train for departure'), related_name="departure", blank=True, null=True,on_delete=models.CASCADE)
    # train_arrival = models.ForeignKey(Train, verbose_name=_('train go back'), help_text=_('Choose a train for return'), related_name="go_back", blank=True, null=True,on_delete=models.CASCADE)
    # ticket = models.URLField(verbose_name=_(u'ticket'), null=True, blank=True) 

    class Meta:
        model=Ticket
        fields= ['train_departure','train_arrival','customer_type','number']

class OrderSerializer(serializers.ModelSerializer):
    tickets_list = serializers.SerializerMethodField('get_all_tickets')

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
            'tickets_list'
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
        write_only=True
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
            'order','order_id', 'train_departure','departure_id','train_arrival','come_back_id','customer_type','customer_id','number','ticket']

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

