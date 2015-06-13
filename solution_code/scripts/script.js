'use strict';

(function ($) {
    var map;
    var worldCapitalsUrl = 'http://techslides.com/demos/country-capitals.json';
    var playerGuesses = [];
    var players = [];
    var currentCity = window.mapGame.API.randomCityCapital()
    var cityCapitalLatLng = L.latLng(currentCity.CapitalLatitude, currentCity.CapitalLongitude);
    var markersLayer = L.layerGroup();
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

            renderMarker(latLng, false);

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
        listenToPlayersChange();
        startListeningForPlayerNames();
        listenToStartBtn();
    };

    var listenToPlayersChange = function () {
        $('#num-players').change(function (event) {
            var numPlayers = event.target.value;

            renderFormForPlayers(numPlayers);
        });

        $('#player-names').on('keyup', '.username', function () {
            console.log('adf');
            if (isPlayersFieldsValid()) {
                $('#start-game-btn').removeClass('hidden');
            }
        });
    }

    var renderFormForPlayers = function (playersCount) {
        // clear out the form first
        var $formContainer = $('#player-names');
        $formContainer.html('');

        // variable of the template
        var $template = $('#name-field-template').html();

        // render template for each player
        for (var i=0; i<playersCount; i++) {
            $formContainer.append($template);
        }
    };

    var isPlayersFieldsValid = function () {
        var isValid = true;

        $('.username').each(function () {
            if ($(this).val() === '') {
                isValid = false
            };
        });

        return isValid;
    };

    var listenToStartBtn = function () {
        $('#start-game-btn').click(function () {
            var randomCity = randomCityWithCapital();
            players.forEach(function (player) {

            });
            listenToMapClicks();
        });
    };



    var startListeningForPlayerNames = function () {
        $('#player-names').on('keyup', '.username', function () {
            if (isPlayersFieldsValid()) {
                $('#start-game-btn').removeClass('hidden');
            }
        });
    }

    var isPlayersFieldsValid = function () {
        var isValid = true;

        $('.username').each(function () {
            if ($(this).val() === '') {
                isValid = false
            };
        });

        return isValid;
    };

    var renderMarker = function (coords, isAnswer) {
        var coordsArray = [coords.lat, coords.lng];

        if (isAnswer) {
            var marker = L.marker(coordsArray).addTo(map);

            markersLayer.addLayer(marker).addTo(map);
        } else {
            var circle = L.circle(coordsArray, 100000, {
                color: 'red',
                fillColor: '#f03',
            });

            markersLayer.addLayer(circle).addTo(map);
        }

        // use this to clear the markers
        // markersLayer.clearLayers();

    };


    $(function () {
        initialize();
        createMap();
        listenToStartGame();
        listenToMapClicks();
    });
})(jQuery);
