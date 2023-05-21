from django.contrib import admin
from users.models import (Landlord, LandlordProfile, RenterIndividual,
                          RenterIndividualProfile, RenterLegal,
                          RenterLegalProfile, User)


class LandlordAdmin(admin.ModelAdmin):
    # list_display = '__all__'
    empty_value_display = '-пусто-'



admin.site.register(Landlord, LandlordAdmin)
admin.site.register(LandlordProfile)
admin.site.register(RenterIndividual)
admin.site.register(RenterIndividualProfile)
admin.site.register(RenterLegal)
admin.site.register(RenterLegalProfile)
admin.site.register(User)

# Register your models here.
