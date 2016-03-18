define([
    'jquery',
    'function/emojioneReady',
    'function/htmlFromText',
    'function/trigger',
    'prototype/var/EmojioneArea'
],
function($, emojioneReady, htmlFromText, trigger, EmojioneArea) {
    EmojioneArea.prototype.setText = function (str) {
        var self = this, args = arguments;
        emojioneReady(function () {
            self.editor.html(htmlFromText(str, self));
            self.content = self.editor.html();
            if (args.length === 1) {
                trigger(self, 'change', [self.editor]);
            }
        });
    }
});