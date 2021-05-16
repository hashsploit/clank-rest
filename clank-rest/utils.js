let logger = require('./logger.js');

module.exports = function() {

	if (!String.prototype.format) {
		String.prototype.format = function() {
			let args = arguments;
			return this.replace(/{(\d+)}/g, function(match, number) {
				return typeof args[number] != 'undefined' ? args[number] : match;
			});
		}
	}

	if (!String.prototype.capitalize) {
		String.prototype.capitalize = function() {
			return this.charAt(0).toUpperCase() + this.slice(1);
		}
	}
}
