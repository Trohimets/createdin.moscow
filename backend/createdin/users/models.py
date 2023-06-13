from django.db import models
from django.contrib.auth.models import (AbstractBaseUser, BaseUserManager,
                                        PermissionsMixin)
from django.core.validators import RegexValidator
from django.db.models.signals import post_save
from django.dispatch import receiver


phone_regex = RegexValidator(
    regex=r'^\+?7?\d{10,10}$',
    message='Формат номера телефона: +79999999999'
)

renter_type_choices = (
    ('INDIVIDUAL', 'Физическое лицо'),
    ('IP', 'Индивидуальный предприниматель'),
    ('ORGANIZATION', 'Юридическое лицо')
)

landlord_type_choices = (
    ('IP', 'Индивидуальный предприниматель'),
    ('ORGANIZATION', 'Юридическое лицо')
)


class UserManager(BaseUserManager):

    def _create_user(self, email, password, **kwargs):
        is_staff = kwargs.pop('is_staff', False)
        is_superuser = kwargs.pop('is_superuser', False)
        role = kwargs.pop('role', 'ADMIN')
        email = self.normalize_email(email)
        user = self.model(
            email=email,
            role=role,
            is_staff=is_staff,
            is_superuser=is_superuser,
            is_active=True,
            **kwargs,
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password, **kwargs):
        """Creating a user."""
        return self._create_user(email, password, **kwargs)

    def create_superuser(self, email, password, **kwargs):
        """Creating a superuser."""
        return self._create_user(
            email=email,
            password=password,
            is_staff=True,
            is_superuser=True,
            **kwargs
        )


class User(AbstractBaseUser, PermissionsMixin):
    class Role(models.TextChoices):
        ADMIN = 'ADMIN', 'Admin'
        RENTER = 'RENTER', 'Renter'
        LANDLORD = 'LANDLORD', 'Landlord'

    role = models.CharField(max_length=30, choices=Role.choices)
    email = models.EmailField('Email', unique=True, blank=False)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    first_name = models.CharField(
        'Имя',
        max_length=100,
    )
    last_name = models.CharField(
        'Фамилия',
        max_length=100,
    )
    middle_name = models.CharField(
        'Отчество',
        max_length=100,
    )
    REQUIRED_FIELDS = ('role',)
    USERNAME_FIELD = 'email'
    objects = UserManager()

    def save(self, *args, **kwargs):
        if not self.id:
            return super(User, self).save(*args, **kwargs)


class RenterManager(BaseUserManager):
    def get_queryset(self, *args, **kwargs):
        results = super().get_queryset(*args, **kwargs)
        return results.filter(role=User.Role.RENTER)


class Renter(User):

    base_role = User.Role.RENTER
    renter_individual = RenterManager()

    class Meta:
        proxy = True


@receiver(post_save, sender=User)
@receiver(post_save, sender=Renter)
def create_renter_profile(sender, instance, created, **kwargs):
    if created and instance.role == 'RENTER':
        RenterProfile.objects.create(user=instance)


class RenterProfile(models.Model):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE
    )
    first_name = models.CharField(
        'Имя',
        max_length=100,
        blank=True,
        null=True,
    )
    last_name = models.CharField(
        'Фамилия',
        max_length=100,
        blank=True,
        null=True,
    )
    middle_name = models.CharField(
        'Отчество',
        max_length=100,
        blank=True,
        null=True,
    )
    job_title = models.CharField(
        verbose_name='Должность',
        max_length=50,
        blank=True,
        null=True,
    )
    contact_email = models.EmailField(
        verbose_name='Контактный email',
        unique=False,
        blank=True,
        null=True,
    )
    phone_number = models.CharField(
        verbose_name='Контактный телефон',
        validators=[phone_regex],
        max_length=12,
        blank=True,
        null=True,
    )
    adress = models.CharField(
        verbose_name='Адрес организации',
        max_length=300,
        blank=True,
        null=True,
    )
    inn = models.IntegerField(
        verbose_name='ИНН организации',
        blank=True,
        null=True,
    )
    organization_name = models.CharField(
        verbose_name='Название организации',
        max_length=300,
        blank=True,
        null=True,
    )
    organization_type = models.CharField(
        verbose_name='Юридический статус',
        max_length=50,
        choices=renter_type_choices,
        default='INDIVIDUAL'
    )

    test = models.IntegerField(null=True, blank=True)


class LandlordManager(BaseUserManager):
    def get_queryset(self, *args, **kwargs):
        results = super().get_queryset(*args, **kwargs)
        return results.filter(role=User.Role.LANDLORD)


class Landlord(User):

    base_role = User.Role.LANDLORD
    renter_individual = LandlordManager()

    class Meta:
        proxy = True


@receiver(post_save, sender=User)
@receiver(post_save, sender=Landlord)
def create_landlord_profile(sender, instance, created, **kwargs):
    if created and instance.role == 'LANDLORD':
        LandlordProfile.objects.create(user=instance)


class LandlordProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    job_title = models.CharField(
        blank=True,
        null=True,
        verbose_name='Должность',
        max_length=50,
    )
    first_name = models.CharField(
        'Имя',
        max_length=100,
        blank=True,
        null=True,
    )
    last_name = models.CharField(
        'Фамилия',
        max_length=100,
        blank=True,
        null=True,
    )
    middle_name = models.CharField(
        'Отчество',
        max_length=100,
        blank=True,
        null=True,
    )
    contact_email = models.EmailField(
        verbose_name='Контактный email',
        unique=False,
        blank=True,
        null=True,
    )
    phone_number = models.CharField(
        verbose_name='Контактный телефон',
        validators=[phone_regex],
        max_length=12,
        blank=True,
        null=True,
    )
    adress = models.CharField(
        verbose_name='Адрес организации',
        max_length=300,
        blank=True,
        null=True,
    )
    inn = models.IntegerField(
        verbose_name='ИНН организации',
        blank=True,
        null=True,
    )
    organization_name = models.CharField(
        verbose_name='Название организации',
        max_length=300,
        blank=True,
        null=True,
    )
    organization_type = models.CharField(
        verbose_name='Юридический статус',
        max_length=50,
        blank=True,
        choices=landlord_type_choices,
    )
    test = models.IntegerField(null=True, blank=True)