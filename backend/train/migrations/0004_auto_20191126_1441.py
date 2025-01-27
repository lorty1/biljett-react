# Generated by Django 2.2.7 on 2019-11-26 14:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('train', '0003_auto_20191119_1109'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='ride',
            options={'verbose_name': 'Heure de départ', 'verbose_name_plural': 'Heure de départ'},
        ),
        migrations.AlterModelOptions(
            name='train',
            options={'ordering': ['date_on'], 'verbose_name': ' train', 'verbose_name_plural': ' trains'},
        ),
        migrations.AddField(
            model_name='train',
            name='actual_capacity',
            field=models.IntegerField(blank=True, default=0, help_text='Actual train capacity', null=True, verbose_name='actual capacity'),
        ),
        migrations.AddField(
            model_name='train',
            name='date_on',
            field=models.DateField(blank=True, null=True, verbose_name='Date'),
        ),
        migrations.AlterField(
            model_name='train',
            name='total_capacity',
            field=models.IntegerField(blank=True, default=60, help_text='Train total capacity', null=True, verbose_name='total capacity'),
        ),
        migrations.DeleteModel(
            name='Capacity',
        ),
    ]
