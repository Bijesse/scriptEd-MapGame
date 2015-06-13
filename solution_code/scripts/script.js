'use strict';

(function ($) {
    var map;
    var worldCapitalsUrl = 'http://techslides.com/demos/country-capitals.json';
    var playerGuesses = [];
    var players = [];
    
    // var cityCapitalLatLng = L.latLng(40.748817, -73.985428);

    var createMap = function () {
        map = L.map('map').setView([51.505, -0.09], 2);

        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
            minZoom: 2,
            maxZoom: 2
        }).addTo(map);
    };

    var listenToMapClicks = function () {

        map.on('click', function (event) {
            var latLng = event.latlng;

            console.log(cityCapitalLatLng.distanceTo(latLng));
            var distance = latLng.distanceTo(cityCapitalLatLng);

            playerGuesses.push();

            if (playerGuesses.length == players.length) {
                endGame();
            }
        });
    };

    var endGame = function () {
        // TODO determine and display winner
        
        
    };

    var listenToStart = function () {
        $('#start-game-btn').click(function () {
            var randomCity = randomCityWithCapital();
            
            players.forEach(function (player) {

            });
        });
    };

    

    $(function () {
        createMap();
        listenToMapClicks();
        listenToStart();
    });
})(jQuery);
