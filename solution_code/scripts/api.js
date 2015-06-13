(function($) {
  /**
   * Holds the country data
   * @type {Array}
   */
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
  var randomCityWithCapital = function randomCityWithCapital() {

    var random = Math.round(Math.random() * countryCapitals.length);

    return countryCapitals[random];
  };

  /**
   * Returns distance between capital and click coordinates
   * @return {Number} distance
   */
  var calculateDistance = function calculateDistance(LatLng, otherLatLng) {
    return map.distanceTo(LatLng, otherLatLng)
  };

  window.randomCityWithCapital = randomCityWithCapital;
  window.calculateDistance = calculateDistance;

}(jQuery));
