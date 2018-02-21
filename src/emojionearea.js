define([
    'jquery',
    'prototype/var/EmojioneArea',
    'function/getDefaultOptions',
    'function/destroy',
    'function/htmlFromText',
    'var/blankImg',
    'var/emojioneSupportMode',
    'function/loadEmojione',
    'prototype/on',
    'prototype/off',
    'prototype/trigger',
    'prototype/setFocus',
    'prototype/setText',
    'prototype/getText',
    'prototype/showPicker',
    'prototype/hidePicker',
    'prototype/enable',
    'prototype/disable'
],
function($, EmojioneArea, getDefaultOptions, destroy, htmlFromText, blankImg, emojioneSupportMode, loadEmojione) {
    // Polyfill for IE - https://github.com/mervick/emojionearea/issues/172
    if (!String.prototype.includes) {
      String.prototype.includes = function(search, start) {
        'use strict';
        if (typeof start !== 'number') {
          start = 0;
        }
        
        if (start + search.length > this.length) {
          return false;
        } else {
          return this.indexOf(search, start) !== -1;
        }
      };
    }

    $.fn.emojioneArea = function(options) {
        if (typeof options === 'string') {
            if (options === 'destroy') {
                return this.each(function() {
                    destroy(this.emojioneArea);
                });
            }
        } else {
            return this.each(function() {
                if (!!this.emojioneArea) return this.emojioneArea;
                $.data(this, 'emojioneArea', this.emojioneArea = new EmojioneArea($(this), options));
                return this.emojioneArea;
            });
        }
    };

    $.fn.emojioneArea.defaults = getDefaultOptions();

    $.fn.emojioneAreaText = function(options) {
        var self = this, pseudoSelf = {
            shortnames: (options && typeof options.shortnames !== 'undefined' ? options.shortnames : true),
            emojiTemplate: '<img alt="{alt}" class="emojione' + (options && options.sprite && emojioneSupportMode < 3 ? '-{uni}" src="' + blankImg : 'emoji" src="{img}') + '"/>'
        };

        loadEmojione(options);
        emojioneReady(function() {
            self.each(function() {
                var $this = $(this);
                if (!$this.hasClass('emojionearea-text')) {
                    $this.addClass('emojionearea-text').html(htmlFromText(($this.is('TEXTAREA') || $this.is('INPUT') ? $this.val() : $this.text()), pseudoSelf));
                }
                return $this;
            });
        });

        return this;
    };
});
