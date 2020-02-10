from django.test import TestCase
from rest_framework.test import APIRequestFactory
from .models import *
from django.contrib.auth.models import User
# Create your tests here.

class TicketTest(TestCase):
    url= 'http://localhost:8000/api/'
    def setUp(self):
        order = Order.objects.create()
        user = User.objects.create(
            username='user',
            password="secretKey",
            email='user@test.com',
            is_staff=False
        )
    def test_ticket(self):
        user = User.objects.get(username="user")
        self.client.force_login(user)

        user_data = self.client.post('{0}{1}'.format(self.url, 'ticket/'),
        data={'ticket':{
                'order_id':2,
                'departure':{
                    'train': ''
                },
                'comeBack': {
                    'train': ''
                }
            }
            })
        print(user_data.content)