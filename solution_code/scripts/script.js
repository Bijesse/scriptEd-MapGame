'use strict';

(function ($) {
    var map;
    var worldCapitalsUrl = 'http://techslides.com/demos/country-capitals.json';
    window.players = [];
    var currentPlayerIndex = 0;
    var currentCity;
    var cityCapitalLatLng;
    // L.latLng(40.748817, -73.985428); // Test New York City coordinates

    var setCapitalCity = function () {
        currentCity = window.mapGame.API.randomCityCapital();
        cityCapitalLatLng = L.latLng(currentCity.CapitalLatitude, currentCity.CapitalLongitude);
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

            var currentPlayer = players[currentPlayerIndex];

            currentPlayer.guess = distance;

            players[currentPlayer] = currentPlayer;

            if (players.length - 1 == currentPlayerIndex) {
                currentPlayerIndex = 0;
                endGame();
                return null; // we are done
            }

            currentPlayerIndex++;
        });
    };

    var endGame = function () {
        // TODO determine and display winner
        // Dissable map clicks
        // and display the winner

    };

    var listenToStartForm = function () {
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
            setCapitalCity();
            $('.username').each(function (idx, player) {
                players.push({name: player.value});
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


    $(function () {
        createMap();
        listenToStartForm();
    });
})(jQuery);
