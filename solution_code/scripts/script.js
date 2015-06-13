'use strict';

(function ($) {
    var map;
    var worldCapitalsUrl = 'http://techslides.com/demos/country-capitals.json';
    var playerGuesses = [];
    var players = [];

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
            var distance = calculateDistance(latLng, cityCapitalLatLng);

            playerGuesses.push();

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


    $(function () {
        createMap();
        listenToStartGame();
    });
})(jQuery);
