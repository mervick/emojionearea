define([
    'jquery',
    'function/emojioneReady',
    'prototype/var/EmojioneArea'
],
function($, emojioneReady, EmojioneArea) {
    EmojioneArea.prototype.disable = function () {
        var self = this;
        emojioneReady(function () {
            self.editor.prop('contenteditable', false);
			self.hidePicker();
            self.button.hide();
        });
        return self;
    }
});