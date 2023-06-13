from django.contrib import admin

from buildings.models import Building, BuildingImage, Status, Bookings


class BuildingImageAdmin(admin.StackedInline):
    model = BuildingImage


class BuildingAdmin(admin.ModelAdmin):
    inlines = [BuildingImageAdmin]


admin.site.register(Building, BuildingAdmin)


class StatusAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'stat',
        'reject_text',
        'building',
    )

class BookingsAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'renter',
        'building',
        'check_in',
        'check_out',
        'message',
        'approve'
    )

admin.site.register(Status, StatusAdmin)
admin.site.register(Bookings, BookingsAdmin)