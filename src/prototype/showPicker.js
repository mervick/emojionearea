define([
    'prototype/var/EmojioneArea'
],
function(EmojioneArea) {
    EmojioneArea.prototype.showPicker = function () {
        var self = this,
            render_emojis = self.editor.data('render_emojis');
        if (render_emojis) render_emojis();
        if (self._sh_timer) {
            window.clearTimeout(self._sh_timer);
        }
        self.picker.removeClass("hidden");
        self._sh_timer =  window.setTimeout(function() {
            self.button.addClass("active");
        }, 50);
        return self;
    }
});