from rest_framework import validators
from rest_framework.generics import get_object_or_404
from rest_framework.relations import SlugRelatedField
from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from comments.models import Comment
from buildings.models import Building, BuildingImage, Status
from users.models import (Renter, RenterProfile, Landlord, LandlordProfile)
from buildings.models import Building, BuildingImage, Bookings



class RenterProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = RenterProfile
        fields = ('__all__')


class LandlordProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = LandlordProfile
        fields = ('__all__')


class CommentSerializer(serializers.ModelSerializer):
    author = serializers.SlugRelatedField(
        read_only=True, slug_field='email'
    )

    class Meta:
        model = Comment
        fields = (
            'author',
            'text',
            'pub_date',
            'score',
            'building'
        )


class BuildingImageModelSerializer(ModelSerializer):
    class Meta:
        model = BuildingImage
        fields = ('image',)


class StatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Status
        fields = (
            'stat',
            'reject_text',
            'building',
        )


class BuildingGetSerializer(ModelSerializer):
    building_images = BuildingImageModelSerializer(
        many=True
    )
    rating = serializers.FloatField()
    building_status = StatusSerializer(many=True)

    class Meta:
        model = Building
        fields = (
            'id',
            'owner',
            'title',
            'specialization',
            'desc',
            'address',
            'coordinates',
            'operating_hours',
            'site',
            'area_sum',
            'area_rent',
            'features',
            'additional_information',
            'building_images',
            'capacity',
            'cost',
            'booking',
            'rating',
            'building_status',
            'entity',
            'phone',
            'email',
            'inn',
        )


class BuildingPostSerializer(ModelSerializer):
    building_images = BuildingImageModelSerializer(
        source='buildingimage_set',
        many=True, read_only=True
    )
    building_status = StatusSerializer(
        read_only=True,
        source='status_set'
    )

    
    class Meta:
        model = Building
        fields = (
            'id',
            'owner',
            'title',
            'specialization',
            'desc',
            'address',
            'coordinates',
            'operating_hours',
            'site',
            'area_sum',
            'area_rent',
            'features',
            'additional_information',
            'building_images',
            'capacity',
            'cost',
            'booking',
            'entity',
            'phone',
            'email',
            'inn',
            'building_status'
        )

    def create(self, validated_data):
        images_data = self.context.get('view').request.FILES
        building = Building.objects.create(**validated_data)
        for image_data in images_data.values():
            BuildingImage.objects.create(building=building, image=image_data)
        return building
    

class BookingsSerializer(serializers.ModelSerializer):
    renter = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Bookings
        fields = (
            'id',
            'renter',
            'building',
            'check_in',
            'check_out',
            'message',
            'approve',
            'status'
        )