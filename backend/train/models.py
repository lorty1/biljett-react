from django.db import models

from django.utils.translation import ugettext as _

# Create your models here.

class Ride(models.Model):
    title = models.CharField(max_length=100, blank=False, verbose_name=_('title'), help_text=_('Service title'))
    slug = models.CharField(max_length=100, blank=False, verbose_name=_('slug'), help_text=_('Slug'))
    #start = models.CharField(max_length=100, blank=False, verbose_name=_('slug'), help_text=_('Slug'))
    #end = models.CharField(max_length=100, blank=False, verbose_name=_('slug'), help_text=_('Slug'))
    is_active = models.BooleanField(_('is active'), default=True)


class Train(models.Model):
    ride = models.ForeignKey(Ride, verbose_name=_('ride'), help_text=_('Choose a ride'), on_delete=models.CASCADE)
    title = models.CharField(max_length=100, blank=False, verbose_name=_('title'), help_text=_('Service title'))
    slug = models.CharField(max_length=100, blank=False, verbose_name=_('slug'), help_text=_('Slug'))
    total_capacity = models.IntegerField(verbose_name=_(u'total capacity'), null=True, blank=True, help_text=_('Train total capacity'))
    #actual_capacity = models.IntegerField(verbose_name=_(u'actual capacity'), null=True, blank=True, help_text=_('Actual train capacity'))
    is_active = models.BooleanField(_('is active'), default=True)

    class Meta:
        ordering = ['title']
        verbose_name = _(u'2 - train')
        verbose_name_plural = _(u'2 - trains')

    def __unicode__(self):
        return str('%s-%s') % (self.title, str(self.capacity_of_the_day()))

    def capacity_of_the_day(self):
        try:
            capacity = Capacity.objects.get(train=self, date_on=datetime.today())
            result = capacity.actual_capacity
        except:
            result = self.total_capacity
        return result

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super(Train, self).save(*args, **kwargs)

class Capacity(models.Model):
    train = models.ForeignKey(Train, verbose_name=_('train'), help_text=_('Choose a train'), on_delete=models.CASCADE)
    date_on = models.DateField(verbose_name=_(u'Date'), blank=True, null=True)
    total_capacity = models.IntegerField(verbose_name=_(u'total capacity'), null=True, blank=True, help_text=_('Train total capacity'))
    actual_capacity = models.IntegerField(verbose_name=_(u'actual capacity'), default=0, null=True, blank=True, help_text=_('Actual train capacity'))

    class Meta:
        ordering = ['date_on']
        verbose_name = _(u'7 - capacity')
        verbose_name_plural = _(u'7 - capacities')

    def __unicode__(self):
        return str('%s - %s') % (self.train.slug, str(self.date_on))

    def save(self, *args, **kwargs):
        total_capacity = self.train.total_capacity
        super(Capacity, self).save(*args, **kwargs)