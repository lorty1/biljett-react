"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.conf import settings
from django.urls import path, include
from rest_framework import routers
from api import views
from django.conf.urls.static import static

router = routers.DefaultRouter()

router.register(r'trains', views.TrainList, 'train-list')
router.register(r'departure', views.DepartureList, 'departure-list')
router.register(r'order', views.OrderList, 'order-list')
router.register(r'customer-type', views.CustomerList, 'customer-type')
router.register(r'ticket', views.TicketList, 'ticket-list')
router.register(r'checkout', views.CheckoutList, 'checkout-list')
router.register(r'test',views.AuthTest, 'auth-test')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls))
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
