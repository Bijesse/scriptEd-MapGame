'use strict';

(function ($) {
    var map;
    var worldCapitalsUrl = 'http://techslides.com/demos/country-capitals.json';
    var playerGuesses = [];
    var players = [];
    var currentCity = window.mapGame.API.randomCityCapital()
    var cityCapitalLatLng = L.latLng(currentCity.CapitalLatitude, currentCity.CapitalLongitude);
    // L.latLng(40.748817, -73.985428); // Test New York City coordinates

    var initialize = function () {
      $('h3.current-capital').text('Find: ' + currentCity.CapitalName);
    };

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

            var distance = latLng.distanceTo(cityCapitalLatLng);

            playerGuesses.push(distance);

            if (playerGuesses.length == players.length) {
                endGame();
            }
        });
    };

    var endGame = function () {
        // TODO determine and display winner
        
        
    };

    var listenToStartGame = function () {
        $('#num-players').change(function (event) {
            var numPlayers = event.target.value;

            renderFormForPlayers(numPlayers);

            $('#start-game-btn').removeClass('hidden');
        });

        $('#start-game-btn').click(function () {
            var randomCity = randomCityWithCapital();
            
            players.forEach(function (player) {

            });
        });
    };

    var renderFormForPlayers = function (playersCount) {
        // clear out the form first
        var $formContainer = $('#player-names');
        $formContainer.html('');

        // variable of the template
        var $template = $('#name-field-template').html();

        // render template for each player
        for (var i=0; i<playersCount; i++) {
            console.log($template);
            $formContainer.append($template);
        }
    };


    $(function () {
        initialize();
        createMap();
        listenToMapClicks();
        listenToStartGame();
    });
})(jQuery);
