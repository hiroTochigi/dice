from django.contrib import admin
from .models import Choice, ChoiceSet

admin.site.register(ChoiceSet)
admin.site.register(Choice)