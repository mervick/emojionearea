define([
    'jquery',
    'var/possibleEvents',
    'var/bindedEvents',
    'function/bindEventHandler'
],
function($, possibleEvents, bindedEvents, bindEventHandler) {
    return function(self, event) {
        event = event.replace(/^@/, '');
        var id = self.id;
        if (possibleEvents[id][event]) {
            $.each(possibleEvents[id][event], function(i, ev) {
                // ev[0] = element
                // ev[1] = event
                // ev[2] = target
                $.each($.isArray(ev[0]) ? ev[0] : [ev[0]], function(i, el) {
                    $(el).on(ev[1], {self: self, event: event, target: ev[2]}, bindEventHandler);
                });
            });
            bindedEvents[id][event] = possibleEvents[id][event];
            possibleEvents[id][event] = null;
        }
    }
});