from django.db import models

from django.utils.translation import ugettext as _
from django.template.defaultfilters import slugify
from django.core.exceptions import ValidationError 

# Create your models here.

class Departure(models.Model):
    title = models.CharField(max_length=150, verbose_name=_('title'))
    slug = models.CharField(max_length=100, blank=False, verbose_name=_('slug'), help_text=_('Slug'))
    is_active = models.BooleanField(_('is active'), default=True)

    class Meta:
        verbose_name = _(u'Station de départ')
        verbose_name_plural = _(u'Stations de départ')

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super(Departure, self).save(*args, **kwargs)

class Ride(models.Model):
    departure = models.ForeignKey(Departure, verbose_name='departure', help_text='lieu de départ', blank=True, null=True, on_delete=models.CASCADE)
    departure_hour = models.CharField(max_length=150, blank=True, null=True, verbose_name='departure_hour', help_text='heure de départ')
    title = models.CharField(max_length=100, blank=False, verbose_name=_('title'), help_text=_('Service title'))
    slug = models.CharField(max_length=100, blank=False, verbose_name=_('slug'), help_text=_('Slug'))
    is_active = models.BooleanField(_('is active'), default=True)

    class Meta:
        verbose_name =_(u'Heure de départ')
        verbose_name_plural =_(u'Heures de départ')
    
    def __str__(self):
        return '{0}: {1}'.format(self.departure.title, self.departure_hour)
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super(Ride, self).save(*args, **kwargs)


class Train(models.Model):
    ride = models.ForeignKey(Ride, verbose_name=_('ride'), help_text=_('Choose a ride'), on_delete=models.CASCADE)
    title = models.CharField(max_length=100, blank=False, verbose_name=_('title'), help_text=_('Service title'))
    slug = models.CharField(max_length=100, blank=False, verbose_name=_('slug'), help_text=_('Slug'))
    is_active = models.BooleanField(_('is active'), default=True)
    date_on = models.DateField(verbose_name=_(u'Date'), blank=True, null=True)
    total_capacity = models.IntegerField(verbose_name=_(u'total capacity'), null=True, default=60, blank=True, help_text=_('Train total capacity'))
    actual_capacity = models.IntegerField(verbose_name=_(u'actual capacity'), default=0, null=True, blank=True, help_text=_('Actual train capacity'))

    class Meta:
        ordering = ['date_on']
        verbose_name = _(u' Train')
        verbose_name_plural = _(u' Trains')

    def __str__(self):
        return str('%s:%s-%s') % (self.date_on,self.ride.departure_hour,self.actual_capacity)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super(Train, self).save(*args, **kwargs)

    def get_remaining_place(self):
        return self.total_capacity - self.actual_capacity

    def decrease_capacity(self, number):
        self.actual_capacity = self.actual_capacity + number
        self.save()

    def increase_capacity(self, number):
        self.actual_capacity = self.actual_capacity - number
        self.save()