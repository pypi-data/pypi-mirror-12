#!/usr/bin/python

from pytvmaze.exceptions import *
from pytvmaze import endpoints

try:
    # Python 3 and later
    from urllib.request import urlopen
    from urllib.parse import quote as url_quote, unquote as url_unquote
except ImportError:
    # Python 2
    from urllib2 import urlopen
    from urllib import quote as url_quote, unquote as url_unquote
import json
from datetime import datetime


class Show(object):
    def __init__(self, data):
        self.data = data
        self.__dict__.update(data)
        self.maze_id = self.data.get('id')
        self.episodes = list()
        self.seasons = dict()
        self.populate()

    def __repr__(self):
        maze_id=self.maze_id
        name=self.name
        try:
            year=str(self.data.get('premiered')[:-6])
        except:
            year=None
        try:
            network=str(self.network.get('name'))
        except:
            network=None

        return '<Show(maze_id={id},name={name},year={year},network={network})>'.format(
            id=maze_id, name=name, year=year, network=network
        )

    def __str__(self):
        return self.name

    def __iter__(self):
        return iter(self.seasons.values())

    def __len__(self):
        return len(self.seasons)

    def __getitem__(self, item):
        return self.seasons[item]

    def populate(self):
        for episode in self.data.get('_embedded').get('episodes'):
            self.episodes.append(Episode(episode))
        for episode in self.episodes:
            season_num = int(episode.season_number)
            if season_num not in self.seasons:
                self.seasons[season_num] = Season(self, season_num)
            self.seasons[season_num].episodes[episode.episode_number] = episode


class Season(object):
    def __init__(self, show, season_number):
        self.show = show
        self.season_number = season_number
        self.episodes = dict()

    def __repr__(self):
        return '<Season(showname={name},season_number={number})>'.format(
            name=self.show.name,
            number=str(self.season_number).zfill(2)
        )

    def __str__(self):
        return self.show.name + ' S' + str(self.season_number).zfill(2)

    def __iter__(self):
        return iter(self.episodes.values())

    def __len__(self):
        return len(self.episodes)

    def __getitem__(self, item):
        return self.episodes[item]


class Episode(object):
    def __init__(self, data):
        self.data = data
        self.title = self.data.get('name')
        self.airdate = self.data.get('airdate')
        self.url = self.data.get('url')
        self.season_number = self.data.get('season')
        self.episode_number = self.data.get('number')
        self.image = self.data.get('image')
        self.airstamp = self.data.get('airstamp')
        self.runtime = self.data.get('runtime')
        self.maze_id = self.data.get('id')

    def __repr__(self):
        return '<Episode(season={season},episode_number={number})>'.format(
            season=str(self.season_number).zfill(2),
            number=str(self.episode_number).zfill(2)
        )

    def __str__(self):
        season = 'S' + str(self.season_number).zfill(2)
        episode = 'E' + str(self.episode_number).zfill(2)
        return season + episode + ' ' + self.title


class Person():
    def __init__(self, data):
        self.data = data
        self.__dict__.update(data)
        self.__dict__.update(data.get('person'))

    def __repr__(self):
        return '<Person(name={name},maze_id={id})>'.format(
            name=self.name,
            id=self.id
        )

    def __str__(self):
        return self.name


# Query TV Maze endpoints
def query_endpoint(url):
    try:
        data = urlopen(url).read()
    except:
        return None

    try:
        results = json.loads(data)
    except:
        results = json.loads(data.decode('utf8'))

    if results:
        return results
    else:
        return None


# Get Show object
def get_show(maze_id=None, tvdb_id=None, tvrage_id=None, show_name=None,
             show_year=None, show_network=None, show_language=None,
             show_country=None):
    '''
    Get Show object directly via id or indirectly via name + optional qualifiers

    If only a show_name is given, the show with the highest score using the
    tvmaze algorithm will be returned.
    If you provide extra qualifiers such as network or language they will be
    used for a more specific match, if one exists.
    '''
    if maze_id:
        return Show(show_main_info(maze_id, embed='episodes'))
    elif tvdb_id:
        return Show(show_main_info(lookup_tvdb(tvdb_id)['id'],
                                   embed='episodes'))
    elif tvrage_id:
        return Show(show_main_info(lookup_tvrage(tvrage_id)['id'],
                                   embed='episodes'))
    elif show_name:
        show = get_show_by_search(show_name, show_year, show_network,
                                  show_language, show_country)
        return show


# Search with user-defined qualifiers, used by get_show() method
def get_show_by_search(show_name, show_year, show_network, show_language, show_country):
    shows = get_show_list(show_name)
    if shows:
        qualifiers = [
            q.lower() for q in [show_year, show_network, show_language, show_country]
            if q
        ]
        if qualifiers:
            for show in shows:
                try:
                    premiered = show.premiered[:-6].lower()
                except:
                    year = ''
                try:
                    country = show.network['country']['code'].lower()
                except:
                    country = ''
                try:
                    network = show.network['name'].lower()
                except:
                    network = ''
                try:
                    language = show.language.lower()
                except:
                    language = ''
                attributes = [premiered, country, network, language]
                show.matched_qualifiers = len(set(qualifiers) & set(attributes))
            # Return show with most matched qualifiers
            return max(shows, key=lambda k: k.matched_qualifiers)
        else:
            # Return show with highest tvmaze search score
            return shows[0]


# Return list of Show objects
def get_show_list(show_name):
    '''
    Return list of Show objects from the TVMaze "Show Search" endpoint

    List will be ordered by tvmaze score and should mimic the results you see
    by doing a show search on the website.
    '''
    shows = show_search(show_name)
    if shows:
        return [
            Show(show_main_info(show['show']['id'], embed='episodes'))
            for show in shows
            ]
    else:
        raise ShowsNotFound(show_name + ' did not generate show list')


