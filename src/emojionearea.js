define([
    'jquery',
    'prototype/var/EmojioneArea',
    'prototype/on',
    'prototype/off',
    'prototype/setText',
    'prototype/getText'
],
function($, EmojioneArea) {
    $.fn.emojioneArea = function(options) {
        return this.each(function() {
            if (!!this.emojioneArea) return this.emojioneArea;
            return this.emojioneArea = new EmojioneArea($(this), options);
        });
    };
});