import json
from django.contrib import admin
from django.core.serializers.json import DjangoJSONEncoder
from django.db.models import Count, Sum, F, IntegerField
from django.db.models.functions import TruncDay, TruncYear, TruncMonth
from django.http import JsonResponse
from django.forms.models import model_to_dict
from django.urls import path
from django.urls import reverse
from django.shortcuts import render_to_response, render
from chartit import DataPool, Chart
import datetime
from .models import CustomerType, Checkout, Avoir

# Register your models here.
class CustomerTypeAdmin(admin.ModelAdmin):
    class meta:
        model = CustomerType

class CheckoutAdmin(admin.ModelAdmin):

    def has_delete_permission(self, request, obj=None):
        return False

    def has_change_permission(self, request, obj=None):
        return False

    def get_urls(self):
        urls = super().get_urls()
        extra_urls = [
            path("chartit_data/<int:pk>/", self.admin_site.admin_view(self.chart_data_endpoint_detail)),
            path("chartit_data/", self.admin_site.admin_view(self.chart_data_endpoint))
        ]
        return extra_urls + urls

    def chart_data_endpoint_detail(self, request, pk):
        chart_data = self.chart_detail_data(pk)
        return JsonResponse(chart_data, safe=False)
    
    def chart_detail_data(self, pk):
        return (
            model_to_dict(Checkout.objects.get(pk=pk))
        )
    def chart_data_endpoint(self, request):
        if 'period' in request.GET:
            period = request.GET['period']
        else:
            period = 'month_actual'
        chart_data = self.chart_data(period)
        return JsonResponse(list(chart_data), safe=False)

    def chart_data(self, period):
        print('period', period)
        today = datetime.datetime.today()
        if period == 'month_actual':
            print('today', today, today.year, today.month)
            return (
                Checkout.objects
                .filter(created_on__year = today.year,created_on__month=today.month)
                .annotate(date=TruncDay("created_on"))
                .values("date")
                .annotate(
                    total=Sum('total'),
                    avoir=Sum('total_avoir'),
                    tickets_count = Sum(
                                F('adults_tickets_A') + F('adults_tickets_B') +
                                F('childs_tickets_A') + F('childs_tickets_B') +
                                F('childs_tickets_voucher_A') + F('childs_tickets_voucher_B') +
                                F('adults_tickets_voucher_A') + F('adults_tickets_voucher_B') +
                                F('adults_tickets_5_A') + ('adults_tickets_5_B')
                                )
                )
            )
        elif period == 'year':
            return (
                Checkout.objects.annotate(date=TruncYear("created_on"))
                .values("date")
                .annotate(
                    total=Sum('total'),
                    avoir=Sum('total_avoir'),
                    tickets_count = Sum(
                                F('adults_tickets_A') + F('adults_tickets_B') +
                                F('childs_tickets_A') + F('childs_tickets_B') +
                                F('childs_tickets_voucher_A') + F('childs_tickets_voucher_B') +
                                F('adults_tickets_voucher_A') + F('adults_tickets_voucher_B') +
                                F('adults_tickets_5_A') + ('adults_tickets_5_B')
                                )
                )
            )
        else:
            return (
                Checkout.objects
                .filter(created_on__year=today.year)
                .annotate(date=TruncMonth("created_on"))
                .values("date")
                .annotate(
                    total=Sum('total'),
                    avoir=Sum('total_avoir'),
                    tickets_count = Sum(
                                F('adults_tickets_A') + F('adults_tickets_B') +
                                F('childs_tickets_A') + F('childs_tickets_B') +
                                F('childs_tickets_voucher_A') + F('childs_tickets_voucher_B') +
                                F('adults_tickets_voucher_A') + F('adults_tickets_voucher_B') +
                                F('adults_tickets_5_A') + ('adults_tickets_5_B')
                                )
                )
            )

    class meta:
        model = Checkout

class AvoirAdmin(admin.ModelAdmin):
    

    def has_delete_permission(self, request, obj=None):
        return False

    class meta:
        model = Avoir

admin.site.register(CustomerType, CustomerTypeAdmin)
admin.site.register(Checkout, CheckoutAdmin)
admin.site.register(Avoir, AvoirAdmin)