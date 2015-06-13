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
   * Returns a randomCapital
   * @return {String} a Country capital
   */
  var randomCityCapital = function randomCityCapital() {
  };
  /**
   * Find a country with the lat long that was passed in
   * @param  {Array} latLong The lat long that was passed
   * @return {Object}
   */
  var findCapital = function(latLong) {
  };

  // Expose the api methods
  window.mapGame.API = {
    randomCityCapital: randomCityCapital,
    findCapital: findCapital
  };

}(jQuery));
