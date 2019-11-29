from django.contrib import admin
from .models import Departure, Ride, Train
# Register your models here.

class DepartureAdmin(admin.ModelAdmin):
    class Meta:
        model = Departure

class RideAdmin(admin.ModelAdmin):
    class Meta:
        model = Ride

class TrainAdmin(admin.ModelAdmin):
    class meta:
        model = Train

admin.site.register(Departure, DepartureAdmin)
admin.site.register(Ride, RideAdmin)
admin.site.register(Train, TrainAdmin)