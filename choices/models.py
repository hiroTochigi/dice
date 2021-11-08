from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MaxValueValidator, MinValueValidator


class ChoiceSet(models.Model):

    name = models.CharField(max_length=200)
    choice_num = models.IntegerField(
        default=20,
        validators=[MaxValueValidator(20), MinValueValidator(2)]
    )
    create_date = models.DateField('date created', auto_now=True)
    update_date = models.DateField('date updated', auto_now_add=True)

    def __str__(self):
        return self.name

class Choice(models.Model):

    choice = models.CharField(max_length=200)
    number = models.IntegerField(default=0)
    belong = models.ForeignKey(ChoiceSet, on_delete=models.CASCADE)

    def __str__(self):
        return self.choice


