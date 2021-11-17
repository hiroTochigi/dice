import json

from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.http import JsonResponse
from django.http import QueryDict
from django.urls import reverse

from .forms import ChoiceSetForm, ChoiceForm
from .models import ChoiceSet, Choice

def choiceSet(request):

    if request.method == 'POST':
        form = ChoiceSetForm(request.POST)
        if form.is_valid():
            choiceSetId = form.save().id
            request.session['choiceSetId'] = choiceSetId
            return HttpResponseRedirect('/choices/')
    else:
        form = ChoiceSetForm()
    return render(request, 'choices/form.html', {'form': form})

def get_new_post(new_post, val):

    ordinary_dict = {'csrfmiddlewaretoken': new_post.get('csrfmiddlewaretoken'), 'choice': val }
    query_dict = QueryDict('', mutable=True)
    query_dict.update(ordinary_dict)
    return query_dict

def managePage(request):

    choice_set_list = ChoiceSet.objects.all()
    data = { 
        'choice_edit_url': request.build_absolute_uri(reverse('editChoice')),
        'choice_set_edit_url': request.build_absolute_uri(reverse('editChoiceSet')),
        'choice_set_delete_url': request.build_absolute_uri(reverse('deleteChoiceSet')),
        'choice_set_list' : choice_set_list,
        'choice_dict' : { 
                choice_set.id : 
                sorted(list(Choice.objects.filter(belong=choice_set)), key=lambda el:el.id) 
                for choice_set in choice_set_list 
            }
    }
    
    return render(request, 'choices/manage_main.html', data)

def mainPage(request):

    choice_set_list = ChoiceSet.objects.all()
    choice_list = Choice.objects.all()
    data = {
            'choice_set_list': choice_set_list,
            'choice_list': sorted(choice_list, key=lambda el:el.id)
        }
    return render(request, 'choices/main.html', data)

def choices(request):

    choiceSetId = request.session.get('choiceSetId')
    choice_set = ChoiceSet.objects.get(pk=choiceSetId)
    if request.method == 'POST':
        post_list = [ get_new_post(request.POST, val) for val in request.POST.getlist('choice') ]
        form_list = [ ChoiceForm(post) for post in post_list ]
        for num, form in enumerate(form_list):
            if form.is_valid():
                f = form.save(commit=False)
                f.belong = choice_set
                f.number = num + 1
                f.save()
        return HttpResponseRedirect('/')
    else:
        form = ChoiceForm()
    return render(
        request,
        'choices/form.html',
        {
            'form': form,
            'choice_num':[ id for id in  range(choice_set.choice_num) ] 
        }
    )

def editChoice(request):

    if request.method == 'POST':
        request_data = json.loads(request.body)
        choice_id = request_data['choice_id']
        choice = Choice.objects.get(pk=choice_id)
        choice.choice = request_data['input']
        choice.save()
        return JsonResponse({'new_val':choice.choice})
    return JsonResponse({'method':'get'})

def editChoiceSet(request):

    if request.method == 'POST':
        request_data = json.loads(request.body)
        choice_id = request_data['choice_set_id']
        choiceset = ChoiceSet.objects.get(pk=choice_id)
        choiceset.name = request_data['input']
        choiceset.save()
        return JsonResponse({'new_val':choiceset.name})
    return JsonResponse({'method':'get'})

def deleteChoiceSet(request):

    if request.method == 'POST':
        request_data = json.loads(request.body)
        choice_set_id = request_data['choice_set_id']
        choiceset = ChoiceSet.objects.get(pk=choice_set_id)
        choiceset_name = choiceset.name
        choiceset.delete()
        return JsonResponse({'choice_set_name':choiceset_name})
    return JsonResponse({'method':'get'})