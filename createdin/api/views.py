from rest_framework import viewsets
from api.serializers import (RenterIndividualProfileSerializer,
                             RenterLegalProfileSerializer,
                             LandlordProfileSerializer)
from users.models import (RenterIndividualProfile,
                          RenterLegalProfile,
                          LandlordProfile)


class RenterIndividualProfileViewSet(viewsets.ModelViewSet):
    queryset = RenterIndividualProfile.objects.all()
    serializer_class = RenterIndividualProfileSerializer


class RenterLegalProfileViewSet(viewsets.ModelViewSet):
    queryset = RenterLegalProfile.objects.all()
    serializer_class = RenterLegalProfileSerializer


class LandlordProfileViewSet(viewsets.ModelViewSet):
    queryset = LandlordProfile.objects.all()
    serializer_class = LandlordProfileSerializer
