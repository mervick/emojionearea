define([
    'jquery',
    'prototype/var/EmojioneArea',
    'var/getDefaultOptions',
    'prototype/on',
    'prototype/off',
    'prototype/trigger',
    'prototype/setFocus',
    'prototype/setText',
    'prototype/getText',
    'prototype/showPicker',
    'prototype/hidePicker'
],
function($, EmojioneArea, getDefaultOptions) {
    $.fn.emojioneArea = function(options) {
        return this.each(function() {
            if (!!this.emojioneArea) return this.emojioneArea;
            $.data(this, 'emojioneArea', this.emojioneArea = new EmojioneArea($(this), options));
            return this.emojioneArea;
        });
    };

    $.fn.emojioneArea.defaults = getDefaultOptions();
});