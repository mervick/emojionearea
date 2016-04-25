define([
    'prototype/var/EmojioneArea'
],
function(EmojioneArea) {
    EmojioneArea.prototype.hidePicker = function () {
        var self = this;
        if (self._sh_timer) {
            window.clearTimeout(self._sh_timer);
        }
        self.button.removeClass("active");
        self._sh_timer =  window.setTimeout(function() {
            self.picker.addClass("hidden");
        }, 500);
    }
});