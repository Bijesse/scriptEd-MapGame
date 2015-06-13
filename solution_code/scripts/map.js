'use strict';
  var worldCapitalsUrl = 'http://techslides.com/demos/country-capitals.json';
  // create a map instance
  var map = L.map('map').setView([51.505, -0.09], 2);

  // render the map
  L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      minZoom: 2,
      maxZoom: 2
  }).addTo(map);

  map.on('click', function (event) {
      var latLng = event.latlng;

      console.log(latLng);
  })