from django.db import models

# Create your models here.
#r!/usr/local/bin/python
# coding: utf-8
import os
from django.db import models

from django.conf import settings
from datetime import datetime
from django.template.defaultfilters import slugify

from django.utils.translation import ugettext as _
from django.core.files import File
from train.models import *
from django.utils import timezone
from datetime import datetime, timedelta, time
import locale

PAYMENT_TYPE = (
    (_(u'cash payment'), _(u'cash payment')),
    (_(u'check payment'), _(u'check payment')),
    (_(u'chèque vacances'), _(u'chèque vacances')),
    (_(u'voucher-pass tourisme'), _(u'voucher-pass tourisme')),
    (_(u'CB payment'), _(u'CB payment')),
    (_(u'Office du tourisme'), _(u'Office du tourisme')),
)

class Checkout(models.Model):
    created_on = models.DateTimeField(verbose_name=u"Date de clôture")
    start = models.IntegerField(verbose_name=_(u'Caisse au départ'), default=0, null=True, blank=True, help_text="Total en euros")
    adults_tickets_A = models.IntegerField(verbose_name=_(u'Adulte 7 euros Riquet'), default=0, null=True, blank=True)
    adults_tickets_5_A = models.IntegerField(verbose_name=_(u'Adulte 6 euros Riquet'), default=0, null=True, blank=True)
    adults_tickets_voucher_A = models.IntegerField(verbose_name=_(u'Adulte Voucher Riquet'), default=0, null=True, blank=True)
    childs_tickets_A = models.IntegerField(verbose_name=_(u'Enfants 4 euros Riquet'), default=0, null=True, blank=True)
    childs_tickets_voucher_A = models.IntegerField(verbose_name=_(u'Enfants Voucher Riquet'), default=0, null=True, blank=True)
    total_A = models.IntegerField(verbose_name=_(u'Total Riquet'), default=0, null=True, blank=True, help_text="Total en euros")
    adults_tickets_B = models.IntegerField(verbose_name=_(u'Adultes 7 euros Fonserane'), default=0, null=True, blank=True)
    adults_tickets_5_B = models.IntegerField(verbose_name=_(u'Adultes 6 euros Fonserane'), default=0, null=True, blank=True)
    adults_tickets_voucher_B = models.IntegerField(verbose_name=_(u'Adultes Voucher Fonserane'), default=0, null=True, blank=True)
    childs_tickets_B = models.IntegerField(verbose_name=_(u'Enfants 4 euros Fonserane'), default=0, null=True, blank=True)
    childs_tickets_voucher_B = models.IntegerField(verbose_name=_(u'Enfants Voucher Fonserane'), default=0, null=True, blank=True)
    total_B = models.IntegerField(verbose_name=_(u'Total Fonserane'), default=0, null=True, blank=True, help_text="Total en euros")
    total = models.IntegerField(verbose_name=_(u'Caisse en fin de journée'), default=0, null=True, blank=True, help_text="Total en euros")
    cb_payment = models.IntegerField(verbose_name=_(u'Paiements par carte bancaire'), default=0, null=True, blank=True)
    total_cb = models.IntegerField(verbose_name=_(u'Total cb'), default=0, null=True, blank=True, help_text="Total en euros")
    cash_payment = models.IntegerField(verbose_name=_(u'Paiements en liquide'), default=0, null=True, blank=True)
    total_cash = models.IntegerField(verbose_name=_(u'Total liquide'), default=0, null=True, blank=True, help_text="Total en euros")
    check_payment = models.IntegerField(verbose_name=_(u'Paiements en chèques'), default=0, null=True, blank=True)
    total_check = models.IntegerField(verbose_name=_(u'Total chèques'), default=0, null=True, blank=True, help_text="Total en euros")
    tourism_payment = models.IntegerField(verbose_name=_(u'Paiements en chèques vacances'), default=0, null=True, blank=True)
    total_tourism = models.IntegerField(verbose_name=_(u'Total chèques vacances'), default=0, null=True, blank=True, help_text="Total en euros")
    voucher_payment = models.IntegerField(verbose_name=_(u'Paiements en Voucher'), default=0, null=True, blank=True)
    total_voucher = models.IntegerField(verbose_name=_(u'Total vouchers'), default=0, null=True, blank=True, help_text="Total en euros")
    office_payment = models.IntegerField(verbose_name=_(u'Paiements Office de tourisme'), default=0, null=True, blank=True)
    total_office = models.IntegerField(verbose_name=_(u'Total office'), default=0, null=True, blank=True, help_text="Total en euros")
    is_closed = models.BooleanField(_(u'Caisse fermée'), default=False)

    class Meta:
        verbose_name = _(u'Caisse')
        verbose_name_plural = _(u'Caisse')

    def __unicode__(self):
        return str(self.created_on)


class TicketSettings(models.Model):
    year = models.IntegerField(verbose_name=_(u"Année"), null=True, blank=True)
    tickets = models.IntegerField(verbose_name=_(u'Nombre de tickets vendus'), default=0, null=True, blank=True)
    cancelled = models.IntegerField(verbose_name=_(u'Nombre de tickets annulés'), default=0, null=True, blank=True)

    class Meta:
        verbose_name = _(u'6 - Tickets stats')
        verbose_name_plural = _(u'6 - Tickets stats')

    def __unicode__(self):
        return str(self.year)



