'use strict';

(function ($) {
    var map;
    var worldCapitalsUrl = 'http://techslides.com/demos/country-capitals.json';
    var players = [];
    var currentPlayerIndex = 0;
    var currentCity;
    var cityCapitalLatLng;
    var markersLayer = L.layerGroup();
    // L.latLng(40.748817, -73.985428); // Test New York City coordinates

    var setCapitalCity = function setCapitalCity() {
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

    var handleMapClick = function handleMapClick(event) {
      var latLng = event.latlng;

      renderMarker(latLng, false);

      var distance = latLng.distanceTo(cityCapitalLatLng);

      var currentPlayer = players[currentPlayerIndex];

      currentPlayer.guess = distance;

      players[currentPlayer] = currentPlayer;

      if (players.length - 1 === currentPlayerIndex) {
          map.off('click', handleMapClick);
          endGame();
          return null; // we are done
      }

      currentPlayerIndex++;

    };

    var listenToMapClicks = function () {

        map.on('click', handleMapClick);
    };

    var sortPlayers = function sortPlayers() {
      players.sort(function(a, b) {
        return a.guess < b.guess;
      });
    };

    var displayPlayers = function displayPlayers() {
      var ul = document.createElement('ul');
      ul.className = 'list-group';

      players.forEach(function p(player, index) {
        var li = document.createElement('li');
        li.appendChild(document.createTextNode((index + 1) + ' ' + player.name));
        li.className = 'list-group-item';
        ul.appendChild(li);
      });

      $('div.player-rankings').addClass('show').html(ul);
    };

    var endGame = function () {
        currentPlayerIndex = 0;
        sortPlayers();
        displayPlayers();
        //
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
                player.readonly = true;
                players.push({name: player.value});
            });
            $('#start-game-btn').addClass('hidden');
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
        createMap();
        listenToStartForm();
        listenToMapClicks();
    });
})(jQuery);
