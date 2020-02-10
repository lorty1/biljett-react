from django.test import TestCase
from easycheckout.models import Order
from rest_framework.test import RequestsClient
from django.test import Client
from requests.auth import HTTPBasicAuth
from django.contrib.auth.models import User
from django.urls import reverse
import urls


# Create your tests here.

class PermissionTestCase(TestCase):
    url = 'http://localhost:8000/api/'

    def setUp(self):
        user = User.objects.create(
            username='user',
            password="secretKey",
            email='user@test.com',
            is_staff=False
        )
        admin = User.objects.create(
            username="admin",
            password="secretkey",
            email="admin@test.com",
            is_staff=True
        )

    def test_user_not_logged(self):
        response = self.client.get('{0}{1}'.format(self.url, 'order/'))
        self.assertEqual(response.status_code, 403)

    def test_user_logged(self):
        user = User.objects.get(username="user")
        self.client.force_login(user)

        user_data = self.client.get('{0}{1}'.format(self.url, 'order/'))
        admin_data = self.client.get('{0}{1}'.format(self.url, 'checkout/'))

        self.assertEqual(user_data.status_code, 200)
        self.assertEqual(admin_data.status_code, 403)
    
    def test_admin_logged(self):
        admin = User.objects.get(username="admin")
        self.client.force_login(admin)

        user_data = self.client.get('{0}{1}'.format(self.url, 'order/'))
        admin_data = self.client.get('{0}{1}'.format(self.url, 'checkout/'))

        self.assertEqual(user_data.status_code, 200)
        self.assertEqual(admin_data.status_code, 200)
    