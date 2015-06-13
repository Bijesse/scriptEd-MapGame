(function($) {

  /**
   * The mapGame Name space
   * @param  {Object}
   */
  window.mapGame = (window.mapGame || {});

  /**
   * Holds the country data
   * @type {Array}
   */
  var countryCapitals = (window.countryCapitals || []);

  /**
   * Assign countryCapitals with the returned data
   * @param  {Array} data A list of countries
   */
  var processData = function processData(data) {
    countryCapitals = data;
  };

  /**
   * Returns a randomCapital
   * @return {String} a Country capital
   */
  var randomCityWithCapital = function randomCityWithCapital() {

    var random = Math.round(Math.random() * countryCapitals.length);

    return countryCapitals[random];
  };
  /**
   * Find a country with the lat long that was passed in
   * @param  {Array} latLong The lat long that was passed
   * @return {Object}
   */
  var findCapital = function(latLong) {
    var lat = latLong[0];
    var long = latLong[1];

    return countryCapitals.filter(function filterCapitals(capital) {
      return capital.CapitalLatitude === lat && capital.CapitalLongitude === long;
    })[0];
  };

  /**
   * Returns distance between capital and click coordinates
   * @return {Number} distance
   */
  var calculateDistance = function calculateDistance(LatLng, otherLatLng) {
    return map.distanceTo(LatLng, otherLatLng)
  };

  // Expose the api methods
  window.mapGame.API = {
    randomCityWithCapital: randomCityWithCapital,
    findCapital: findCapital,
    calculateDistance: calculateDistance
  };

}(jQuery));
