from django.shortcuts import render, redirect
from django.http import Http404
from django.conf import settings
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import AuthenticationForm
from .models import Person, Bill, Organization, Action, Event
from haystack.forms import FacetedSearchForm
from datetime import date, timedelta
from itertools import groupby

class CouncilmaticSearchForm(FacetedSearchForm):
    
    def __init__(self, *args, **kwargs):
        self.load_all = True

        super(CouncilmaticSearchForm, self).__init__(*args, **kwargs)

    def no_query_found(self):
        return self.searchqueryset.all()

def city_context(request):
    return {
        'SITE_META': getattr(settings, 'SITE_META', None),
        'CITY_COUNCIL_NAME': getattr(settings, 'CITY_COUNCIL_NAME', None),
        'CITY_NAME': getattr(settings, 'CITY_NAME', None),
        'CITY_NAME_SHORT': getattr(settings, 'CITY_NAME_SHORT', None),
        'SEARCH_PLACEHOLDER_TEXT': getattr(settings,'SEARCH_PLACEHOLDER_TEXT', None),
        'LEGISLATION_TYPE_DESCRIPTIONS': getattr(settings,'LEGISLATION_TYPE_DESCRIPTIONS', None),
        'LEGISTAR_URL': getattr(settings,'LEGISTAR_URL', None),
    }

def index(request):
    some_time_ago = date.today() + timedelta(days=-100)
    recent_legislation = Bill.objects.exclude(last_action_date=None)\
                                     .filter(last_action_date__gt=some_time_ago)\
                                     .order_by('-last_action_date').all()

    recently_passed = [l for l in recent_legislation \
                           if l.inferred_status == 'Passed' \
                               and l.bill_type == 'Introduction'][:3]

    context = {
        'recent_legislation': recent_legislation,
        'recently_passed': recently_passed,
        'next_council_meeting': Event.next_city_council_meeting(),
        'upcoming_committee_meetings': list(Event.upcoming_committee_meetings()),
    }

    return render(request, 'core/index.html', context)

def about(request):

    return render(request, 'councilmatic_core/about.html')

def not_found(request):
    return render(request, 'councilmatic_core/404.html')

def council_members(request):
    city_council = Organization.objects.filter(ocd_id=settings.OCD_CITY_COUNCIL_ID).first()
    context = {
        'city_council': city_council
    }

    return render(request, 'councilmatic_core/council_members.html', context)

def bill_detail(request, slug):

    legislation = Bill.objects.filter(slug=slug).first()
    
    if not legislation:
        raise Http404("Legislation does not exist")

    actions = legislation.actions.all().order_by('-order')

    context={
        'legislation': legislation,
        'actions': actions
    }

    return render(request, 'councilmatic_core/legislation.html', context)

def committees(request):

    committees = Organization.committees().filter(name__startswith='Committee')
    committees = [c for c in committees if c.memberships.all()]

    subcommittees = Organization.committees().filter(name__startswith='Subcommittee')
    subcommittees = [c for c in subcommittees if c.memberships.all()]

    taskforces = Organization.committees().filter(name__startswith='Task Force')
    taskforces = [c for c in taskforces if c.memberships.all()]

    context={
        'committees': committees,
        'subcommittees': subcommittees,
        'taskforces': taskforces,
    }

    return render(request, 'councilmatic_core/committees.html', context)

def committee_detail(request, slug):

    committee = Organization.objects.filter(slug=slug).first()

    if not committee:
        raise Http404("Committee does not exist")

    chairs = committee.memberships.filter(role="CHAIRPERSON")
    memberships = committee.memberships.filter(role="Committee Member")
    
    context = {
        'committee': committee,
        'chairs': chairs,
        'memberships': memberships,
        'committee_description': None,
    }
    
    if getattr(settings, 'COMMITTEE_DESCRIPTIONS'):
        context['committee_description'] = settings.COMMITTEE_DESCRIPTIONS.get(committee.slug)

    return render(request, 'councilmatic_core/committee.html', context)

def person(request, slug):

    person = Person.objects.filter(slug=slug).first()

    if not person:
        raise Http404("Person does not exist")

    sponsorships = person.primary_sponsorships.order_by('-bill__last_action_date')

    chairs = person.memberships.filter(role="CHAIRPERSON")
    memberships = person.memberships.filter(role="Committee Member")

    context = {
        'person': person,
        'chairs': chairs,
        'memberships': memberships,
        'sponsorships': sponsorships,
        'sponsored_legislation': [s.bill for s in sponsorships][:10]
    }

    return render(request, 'councilmatic_core/person.html', context)

def events(request, year=None, month=None):

    newest_year = Event.objects.all().order_by('-start_time').first().start_time.year
    oldest_year = Event.objects.all().order_by('start_time').first().start_time.year
    year_range = list(reversed(range(oldest_year, newest_year+1)))
    month_options = [
        ['January', 1],
        ['February',2],
        ['March',3],
        ['April',4],
        ['May',5],
        ['June',6],
        ['July',7],
        ['August',8],
        ['September',9],
        ['October',10],
        ['November',11],
        ['December',12]
    ]

    if not year or not month:
        year = date.today().year
        month = date.today().month

        upcoming_dates = Event.objects.filter(start_time__gt=date.today()).datetimes('start_time', 'day').order_by('start_time')[:50]
        upcoming_events = []
        for d in upcoming_dates:
            if not (upcoming_events and d == upcoming_events[-1][0]):
                events_on_day = Event.objects.filter(start_time__year=d.year).filter(start_time__month=d.month).filter(start_time__day=d.day).order_by('start_time').all()
                upcoming_events.append([d, events_on_day])

        context = {
            'show_upcoming': True,
            'this_month': month,
            'this_year': year,
            'upcoming_events': upcoming_events,
            'year_range': year_range,
            'month_options': month_options,
        }

        return render(request, 'councilmatic_core/events.html', context)
    else:
        year = int(year)
        month = int(month)

        month_dates = Event.objects.filter(start_time__year=year).filter(start_time__month=month).datetimes('start_time', 'day').order_by('start_time')
        month_events = []
        for d in month_dates:
            if not (month_events and d == month_events[-1][0]):
                events_on_day = Event.objects.filter(start_time__year=d.year).filter(start_time__month=d.month).filter(start_time__day=d.day).order_by('start_time').all()
                month_events.append([d, events_on_day])

        context = {
            'show_upcoming': False,
            'this_month': month,
            'this_year': year,
            'first_date': month_dates[0] if month_dates else None,
            'month_events': month_events,
            'year_range': year_range,
            'month_options': month_options,
        }

        return render(request, 'councilmatic_core/events.html', context)

def event_detail(request, slug):

    event = Event.objects.filter(slug=slug).first()

    participants = [ Organization.objects.filter(name=p.entity_name).first() for p in event.participants.all()]
    context = {
        'event': event,
        'participants': participants
    }

    return render(request, 'councilmatic_core/event.html', context)

def user_login(request):
    if request.method == 'POST':
        form = AuthenticationForm(data=request.POST)
        if form.is_valid():
            user = form.get_user()
            if user is not None:
                login(request, user)
                return redirect('index')
    else:
        form = AuthenticationForm()

    return render(request, 'core_user/login.html', {'form': form})

def user_logout(request):
    logout(request)
    return redirect('index')
