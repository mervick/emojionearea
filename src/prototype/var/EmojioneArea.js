define([
    'var/unique',
    'var/eventStorage',
    'var/possibleEvents',
    'function/emojioneReady',
    'function/init',
    'block/loadEmojione'
],
function(unique, eventStorage, possibleEvents, emojioneReady, init) {
    return function(element, options) {
        var self = this;
        eventStorage[self.id = ++unique] = {};
        possibleEvents[self.id] = {};
        emojioneReady(function() {
            init(self, element, options);
        });
    };
});