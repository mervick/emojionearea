define([
	'function/updateRecent',
	'function/getRecent',
	'function/supportsLocalStorage'
],
function(updateRecent, getRecent, supportsLocalStorage) {
	return function(self, emoji, app, editor) {
		if (supportsLocalStorage()) {
			var recent = getRecent();
			var emojis = recent.split("|");

			if (emojis.indexOf(emoji) === -1) {
				emojis.unshift(emoji);
			}

			if (emojis.length > 9) {
				emojis.pop();
			}

			localStorage.setItem("recent_emojis", emojis.join("|"));

			updateRecent(self, app, editor);
		}
	};
});