# Generated by Django 2.2.7 on 2019-12-22 07:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('easycheckout', '0004_auto_20191222_0703'),
    ]

    operations = [
        migrations.AddField(
            model_name='avoir',
            name='total',
            field=models.DecimalField(blank=True, decimal_places=2, default=0.0, help_text='Total', max_digits=5, null=True, verbose_name='total'),
        ),
    ]
