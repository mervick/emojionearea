define([
    'function/saveSelection',
    'function/pasteHtmlAtCaret',
    'function/shortnameTo',
    'function/getRecent',
    'function/attach'
],
function(saveSelection, pasteHtmlAtCaret, shortnameTo, getRecent, attach) {
    return function(self) {
        var emojis = getRecent();
        if (!self.recent || self.recent !== emojis) {
            if (emojis.length) {
                var scrollTop = self.scrollArea.scrollTop(),
                    height = self.recentCategory.is(":visible") ? self.recentCategory.height() : 0

                var items = shortnameTo(emojis, self.emojiBtnTemplate, true).split('|').join('');
                self.recentCategory.children(".emojibtn").remove();
                $(items).insertAfter(self.recentCategory.children("h1"));


                self.recentCategory.children(".emojibtn").on("click", function() {
                    self.trigger("emojibtn.click", $(this));
                });
                // attach(self, , { click: "emojibtn.click" });

                self.recentCategory.show();
                self.recentFilter.show();

                var height2 = self.recentCategory.height();

                if (height !== height2) {
                    self.scrollArea.scrollTop(scrollTop + height2 - height);
                }
            } else {
                if (self.recentFilter.hasClass("active")) {
                    self.recentFilter.removeClass("active").next().addClass("active");
                }
                self.recentCategory.hide();
                self.recentFilter.hide();
            }
            self.recent = emojis;
        }
    };
});