# Get list of Person objects
def get_people(name):
    '''
    Return list of Person objects from the TVMaze "People Search" endpoint
    '''
    people = people_search(name)
    if people:
        return [Person(person) for person in people]
    else:
        raise PersonNotFound('Couldn\'t find person: ' + name)


# TV Maze Endpoints
def show_search(show):
    show = url_quote(show)
    url = endpoints.show_search.format(show)
    q = query_endpoint(url)
    if q:
        return q
    else:
        raise ShowNotFound(show + ' not found')


def show_single_search(show, embed=None):
    show = url_quote(show)
    if embed:
        url = endpoints.show_single_search.format(show) + '&embed=' + embed
    else:
        url = endpoints.show_single_search.format(show)
    q = query_endpoint(url)
    if q:
        return q
    else:
        raise ShowNotFound(show + ' not found')


def lookup_tvrage(tvrage_id):
    url = endpoints.lookup_tvrage.format(tvrage_id)
    q = query_endpoint(url)
    if q:
        return q
    else:
        raise IDNotFound('TVRage id ' + str(tvrage_id) + ' not found')


def lookup_tvdb(tvdb_id):
    url = endpoints.lookup_tvdb.format(tvdb_id)
    q = query_endpoint(url)
    if q:
        return q
    else:
        raise IDNotFound('TVdb id ' + str(tvdb_id) + ' not found')


def get_schedule(country='US', date=str(datetime.today().date())):
    url = endpoints.get_schedule.format(country, date)
    q = query_endpoint(url)
    if q:
        return q
    else:
        raise ScheduleNotFound('Schedule for country ' + country + ' not found')


# ALL known future episodes, several MB large, cached for 24 hours
def get_full_schedule():
    url = endpoints.get_full_schedule
    q = query_endpoint(url)
    if q:
        return q
    else:
        raise GeneralError('Something went wrong, www.tvmaze.com may be down')


def show_main_info(maze_id, embed=None):
    if embed:
        url = endpoints.show_main_info.format(maze_id) + '?embed=' + embed
    else:
        url = endpoints.show_main_info.format(maze_id)
    q = query_endpoint(url)
    if q:
        return q
    else:
        raise IDNotFound('Maze id ' + str(maze_id) + ' not found')


def episode_list(maze_id, specials=None):
    if specials:
        url = endpoints.episode_list.format(maze_id) + '&specials=1'
    else:
        url = endpoints.episode_list.format(maze_id)
    q = query_endpoint(url)
    if q:
        return q
    else:
        raise IDNotFound('Maze id ' + str(maze_id) + ' not found')


def episode_by_number(maze_id, season_number, episode_number):
    url = endpoints.episode_by_number.format(maze_id,
                                             season_number,
                                             episode_number)
    q = query_endpoint(url)
    if q:
        return q
    else:
        raise EpisodeNotFound(
            'Couldn\'t find season ' + str(season_number) + ' episode ' + str(episode_number) + ' for TVMaze ID ' + maze_id)


def episodes_by_date(maze_id, airdate):
    url = endpoints.episodes_by_date.format(maze_id, airdate)
    q = query_endpoint(url)
    if q:
        return q
    else:
        raise NoEpisodesForAirdate('Couldn\'t find an episode airing ' + airdate + ' for TVMaze ID' + str(maze_id))


def show_cast(maze_id):
    url = endpoints.show_cast.format(maze_id)
    q = query_endpoint(url)
    if q:
        return q
    else:
        raise CastNotFound('Couldn\'nt find show cast for TVMaze ID' + str(maze_id))


def show_index(page=1):
    url = endpoints.show_index.format(page)
    q = query_endpoint(url)
    if q:
        return q
    else:
        raise ShowIndexError('Error getting show_index, www.tvmaze.com may be down')


def people_search(person):
    person = url_quote(person)
    url = endpoints.people_search.format(person)
    q = query_endpoint(url)
    if q:
        return q
    else:
        raise PersonNotFound('Couldn\'t find person: ' + person)


def person_main_info(person_id, embed=None):
    if embed:
        url = endpoints.person_main_info.format(person_id) + '?embed=' + embed
    else:
        url = endpoints.person_main_info.format(person_id)
    q = query_endpoint(url)
    if q:
        return q
    else:
        raise PersonNotFound('Couldn\'t find person: ' + person_id)


def person_cast_credits(person_id, embed=None):
    if embed:
        url = endpoints.person_cast_credits.format(person_id) + '?embed=' + embed
    else:
        url = endpoints.person_cast_credits.format(person_id)
    q = query_endpoint(url)
    if q:
        return q
    else:
        raise CreditsNotFound('Couldn\'t find cast credits for person ID: ' + str(person_id))


def person_crew_credits(person_id, embed=None):
    if embed:
        url = endpoints.person_crew_credits.format(person_id) + '?embed=' + embed
    else:
        url = endpoints.person_crew_credits.format(person_id)
    q = query_endpoint(url)
    if q:
        return q
    else:
        raise CreditsNotFound('Couldn\'t find crew credits for person ID: ' + str(person_id))


def show_updates():
    url = endpoints.show_updates
    q = query_endpoint(url)
    if q:
        return q
    else:
        raise ShowIndexError('Error getting show_index, www.tvmaze.com may be down')


def show_akas(maze_id):
    url = endpoints.show_akas.format(maze_id)
    q = query_endpoint(url)
    if q:
        return q
    else:
        raise AKASNotFound('Couldn\'t find AKA\'s for TVMaze ID: ' + str(maze_id))
