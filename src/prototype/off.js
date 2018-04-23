define([
    'jquery',
    'var/eventStorage',
    'function/unbindEvent',
    'prototype/var/EmojioneArea'
],
function($, eventStorage, unbindEvent, EmojioneArea) {
    EmojioneArea.prototype.off = function(events, handler) {
        if (events) {
            var self = this;
            var id = self.id;
            $.each(events.toLowerCase().replace(/_/g, '.').split(' '), function(i, event) {
                if (eventStorage[id][event]) {
                    if (handler) {
                        $.each(eventStorage[id][event], function(j, fn) {
                            if (fn === handler) {
                                eventStorage[id][event].splice(j, 1);
                            }
                        });
                    } else {
                        eventStorage[id][event] = [];
                    }
                    unbindEvent(self, event);
                }
            });
        }
        return this;
    };
});