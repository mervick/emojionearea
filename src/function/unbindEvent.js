define([
    'jquery',
    'var/bindedEvents',
    'function/bindEventHandler',
],
function($, bindedEvents, bindEventHandler) {
    return function(self, event) {
        event = event.replace(/^@/, '');
        var id = self.id;
        if (bindedEvents[id][event]) {
            $.each(bindedEvents[id][event], function(i, ev) {
                // ev[0] = element
                // ev[1] = event
                // ev[2] = target
                $.each($.isArray(ev[0]) ? ev[0] : [ev[0]], function(i, el) {
                    $(el).off(ev[1], bindEventHandler);
                });
            });
            bindedEvents[id][event] = null;
        }
    }
});