# Generated by Django 2.2.7 on 2019-11-19 09:17

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('train', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Checkout',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_on', models.DateTimeField(verbose_name='Date de clôture')),
                ('start', models.IntegerField(blank=True, default=0, help_text='Total en euros', null=True, verbose_name='Caisse au départ')),
                ('adults_tickets_A', models.IntegerField(blank=True, default=0, null=True, verbose_name='Adulte 7 euros Riquet')),
                ('adults_tickets_5_A', models.IntegerField(blank=True, default=0, null=True, verbose_name='Adulte 6 euros Riquet')),
                ('adults_tickets_voucher_A', models.IntegerField(blank=True, default=0, null=True, verbose_name='Adulte Voucher Riquet')),
                ('childs_tickets_A', models.IntegerField(blank=True, default=0, null=True, verbose_name='Enfants 4 euros Riquet')),
                ('childs_tickets_voucher_A', models.IntegerField(blank=True, default=0, null=True, verbose_name='Enfants Voucher Riquet')),
                ('total_A', models.IntegerField(blank=True, default=0, help_text='Total en euros', null=True, verbose_name='Total Riquet')),
                ('adults_tickets_B', models.IntegerField(blank=True, default=0, null=True, verbose_name='Adultes 7 euros Fonserane')),
                ('adults_tickets_5_B', models.IntegerField(blank=True, default=0, null=True, verbose_name='Adultes 6 euros Fonserane')),
                ('adults_tickets_voucher_B', models.IntegerField(blank=True, default=0, null=True, verbose_name='Adultes Voucher Fonserane')),
                ('childs_tickets_B', models.IntegerField(blank=True, default=0, null=True, verbose_name='Enfants 4 euros Fonserane')),
                ('childs_tickets_voucher_B', models.IntegerField(blank=True, default=0, null=True, verbose_name='Enfants Voucher Fonserane')),
                ('total_B', models.IntegerField(blank=True, default=0, help_text='Total en euros', null=True, verbose_name='Total Fonserane')),
                ('total', models.IntegerField(blank=True, default=0, help_text='Total en euros', null=True, verbose_name='Caisse en fin de journée')),
                ('cb_payment', models.IntegerField(blank=True, default=0, null=True, verbose_name='Paiements par carte bancaire')),
                ('total_cb', models.IntegerField(blank=True, default=0, help_text='Total en euros', null=True, verbose_name='Total cb')),
                ('cash_payment', models.IntegerField(blank=True, default=0, null=True, verbose_name='Paiements en liquide')),
                ('total_cash', models.IntegerField(blank=True, default=0, help_text='Total en euros', null=True, verbose_name='Total liquide')),
                ('check_payment', models.IntegerField(blank=True, default=0, null=True, verbose_name='Paiements en chèques')),
                ('total_check', models.IntegerField(blank=True, default=0, help_text='Total en euros', null=True, verbose_name='Total chèques')),
                ('tourism_payment', models.IntegerField(blank=True, default=0, null=True, verbose_name='Paiements en chèques vacances')),
                ('total_tourism', models.IntegerField(blank=True, default=0, help_text='Total en euros', null=True, verbose_name='Total chèques vacances')),
                ('voucher_payment', models.IntegerField(blank=True, default=0, null=True, verbose_name='Paiements en Voucher')),
                ('total_voucher', models.IntegerField(blank=True, default=0, help_text='Total en euros', null=True, verbose_name='Total vouchers')),
                ('office_payment', models.IntegerField(blank=True, default=0, null=True, verbose_name='Paiements Office de tourisme')),
                ('total_office', models.IntegerField(blank=True, default=0, help_text='Total en euros', null=True, verbose_name='Total office')),
                ('is_closed', models.BooleanField(default=False, verbose_name='Caisse fermée')),
            ],
            options={
                'verbose_name': 'Caisse',
                'verbose_name_plural': 'Caisse',
            },
        ),
        migrations.CreateModel(
            name='CustomerType',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(help_text='Service title', max_length=100, verbose_name='title')),
                ('slug', models.CharField(help_text='Slug', max_length=100, verbose_name='slug')),
                ('order', models.IntegerField(blank=True, default=0, null=True, verbose_name='Ordre')),
            ],
            options={
                'verbose_name': '3 - ride',
                'verbose_name_plural': '3 - rides',
            },
        ),
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('reference', models.CharField(blank=True, max_length=265, null=True, verbose_name='reference')),
                ('created_on', models.DateTimeField(auto_now=True)),
                ('book_to', models.DateTimeField(blank=True, help_text='Remplissez ce champs si la réservation est ultérieure à la date du jour', null=True, verbose_name='Réservation')),
                ('payment', models.CharField(blank=True, choices=[('cash payment', 'cash payment'), ('check payment', 'check payment'), ('chèque vacances', 'chèque vacances'), ('voucher-pass tourisme', 'voucher-pass tourisme'), ('CB payment', 'CB payment'), ('Office du tourisme', 'Office du tourisme')], max_length=30, null=True, verbose_name='payment type')),
                ('total', models.FloatField(blank=True, default=0.0, help_text='Total', null=True, verbose_name='total')),
                ('name', models.CharField(blank=True, max_length=100, null=True, verbose_name='Name')),
                ('email', models.EmailField(blank=True, max_length=254, null=True, verbose_name='Email')),
                ('phone', models.CharField(blank=True, max_length=100, null=True, verbose_name='Phone')),
                ('address', models.CharField(blank=True, max_length=250, null=True, verbose_name='Address')),
                ('zipcode', models.CharField(blank=True, max_length=100, null=True, verbose_name='Zipcode')),
                ('city', models.CharField(blank=True, max_length=100, null=True, verbose_name='City')),
                ('infos', models.CharField(blank=True, max_length=500, null=True, verbose_name='Notes')),
                ('is_booked', models.BooleanField(default=False, verbose_name='is booked')),
                ('is_updated', models.BooleanField(default=False, verbose_name='is_updated')),
                ('is_cancelled', models.BooleanField(default=False, verbose_name='is cancelled')),
                ('moderated', models.BooleanField(default=False, verbose_name='is moderated')),
                ('generated', models.BooleanField(default=False, verbose_name='Commande enregistrée')),
                ('tickets', models.URLField(blank=True, null=True, verbose_name='ticket(s) à imprimer')),
            ],
            options={
                'verbose_name': '1 - order',
                'verbose_name_plural': '1 - orders',
            },
        ),
        migrations.CreateModel(
            name='TicketSettings',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('year', models.IntegerField(blank=True, null=True, verbose_name='Année')),
                ('tickets', models.IntegerField(blank=True, default=0, null=True, verbose_name='Nombre de tickets vendus')),
                ('cancelled', models.IntegerField(blank=True, default=0, null=True, verbose_name='Nombre de tickets annulés')),
            ],
            options={
                'verbose_name': '6 - Tickets stats',
                'verbose_name_plural': '6 - Tickets stats',
            },
        ),
        migrations.CreateModel(
            name='Ticket',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('number', models.IntegerField(blank=True, help_text='Ticket number', null=True, verbose_name='number')),
                ('ticket', models.URLField(blank=True, null=True, verbose_name='ticket')),
                ('customer_type', models.ForeignKey(help_text='price customer type', on_delete=django.db.models.deletion.CASCADE, to='easycheckout.CustomerType', verbose_name='price type')),
                ('order', models.ForeignKey(help_text='Choose your order', on_delete=django.db.models.deletion.CASCADE, to='easycheckout.Order', verbose_name='order')),
                ('train_arrival', models.ForeignKey(blank=True, help_text='Choose a train for return', null=True, on_delete=django.db.models.deletion.CASCADE, related_name='go_back', to='train.Train', verbose_name='train go back')),
                ('train_departure', models.ForeignKey(blank=True, help_text='Choose a train for departure', null=True, on_delete=django.db.models.deletion.CASCADE, related_name='departure', to='train.Train', verbose_name='train departure')),
            ],
            options={
                'verbose_name': '6 - ticket',
                'verbose_name_plural': '6 - tickets',
            },
        ),
        migrations.CreateModel(
            name='Price',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('price', models.FloatField(blank=True, help_text='Price', null=True, verbose_name='price')),
                ('tax', models.FloatField(blank=True, help_text='Tax', null=True, verbose_name='tax')),
                ('is_active', models.BooleanField(default=True, verbose_name='is active')),
                ('customer_type', models.ForeignKey(help_text='price customer type', on_delete=django.db.models.deletion.CASCADE, to='easycheckout.CustomerType', verbose_name='price type')),
            ],
            options={
                'verbose_name': '5 - price',
                'verbose_name_plural': '5 - prices',
            },
        ),
        migrations.CreateModel(
            name='Avoir',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_on', models.DateTimeField(auto_now=True)),
                ('year', models.IntegerField(blank=True, null=True, verbose_name='Année')),
                ('cancelled', models.IntegerField(blank=True, default=0, null=True, verbose_name='Nombre de tickets annulés')),
                ('order', models.ForeignKey(help_text='Choose your order', on_delete=django.db.models.deletion.CASCADE, to='easycheckout.Order', verbose_name='order')),
            ],
            options={
                'verbose_name': '11 - Avoir',
                'verbose_name_plural': '6 - Avoirs',
            },
        ),
    ]
