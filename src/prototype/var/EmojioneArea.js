define([
    'var/unique',
    'var/eventStorage',
    'var/possibleEvents',
    'var/bindedEvents',
    'function/emojioneReady',
    'function/init',
    'function/loadEmojione'
],
function(unique, eventStorage, possibleEvents, bindedEvents, emojioneReady, init, loadEmojione) {
    return function(element, options) {
        var self = this;
        loadEmojione(options);
        eventStorage[self.id = ++unique] = {};
        possibleEvents[self.id] = {};
        bindedEvents[self.id] = {};
        emojioneReady(function() {
            init(self, element, options);
        });
    };
});