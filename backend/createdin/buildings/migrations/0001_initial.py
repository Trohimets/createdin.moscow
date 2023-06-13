# Generated by Django 4.2.1 on 2023-05-28 15:34

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Building',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(help_text='Введите название обьекта', max_length=200, verbose_name='Название')),
                ('specialization', models.CharField(help_text='Введите специализацию обьекта', max_length=200, verbose_name='Специализация')),
                ('desc', models.TextField(blank=True, help_text='Введите описание площадки', verbose_name='Описание площадки')),
                ('address', models.CharField(max_length=100, verbose_name='Адрес объекта')),
                ('coordinates', models.CharField(max_length=30, verbose_name='Координаты объекта')),
                ('operating_hours', models.CharField(blank=True, max_length=50, verbose_name='Режим работы')),
                ('site', models.URLField(help_text='Введите сайт объекта', max_length=40, verbose_name='Сайт объекта')),
                ('area_sum', models.PositiveIntegerField(blank=True, help_text='Введите общую площадь имущественного комплекса (кв. м)', null=True, verbose_name='Общая площадь имущественного комплекса (кв. м)')),
                ('area_rent', models.PositiveIntegerField(blank=True, help_text='Введите свободную арендопригодную площадь (кв. м)', null=True, verbose_name='Свободная арендопригодная площадь (кв. м)')),
                ('features', models.TextField(blank=True, help_text='Напишите объекты коллективного пользования, спец. оборудование объектов и т.д. ', verbose_name='Особенности')),
                ('additional_information', models.TextField(blank=True, help_text='Введите важную по вашему мнению дополнительную информацию', verbose_name='Дополнительная информация')),
                ('capacity', models.PositiveIntegerField(blank=True, help_text='Введите вместимость, чел.', null=True, verbose_name='Вместимость, чел.')),
                ('booking', models.TextField(blank=True, help_text='Даты в которые объект занят', verbose_name='Даты бронирования')),
                ('cost', models.PositiveIntegerField(blank=True, help_text='Введите стоимость аренды за сутки', null=True, verbose_name='Стоимость')),
                ('entity', models.CharField(blank=True, help_text='Введите стоимость аренды', max_length=200, verbose_name='Юр. название')),
                ('phone', models.CharField(blank=True, help_text='Введите телефон', max_length=30, verbose_name='Контактный телефон')),
                ('email', models.CharField(blank=True, help_text='Введите почту', max_length=30, verbose_name='Адрес электронной почты')),
                ('inn', models.CharField(blank=True, help_text='Введите стоимость аренды', max_length=12, verbose_name='ИНН')),
            ],
            options={
                'verbose_name': 'Объект',
                'verbose_name_plural': 'Обьекты',
                'ordering': ['-cost'],
            },
        ),
        migrations.CreateModel(
            name='Status',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('stat', models.CharField(choices=[('Опубликовано', 'Опубликовано'), ('Заблокировано', 'Заблокировано'), ('Снято с публикации', 'Снято с публикации'), ('На модерации', 'На модерации')], help_text='Выберите состояние добавленного обьекта', max_length=200, verbose_name='Состояние')),
                ('reject_text', models.TextField(blank=True, help_text='Введите текст комментария', verbose_name='Комментарий администратора')),
                ('building', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='building_status', to='buildings.building')),
            ],
            options={
                'verbose_name': 'Статус',
                'verbose_name_plural': 'Статусы',
            },
        ),
        migrations.CreateModel(
            name='BuildingImage',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(blank=True, help_text='Выберите изображение', upload_to='', verbose_name='Изображение')),
                ('building', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='building_images', to='buildings.building')),
            ],
            options={
                'verbose_name': 'Изображение',
                'verbose_name_plural': 'Изображения',
            },
        ),
    ]