/* File: dive.js
 * Authors:
 *  Originally written by Jeremia Kimelman (jbkimelmanATgmailDOTcom)
 *  Edited an objectified by Jason Charney (jrcharneyATgmailDOTcom)
 * Requrements:
 * You need to have jQuery preloaded.
 * You need to have Leaflet.js preloaded.
 */

/* TODO: Scraope from OSM's Nomanatim instead of Foursquare's OAUTH. (Tell the bartender "I'll stop when I'm done!") */

/* Class: Dive */

// dive = new Dive('http://metro-stl-routes-venues-api.herokuapp.com/routes/');


function Dive(api){
 // this.x = x; // where x is an argument
 //this.map = L.map('map');		// Create a new Leaflet map. // TODO: watch this line.
 this.route_stop_coords = [];
 this.markers = null;
 this.api = api;	// query_near_route_api = 'http://metro-stl-routes-venues-api.herokuapp.com/routes/',	// I changed the name of this variable.
}

Dive.prototype.showCoords = function(data){
 return [ data.coords['latitude'], data.coords['longitude'] ].toString();
}

// Uncaught TypeError: undefined is not a function, but what is our data arguement?
Dive.prototype.setMapToCurrentLocation = function(data){
 this.position  = [ data.coords['latitude'], data.coords['longitude'] ];
 console.log('latitude: ' + this.position[0] + ' longitude: ' + this.position[1]);
 this.map = L.map('map').setView(this.position, 13);
 L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
 }).addTo(this.map);
}

/* This function looks almost ready */
Dive.prototype.handleJsonResponse = function(stops) {
 for (stop in stops) {
  var stop_location = stops[stop]['stop_location'];
  this.route_stop_coords.push([stop_location['lat'], stop_location['long']]);
  //console.log()	// TODO: Something was supposed to go here, but because there isn't anything here, this line has been removed.
  stop_venues = stops[stop]['venues'];
  for(var i=0; i < stop_venues.length; i++) {
   // TODO: Just for the heck of it, put latitude and longitude in an array called position
   var position = [ stop_venues[i].location.lat, stop_venues[i].location.lng ];
   L.marker(position).addTo(this.map)
    .bindPopup(stop_venues[i].name)
    .openPopup();
  }
 }

 var polyline = L.polyline(this.route_stop_coords, {color: 'red'}).addTo(this.map);
 this.map.fitBounds(polyline.getBounds());
}


// TODO: Sort the routes by route number
// TODO: Why do I have the feeling that older routes are listed? (Try to eliminate them!)
// TODO: Should I add an arugment to this function to use 'http://www.corsproxy.com/gtfs-api.herokuapp.com/api/routes/metro-st-louis'?
// TODO: This function needs TWO ARGUMENTS:
//	The element that data will be inserted into, and the source where the data comes from!
// dive.loadRoutsIntoSelect('select#bus-routes','http://www.corsproxy.com/gtfs-api.herokuapp.com/api/routes/metro-st-louis');
Dive.prototype.loadRoutesIntoSelect = function(selectElem,source) {
 var routes = [];
 $.getJSON(
  source,
  function(data) {
   for (route in data) {
    route = data[route];
    routes.push(route);
   }
   // TODO: A sort function might be needed here.
   $.each(routes, function(route) {
    var route_option;
    route = routes[route];
    bus_route_text = route['route_short_name'] + ' - ' + route['route_long_name'];
    route_option = $('<option></option>').attr('value',route['route_id']).text(bus_route_text);
    $(selectElem).append(route_option);
   });
 });
}

/* This function looks ready */
Dive.prototype.clearMap = function() {
 this.route_stop_coords = [];
 for(i in this.map._layers) {
  if(this.map._layers[i]._url != "http://{s}.tile.osm.org/{z}/{x}/{y}.png") {
   try {
    this.map.removeLayer(this.map._layers[i]);
   }
   catch(e) {
    console.log("Problem with " + e + this.map._layers[i]);
   }
  }
 }
}

// TODO: This function needs a new name
// TODO: This function needs to get data from a input['text'] field, not a select!
// TODO: SEO-ify the input field
Dive.prototype.findThingsWithSelection = function() {
 var route = $('select#bus_routes').val(),
 thing = $('input#things').val();	// Why don't we call 'thing' 'query' instead?

 //this.clearMap();
 //url = query_near_route_api + route + '?query=' + thing;
 var url = this.api + route + '?query=' + thing;
 console.log(url);
 $.getJSON(url, this.handleJsonResponse);		// TODO: Can I use 'this' in a function call?  So far it looks like a yes.
}

// I think this part should stay in the HTML document
// TODO: What if the user doesn't want to use their current location?
// TODO: Find a new Routes API
$(document).ready(function(){
 dive = new Dive('http://metro-stl-routes-venues-api.herokuapp.com/routes/');
 navigator.geolocation.getCurrentPosition(dive.setMapToCurrentLocation);	// The browser will ask if you want to share your location?, Add a function for error later.
 $('button#find_things').click(dive.findThingsWithSelection);
 // This is fine, don't mess with it!
 dive.loadRoutesIntoSelect('select#bus_routes','http://www.corsproxy.com/gtfs-api.herokuapp.com/api/routes/metro-st-louis');

});
