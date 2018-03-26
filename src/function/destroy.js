define([
    'jquery',
    'function/isObject'
], function($, isObject) {
    return function (self) {
        self.off("@filter.click");
        self.off("@tone.click");
        self.off("@button.click");
        self.off("@!paste");
        self.off("@emojibtn.click");
        self.off("@!resize @keyup @emojibtn.click");
        self.off("@!mousedown");
        self.off("@change");
        self.off("@focus");
        self.off("@blur");

        if (self.search) {
            self.off("@search.focus");
            self.off("@search.keypress");
            self.off("@search.blur");
        }

        if (isObject(self.events) && !$.isEmptyObject(self.events)) {
            $.each(self.events, function(event) {
                self.off(event.replace(/_/g, '.'));
            });
        }

        if (self.inline) {
            self.off("@keydown");
        }

        if (self.autocomplete) {
            self.editor.textcomplete('destroy');
        }

        self.app.remove();

        self.app = self.editor = self.search = self.scrollArea = null;
    };
});