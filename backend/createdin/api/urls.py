from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from api.views import (CommentViewSet, BuildingViewSet,
                       RenterProfileViewSet,
                       LandlordProfileViewSet,
                       StatusViewSet,
                       BookingsViewSet)


admin.site.site_header = "Добро пожаловать!"
admin.site.site_title = "Администрирование сайта"
admin.site.index_title = "Администрирование агрегатора площадок и услуг креативных индустрий Москвы"

app_name = 'api'

router_v1 = DefaultRouter()
router_v1.register(
    'renter_profile',
    RenterProfileViewSet,
    basename='renter_profile'
)
router_v1.register(
    'landlord_profile',
    LandlordProfileViewSet,
    basename='renter_individual_profile'
)
router_v1.register('comments', CommentViewSet, basename='comments')
router_v1.register('buildings', BuildingViewSet, basename='buildings')
router_v1.register('statuses', StatusViewSet, basename='statuses')
router_v1.register('bookings', BookingsViewSet, basename='bookings')

urlpatterns = [
    path('v1/', include(router_v1.urls))
]
