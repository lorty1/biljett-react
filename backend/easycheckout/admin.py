from django.contrib import admin

from .models import CustomerType

# Register your models here.
class CustomerTypeAdmin(admin.ModelAdmin):
    class meta:
        model = CustomerType

admin.site.register(CustomerType, CustomerTypeAdmin)
