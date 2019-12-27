from django.contrib import admin

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