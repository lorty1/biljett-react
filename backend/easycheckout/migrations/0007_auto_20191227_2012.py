# Generated by Django 2.2.7 on 2019-12-27 20:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('easycheckout', '0006_auto_20191224_1027'),
    ]

    operations = [
        migrations.AlterField(
            model_name='checkout',
            name='created_on',
            field=models.DateField(verbose_name='Date de clôture'),
        ),
    ]
