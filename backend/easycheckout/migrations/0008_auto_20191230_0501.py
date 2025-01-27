# Generated by Django 2.2.7 on 2019-12-30 05:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('easycheckout', '0007_auto_20191227_2012'),
    ]

    operations = [
        migrations.AddField(
            model_name='checkout',
            name='avoir',
            field=models.IntegerField(blank=True, default=0, null=True, verbose_name="Nombre d'avoir"),
        ),
        migrations.AddField(
            model_name='checkout',
            name='total_avoir',
            field=models.DecimalField(blank=True, decimal_places=2, default=0, help_text='Total en euros', max_digits=5, null=True, verbose_name='Total avoir'),
        ),
    ]
