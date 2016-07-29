define([
	'function/supportsLocalStorage'
], function(supportsLocalStorage) {
	return function () {
		if (supportsLocalStorage()) {
			return localStorage.getItem("recent_emojis") || "";
		}
		return "";
	}
});