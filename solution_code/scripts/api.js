(function($) {

  var countryCapitals = (countryCapitals || []);


  $.getJSON(worldCapitalsUrl, function(data) {
    countryCapitals = data;
  });

  var randomCity = function randomCity() {

    var random = Math.round(Math.random() * countryCapitals.length);

    return countryCapitals[random];
  };

  window.randomCity = randomCity;

}(jQuery));
