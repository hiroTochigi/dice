from django.forms import ModelForm
from .models import Choice, ChoiceSet
from django import forms

# Create the form class.
class ChoiceSetForm(ModelForm):
    class Meta:
        model = ChoiceSet
        fields = ['name', 'choice_num']


class ChoiceForm(ModelForm):
    class Meta:
        model = Choice
        fields = ['choice']
    