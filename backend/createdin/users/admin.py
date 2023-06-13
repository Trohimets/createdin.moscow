from django.contrib import admin
from users.models import (Landlord, LandlordProfile, Renter,
                          RenterProfile, User)


class LandlordAdmin(admin.ModelAdmin):
    # list_display = '__all__'
    empty_value_display = '-пусто-'



admin.site.register(Landlord, LandlordAdmin)
admin.site.register(LandlordProfile)
admin.site.register(Renter)
admin.site.register(RenterProfile)
admin.site.register(User)

# Register your models here.
