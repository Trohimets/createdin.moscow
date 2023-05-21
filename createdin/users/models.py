from django.db import models
from django.contrib.auth.models import (AbstractBaseUser, BaseUserManager,
                                        PermissionsMixin)
from django.db.models.signals import post_save
from django.dispatch import receiver


class UserManager(BaseUserManager):
    """
    Custom user manager.
    Validate data and create new user entry.
    """
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
            role='ADMIN',
            is_staff=True,
            is_superuser=True,
            **kwargs
        )


class User(AbstractBaseUser, PermissionsMixin):
    class Role(models.TextChoices):
        ADMIN = 'ADMIN', 'Admin'
        RENTER_INDIVIDUAL = 'RENTER_INDIVIDUAL', 'Renter_individual'
        RENTER_LEGAL = 'RENTER_LEGAL', 'Renter_legal'
        LANDLORD = 'LANDLORD', 'Landlord'

    base_role = Role.ADMIN
    role = models.CharField(max_length=30, choices=Role.choices)
    email = models.EmailField('Email', unique=True, blank=False)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    REQUIRED_FIELDS = ('role',)
    USERNAME_FIELD = 'email'
    objects = UserManager()

    def save(self, *args, **kwargs):
        if not self.pk:
            self.role = self.base_role
            return super().save(*args, **kwargs)


class RenterIndividualManager(BaseUserManager):
    def get_queryset(self, *args, **kwargs):
        results = super().get_queryset(*args, **kwargs)
        return results.filter(role=User.Role.RENTER_INDIVIDUAL)


class RenterIndividual(User):

    base_role = User.Role.RENTER_INDIVIDUAL
    renter_individual = RenterIndividualManager()

    class Meta:
        proxy = True


@receiver(post_save, sender=RenterIndividual)
def create_renter_individual_profile(sender, instance, created, **kwargs):
    if created and instance.role == 'RENTER_INDIVIDUAL':
        RenterIndividualProfile.objects.create(user=instance)


class RenterIndividualProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    test = models.IntegerField(null=True, blank=True)


class RenterLegalManager(BaseUserManager):
    def get_queryset(self, *args, **kwargs):
        results = super().get_queryset(*args, **kwargs)
        return results.filter(role=User.Role.RENTER_LEGAL)


class RenterLegal(User):

    base_role = User.Role.RENTER_LEGAL
    renter_individual = RenterLegalManager()

    class Meta:
        proxy = True


@receiver(post_save, sender=RenterLegal)
def create_renter_legal_profile(sender, instance, created, **kwargs):
    if created and instance.role == 'RENTER_LEGAL':
        RenterLegalProfile.objects.create(user=instance)


class RenterLegalProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
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


@receiver(post_save, sender=Landlord)
def create_landlird_profile(sender, instance, created, **kwargs):
    if created and instance.role == 'LANDLORD':
        LandlordProfile.objects.create(user=instance)


class LandlordProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    test = models.IntegerField(null=True, blank=True)
