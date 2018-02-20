define([
    'jquery',
    'var/slice',
    'function/trigger'
],
function($, slice, trigger) {
    return function(e) {
        var args = slice.call(arguments),
            target = $.isFunction(e.data.target) ? e.data.target.apply(self, [e.data.event].concat(args)) : e.data.target;
        if (target) {
            trigger(e.data.self, e.data.event, [target].concat(args));
        }
    }
});