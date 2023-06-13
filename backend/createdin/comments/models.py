from django.db import models
from users.models import Renter
from buildings.models import Building
from django.core.validators import MinValueValidator, MaxValueValidator


class Comment(models.Model):
    author = models.ForeignKey(
        Renter,
        on_delete=models.CASCADE,
        related_name='comments',
        verbose_name='Автор'
    )
    building = models.ForeignKey(
        Building,
        on_delete=models.CASCADE,
        related_name='comments',
        verbose_name='Объект'
    )
    text = models.TextField(verbose_name='Текст отзыва',
                            help_text='Введите текст отзыва')
    pub_date = models.DateTimeField(
        'Дата публикации отзыва',
        auto_now_add=True,
        db_index=True,
        help_text='Дата публикации отзыва'
    )
    score = models.IntegerField(
        'Оценка',
        validators=[
            MinValueValidator(1),
            MaxValueValidator(10)
        ],
        help_text='Введдите оценку'
    )

    class Meta:
        verbose_name = 'Отзыв'
        verbose_name_plural = 'Отзывы'
        ordering = ['-pub_date']
        constraints = [
            models.UniqueConstraint(
                fields=['author', 'building'],
                name='only_one_comment'
            )
        ]


    def __str__(self):
        return self.author.email
