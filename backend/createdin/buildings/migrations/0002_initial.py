# Generated by Django 4.2.1 on 2023-05-28 15:34

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('users', '0001_initial'),
        ('buildings', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='building',
            name='owner',
            field=models.ForeignKey(help_text='Выберите контактное лицо/владельца обьекта', on_delete=django.db.models.deletion.CASCADE, related_name='buildings', to='users.landlord', verbose_name='Владелец'),
        ),
    ]
