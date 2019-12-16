from django.contrib import admin

from .models import CustomerType, Checkout

# Register your models here.
class CustomerTypeAdmin(admin.ModelAdmin):
    class meta:
        model = CustomerType

class CheckoutAdmin(admin.ModelAdmin):
    class meta:
        model = Checkout

admin.site.register(CustomerType, CustomerTypeAdmin)
admin.site.register(Checkout, CheckoutAdmin)
