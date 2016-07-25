define([
	'function/saveSelection',
	'function/pasteHtmlAtCaret',
	'function/shortnameTo',
	'function/getRecent'
],
function(saveSelection, pasteHtmlAtCaret, shortnameTo, getRecent) {
	return function(self, app, editor) {
		var clickFunction = function (emojibtn) {
			if (!app.is(".focused")) {
				editor.focus();
			}
			saveSelection(editor[0]);
			pasteHtmlAtCaret(shortnameTo(emojibtn.data("name"), self.emojiTemplate));
		}

		var category = self.picker.find(".emojionearea-category[name=recent]");
		var filter = self.picker.find(".emojionearea-filter-recent");
		
		if (category.length) {
			var emojis = getRecent();
			if (emojis !== "") {
				var items = shortnameTo(emojis,
										self.sprite ?
										'<i class="emojibtn" role="button" data-name="{name}"><i class="emojione-{uni}"></i></i>' :
										'<i class="emojibtn" role="button" data-name="{name}"><img class="emojioneemoji" src="{img}"/></i>',
										true).split('|').join('');

				category.find("i").remove();
				self.off("recentemojibtn.click");

				$(items).insertAfter(category.find("h1"));
				attach(self, category.find(".emojibtn"), { click: "recentemojibtn.click" });
				self.on("recentemojibtn.click", clickFunction);

				category.show();
				filter.show();
			} else {
				if (filter.hasClass("active")) {
					filter.removeClass("active").next().addClass("active");
				} 
				category.hide();
				filter.hide();
			}
		}
	};
});