class CustomerType(models.Model):
    title = models.CharField(max_length=100, blank=False, verbose_name=_('title'), help_text=_('Service title'))
    slug = models.CharField(max_length=100, blank=False, verbose_name=_('slug'), help_text=_('Slug'))
    order = models.IntegerField('Ordre', blank=True, null=True, default=0)

    class Meta:
        verbose_name = _(u'4 - customer type')
        verbose_name_plural = _(u'4 - customer types')
        ordering = ['order']

    def __unicode__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super(CustomerType, self).save(*args, **kwargs)

    def get_price(self):
        price = Price.objects.get(customer_type=self)
        return price.price


    class Meta:
        verbose_name = _(u'3 - ride')
        verbose_name_plural = _(u'3 - rides')

    def __unicode__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super(Ride, self).save(*args, **kwargs)

    def get_absolute_url(self):
        return '/trains/ride/%s/' % self.slug


class Price(models.Model):
    #ride = models.ForeignKey(Ride, verbose_name=_('ride'), help_text=_('Choose a ride'))
    customer_type = models.ForeignKey(CustomerType, verbose_name=_('price type'), help_text=_('price customer type'), on_delete=models.CASCADE)
    price = models.FloatField(verbose_name=_(u'price'), null=True, blank=True, help_text=_('Price'))
    tax = models.FloatField(verbose_name=_(u'tax'), null=True, blank=True, help_text=_('Tax'))
    is_active = models.BooleanField(_('is active'), default=True)

    class Meta:
        verbose_name = _(u'5 - price')
        verbose_name_plural = _(u'5 - prices')

    def __unicode__(self):
        return (u'Tarif %s : %s TTC') % (self.customer_type, str(self.price))

    def save(self, *args, **kwargs):
        self.get_tax_price()
        super(Price, self).save(*args, **kwargs)

    def get_tax_price(self):
        """
        Render tax from price
        """
        if self.price != 0.0:
            self.tax = float(self.price) - (float(self.price) / 1.1)
        else:
            self.tax = 0.0






class Order(models.Model):
    reference = models.CharField(verbose_name=_(u'reference'), max_length=265, null=True, blank=True)
    created_on = models.DateTimeField(auto_now=True)
    book_to = models.DateTimeField(verbose_name=_(u"Réservation"), null=True, blank=True, help_text=u"Remplissez ce champs si la réservation est ultérieure à la date du jour")
    payment = models.CharField(verbose_name=_(u'payment type'), choices=PAYMENT_TYPE, max_length=30, null=True, blank=True)
    total = models.FloatField(verbose_name=_(u'total'), null=True, blank=True, default=0.0, help_text=_('Total'))
    name = models.CharField(verbose_name=_(u"Name"), max_length=100, null=True, blank=True)
    email = models.EmailField(verbose_name=_(u"Email"), null=True, blank=True)
    phone = models.CharField(verbose_name=_(u"Phone"), max_length=100, null=True, blank=True)
    address = models.CharField(verbose_name=_(u"Address"), max_length=250, null=True, blank=True)
    zipcode = models.CharField(verbose_name=_(u"Zipcode"), max_length=100, null=True, blank=True)
    city = models.CharField(verbose_name=_(u"City"), max_length=100, null=True, blank=True)
    infos = models.CharField(verbose_name=_(u"Notes"), max_length=500, blank=True, null=True)
    is_booked = models.BooleanField(_('is booked'), default=False)
    is_updated = models.BooleanField(_('is_updated'), default=False)
    is_cancelled = models.BooleanField(_('is cancelled'), default=False)
    moderated = models.BooleanField(_('is moderated'), default=False)
    generated = models.BooleanField(_(u'Commande enregistrée'), default=False)
    tickets = models.URLField(verbose_name=_(u'ticket(s) à imprimer'), null=True, blank=True) 

    class Meta:
        verbose_name = _(u'1 - order')
        verbose_name_plural = _(u'1 - orders')


class Ticket(models.Model):
    order = models.ForeignKey(Order, verbose_name=_('order'), help_text=_('Choose your order'),on_delete=models.CASCADE)
    customer_type = models.ForeignKey(CustomerType, verbose_name=_('price type'), help_text=_('price customer type'),on_delete=models.CASCADE)
    number = models.IntegerField(verbose_name=_(u'number'), null=True, blank=True, help_text=_('Ticket number'))
    train_departure = models.ForeignKey(Train, verbose_name=_('train departure'), help_text=_('Choose a train for departure'), related_name="departure", blank=True, null=True,on_delete=models.CASCADE)
    train_arrival = models.ForeignKey(Train, verbose_name=_('train go back'), help_text=_('Choose a train for return'), related_name="go_back", blank=True, null=True,on_delete=models.CASCADE)
    ticket = models.URLField(verbose_name=_(u'ticket'), null=True, blank=True) 
 
    class Meta:
        verbose_name = _(u'6 - ticket')
        verbose_name_plural = _(u'6 - tickets')


class Avoir(models.Model):
    order = models.ForeignKey(Order, verbose_name=_('order'), help_text=_('Choose your order'),on_delete=models.CASCADE)
    created_on = models.DateTimeField(auto_now=True)
    year = models.IntegerField(verbose_name=_(u"Année"), null=True, blank=True)
    cancelled = models.IntegerField(verbose_name=_(u'Nombre de tickets annulés'), default=0, null=True, blank=True)

    class Meta:
        verbose_name = _(u'11 - Avoir')
        verbose_name_plural = _(u'6 - Avoirs')


    def __unicode__(self):
        return str(self.order)


