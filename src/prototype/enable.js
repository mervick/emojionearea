define([
    'jquery',
    'function/emojioneReady',
    'prototype/var/EmojioneArea'
],
function($, emojioneReady, EmojioneArea) {
    EmojioneArea.prototype.enable = function () {
        var self = this;
        emojioneReady(function () {
            self.editor.prop('contenteditable', true);
            self.button.show();
        });
        return self;
    }
});