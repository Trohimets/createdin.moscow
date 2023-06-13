from django.conf import settings
from django.core.mail import send_mail
from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from django.db.models import Avg
from django.shortcuts import render
from rest_framework import filters, status
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from buildings.models import Building, Status, Bookings
from api.serializers import (CommentSerializer,
                             BuildingGetSerializer,
                             BuildingPostSerializer,
                             RenterProfileSerializer,
                             LandlordProfileSerializer,
                             StatusSerializer,
                             BookingsSerializer)
from comments.models import Comment
from users.models import (RenterProfile,
                          LandlordProfile, User)


class RenterProfileViewSet(viewsets.ModelViewSet):
    queryset = RenterProfile.objects.all()
    serializer_class = RenterProfileSerializer
    filter_backends = (filters.SearchFilter,)
    search_fields = ('user__id',) 


class LandlordProfileViewSet(viewsets.ModelViewSet):
    queryset = LandlordProfile.objects.all()
    serializer_class = LandlordProfileSerializer
    filter_backends = (filters.SearchFilter,)
    search_fields = ('user__id',) 


class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    filter_backends = (DjangoFilterBackend,)
    filterset_fields = ('building',)

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
                        

class BuildingViewSet(viewsets.ModelViewSet):
    queryset = Building.objects.annotate(
        rating=Avg('comments__score')).order_by('title')
    filter_backends = (DjangoFilterBackend,)
    filterset_fields = ('specialization', 'area_sum', 'area_rent',
                        'capacity', 'cost')
    
    def get_serializer_class(self):
        if self.request.method == 'GET':
            return BuildingGetSerializer
        return BuildingPostSerializer
    
    # def update(self, request, *args, **kwargs):
    #     send_mail(
    #         subject='Новое бронирование',
    #         message=f'{request.user} забронировал ваш объект '
    #                 f'{request.data["title"]},'
    #                 f'пожалуйста свяжитесь с ним по почте {request.user.email}'
    #                 f' для согласования условий бронирования.',
    #         from_email=f'{request.user.email}',
    #         recipient_list=[f'{request.data["email"]}', ],
    #         fail_silently=False
    #     )
    #     return super().update(request, *args, **kwargs)


class StatusViewSet(viewsets.ModelViewSet):
    queryset = Status.objects.all()
    serializer_class = StatusSerializer
    filter_backends = (DjangoFilterBackend,)
    filterset_fields = ('building',)


class BookingsViewSet(viewsets.ModelViewSet):
    queryset = Bookings.objects.all()
    serializer_class = BookingsSerializer
    filter_backends = (DjangoFilterBackend,)
    filterset_fields = ('building', 'renter', 'approve')

    def perform_create(self, serializer):
        serializer.save(renter=self.request.user)

    def create(self, request, *args, **kwargs):
        building = get_object_or_404(Building, id=request.data["building"]).title
        email = get_object_or_404(Building, id=request.data["building"]).owner.email
        send_mail(
            subject='Новое бронирование',
            message=f'Вам оставили заявку на бронирование вашего объекта {building} '
                    f'в следующие даты: с {request.data["check_in"]} по {request.data["check_out"]}. \n'
                    f'Арендатор оставил сообщение: {request.data["message"]} \n'
                    f'Для подтверждения бронирования Вам необходимо в личном кабинете утвердить заявку на бронирование. \n'
                    f'Для согласования дополнительных условий бронирования Вы можете связаться с арендатором по почте {request.user.email}',
            from_email=settings.EMAIL_HOST_USER,
            recipient_list=[email, ],
            fail_silently=False
        )
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        serializer = BookingsSerializer(instance=serializer.instance)
        return Response(serializer.data,
                        status=status.HTTP_201_CREATED)