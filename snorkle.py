#!/usr/bin/python
# File: snorkle.py (formerly script.py)
# Date: 28 June 2014
# Author: Jeremia Kimelman and Jason Charney
# Requrements: json, bottle
# TODO: Replace the Foursquare stuff with OSM's Notatim


import json
from os import environ

from bottle import get, request, response, run
import requests

# TODO: These next two lines need to be replaced.
stops_from_route_id_url = 'http://gtfs-api.herokuapp.com/api/stops/metro-st-louis/%s'
fsq_url = 'https://api-foursquare-com-gwqynjms41pa.runscope.net/v2/venues/search' #'https://api.foursquare.com/v2/venues/search'

def get_stops(stop_url):
  r = requests.get(stop_url)
  if r.status_code == 200:
    print len(r.json())
    return r.json()
  else:
    return False

def locations_near_stop(stop_geo_coords, category_id):
  url = fsq_url
  params = {'radius': 500,
    'oauth_token': environ.get('FOURSQUARE_KEY'),	# TODO: This has got to go.
    'v': '20140531',					# TODO: What's this line for?
    'categoryId': category_id,
    'll': '%s, %s' % (stop_geo_coords[1], stop_geo_coords[0])}

  r = requests.get(url, params=params)

  if r.status_code == 200:
    return r.json()['response'].get('venues')
  else:
    return False

@get('/routes/<route_id>')
def return_bars_for_route_id(route_id):			# TODO: Change the name of this function
  response.headers['Access-Control-Allow-Origin'] = '*'
  response.headers['Access-Control-Allow-Methods'] = 'PUT, GET, POST, DELETE, OPTIONS'
  response.headers['Access-Control-Allow-Headers'] = 'Origin, Accept, Content-Type, X-Requested-With, X-CSRF-Token'

  # TODO: This next line needs to be replaced so that more than just these items can be looked up.
  fs_category_map = {'bar': '4bf58dd8d48988d116941735','bars': '4bf58dd8d48988d116941735','drugstore': '4bf58dd8d48988d10f951735', 'pharmacy': '4bf58dd8d48988d10f951735'}

  # TODO: This next line too!
  fs_query = request.params.get('query', 'pharmacy')
  stops = get_stops(stops_from_route_id_url % route_id)
  route_venues = []

  print len(stops)

  for stop in stops:
    if type(stop) != type(None):
      print 'Making request for %s' % stop['stop_id']
      stop_venues = locations_near_stop(stop['loc'], fs_category_map[fs_query])
      stop_with_venue = { 'id': stop['stop_id'],
        'stop_location':
          {'lat': stop['loc'][1],'long': stop['loc'][0]},
          'venues': stop_venues
        }
      route_venues.append(stop_with_venue)

  return json.dumps(route_venues)

if __name__ == '__main__':
  run(host='0.0.0.0', port=environ.get('PORT', 5000), reloader=True)
