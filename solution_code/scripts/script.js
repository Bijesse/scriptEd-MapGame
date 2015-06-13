'use strict';

(function ($) {
    var map;
    var worldCapitalsUrl = 'http://techslides.com/demos/country-capitals.json';

    var createMap = function () {
        map = L.map('map').setView([51.505, -0.09], 2);

        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
            minZoom: 2,
            maxZoom: 2
        }).addTo(map);
    };

    var listenToMapClicks = function () {

    };

    $(function () {
        createMap();
        
        map.on('click', function (event) {
            var latLng = event.latlng;
            console.log(latLng);
        });
    });
})(jQuery);
