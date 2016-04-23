define([
    'jquery',
    'var/default_options',
    'var/emojioneSupportMode'
],
function($, default_options, emojioneSupportMode) {
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
        options = $.extend({}, default_options, options);

        if (emojioneSupportMode > 0) {
            options.filters.people.emoji = options.filters.people.emoji
                .replace(",writing_hand,", ",");
            options.filters.travel.emoji = options.filters.travel.emoji
                .replace(",contruction_site,", ",construction_site,");
            options.filters.objects_symbols.emoji = options.filters.objects_symbols.emoji
                .replace(",keycap_ten,", ",ten,")
                .replace(",cross_heavy,", ",cross,");
        }

        return options;
    }
});