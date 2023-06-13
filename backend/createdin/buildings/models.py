from django.conf import settings
from django.db import models
from django.core.mail import send_mail
from django.shortcuts import get_object_or_404
from django.db.models.signals import post_save, pre_save
from django.dispatch import receiver
from users.models import Landlord, Renter
import json


class Building(models.Model):
    owner = models.ForeignKey(
        Landlord,
        on_delete=models.DO_NOTHING,
        related_name='buildings',
        verbose_name='Владелец',
        help_text='Выберите контактное лицо/владельца обьекта'
    )
    title = models.CharField(
            max_length=200,
            blank=False,
            verbose_name='Название',
            help_text='Введите название обьекта'
    )
    specialization = models.CharField(
            verbose_name='Специализация',
            help_text='Введите специализацию обьекта',
            max_length=200
    )
    desc = models.TextField(
            verbose_name='Описание площадки',
            help_text='Введите описание площадки',
            blank=True,
    )
    address = models.CharField(
            max_length=100,
            blank=False,
            verbose_name='Адрес объекта'
    )
    coordinates = models.CharField(
            max_length=30,
            blank=False,
            verbose_name='Координаты объекта'
    )
    operating_hours = models.CharField(
            max_length=50,
            blank=True,
            verbose_name='Режим работы'
    )
    site = models.URLField(
            max_length=40,
            verbose_name='Сайт объекта',
            help_text='Введите сайт объекта'
    )
    area_sum = models.PositiveIntegerField(
            verbose_name='Общая площадь имущественного комплекса (кв. м)',
            help_text='Введите общую площадь имущественного комплекса (кв. м)',
            blank=True,
            null=True
    )
    area_rent = models.PositiveIntegerField(
            verbose_name='Свободная арендопригодная площадь (кв. м)',
            help_text='Введите свободную арендопригодную площадь (кв. м)',
            blank=True,
            null=True
    )
    features = models.TextField(
            verbose_name='Особенности',
            help_text='Напишите объекты коллективного пользования, спец. оборудование объектов и т.д. ',
            blank=True
    )
    additional_information = models.TextField(
            verbose_name='Дополнительная информация',
            help_text='Введите важную по вашему мнению дополнительную информацию',
            blank=True
            )
    capacity = models.PositiveIntegerField(
            verbose_name='Вместимость, чел.',
            help_text='Введите вместимость, чел.',
            blank=True,
            null=True
    )
    booking = models.TextField(
            verbose_name='Даты бронирования',
            help_text='Даты в которые объект занят',
            blank=True
            )
    cost = models.PositiveIntegerField(
            verbose_name='Стоимость',
            help_text='Введите стоимость аренды за сутки',
            blank=True,
            null=True
    )
    entity = models.CharField(
            max_length=200,
            blank=True,
            verbose_name='Юр. название',
            help_text='Введите стоимость аренды'
    )
    phone = models.CharField(
            max_length=30,
            blank=True,
            verbose_name='Контактный телефон',
            help_text='Введите телефон'
    ) 
    email = models.CharField(
            max_length=30,
            blank=True,
            verbose_name='Адрес электронной почты',
            help_text='Введите почту'
    )
    inn = models.CharField(
            max_length=12,
            blank=True,
            verbose_name='ИНН',
            help_text='Введите стоимость аренды'
    )


    class Meta:
        verbose_name = 'Объект'
        verbose_name_plural = 'Обьекты'
        ordering = ['-cost']

    def set_booking(self, x):
        self.booking = json.dumps(x)
    
    def get_booking(self):
        return [self.booking]


    def __str__(self):
        return self.title


class BuildingImage(models.Model):
    building = models.ForeignKey(
        Building,
        on_delete=models.CASCADE,
        related_name='building_images'
    )
    image = models.ImageField(
        verbose_name='Изображение',
        blank=True,
        upload_to='',
        help_text='Выберите изображение'
    )

    class Meta:
        verbose_name = "Изображение"
        verbose_name_plural = "Изображения"

    def __str__(self):
        return self.building.title


class Status(models.Model):
    CHOICES = [
        ('Опубликовано', 'Опубликовано'),
        ('Заблокировано', 'Заблокировано'),
        ('Снято с публикации', 'Снято с публикации'),
        ('На модерации', 'На модерации')
    ]
    stat = models.CharField(
            verbose_name='Состояние',
            help_text='Выберите состояние добавленного обьекта',
            choices=CHOICES,
            max_length=200
    )
    reject_text = models.TextField(
            verbose_name='Комментарий администратора',
            help_text='Введите текст комментария',
            blank=True,
    )
    building = models.ForeignKey(
        Building,
        on_delete=models.CASCADE,
        related_name='building_status'
    )

    class Meta:
        verbose_name = "Статус"
        verbose_name_plural = "Статусы"

    def __str__(self):
        return self.building.title
    

@receiver(post_save, sender=Building)
def create_building_status(sender, instance, created, **kwargs):
    if created:
        Status.objects.create(stat='На модерации', building=instance)


class Bookings(models.Model):
    renter = models.ForeignKey(
        Renter,
        on_delete=models.DO_NOTHING,
        related_name='bookings_renter',
        verbose_name='Арендатор объекта',
        help_text='Выберите арендатора обьекта'
    ) 
    building = models.ForeignKey(
        Building,
        on_delete=models.DO_NOTHING,
        related_name='bookings_object',
        verbose_name='Объект',
        help_text='Выберите обьект'
    )
    check_in = models.DateField(
            verbose_name='Дата начала аренды',
            help_text='Введите дату начала аренды'
    )
    check_out = models.DateField(
            verbose_name='Дата окончания аренды',
            help_text='Введите дату окончания аренды'
    )
    message = models.TextField(
            verbose_name='Сообщение владельцу',
            help_text='Введите текст сообщения',
            blank=True,
    )
    approve = models.BooleanField(
            default=False,
            verbose_name='Подтверждение владельца',
            help_text='Подтвердил или нет бронь владелец')
    status = models.BooleanField(
            default=False,
            verbose_name='Рассмотрение владельцем',
            help_text='Рассмотрел или нет заявку владелец')
    
    
    class Meta:
        verbose_name = "Бронирование"
        verbose_name_plural = "Бронирования"


@receiver(post_save, sender=Bookings)
def send_confirmation_email(sender, instance, created, **kwargs):
    if instance.approve is True:
        email = get_object_or_404(
            Renter, 
            email=instance.renter.email).renterprofile.contact_email,
        send_mail(
            subject='Подтверждение бронирования',
            message=f'Ваша заявка на бронирование объекта {instance.building.title} '
                    f'в следующие даты: с {instance.check_in} по {instance.check_out} '
                    f'одобрена. \n'
                    f'Ознакомится с офертой можно по ссылке '
                    f'http://valzet.beget.tech/oferta/{instance.building.id}',
            from_email=settings.EMAIL_HOST_USER,
            recipient_list=[email, ],
            fail_silently=False
        )
