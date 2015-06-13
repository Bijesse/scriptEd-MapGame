(function($) {

  var countryCapitals = (countryCapitals || []);

  /**
   * Assign countryCapitals with the returned data
   * @param  {Array} data A list of countries
   */
  var processData = function processData(data) {
    countryCapitals = data;
  };

  // Call the api to get all counties with their capital
  $.getJSON('https://restcountries.eu/rest/v1/all', processData);

  /**
   * Returns a randomCapital
   * @return {String} a Country capital
   */
  var randomCapital = function randomCapital() {

    var random = Math.round(Math.random() * countryCapitals.length);

    return countryCapitals[random].capital;
  };

  /**
   * Returns distance between capital and click coordinates
   * @return {Number} distance
   */
  var calculateDistance = function calculateDistance(LatLng, otherLatLng) {
    map.distanceTo(LatLng, otherLatLng)
  
  };

  window.randomCapital = randomCapital;

}(jQuery));
