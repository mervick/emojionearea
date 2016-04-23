define([
    'jquery',
    'var/default_options'
],
function($, default_options) {
    return function(options) {
        if (options['filters']) {
            var filters = default_options.filters;
            $.each(options['filters'], function(filter, data) {
                if (typeof data !== 'object' || $.isEmptyObject(data)) {
                    delete filters[filter];
                    return;
                }
                $.each(data, function(key, val) {
                    filters[filter][key] = val;
                });
            });
            options['filters'] = filters;
        }
        return $.extend({}, default_options, options);
    }
});