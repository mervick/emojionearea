define([
    'jquery',
    'var/emojione',
    'var/emojioneSupportMode',
    'function/getTemplate'
],
function($, emojione, emojioneSupportMode, getTemplate) {
    return function(str, template, useSprite, replaces, clear) {
        return str.replace(/:?[\w_\-]+:?/g, function(shortname) {
            shortname = ":" + shortname.replace(/:$/,'').replace(/^:/,'') + ":";
            if ($.isArray(replaces)) {
                $.each(replaces, function(i, v) {
                    template = template.replace('{'+i+'}', v[useSprite ? 0 : 1])
                });
            }
            if (shortname in emojione.emojioneList) {
                var unicode = emojione.emojioneList[shortname];
                if (emojioneSupportMode > 3) unicode = unicode.unicode;
                return getTemplate(template, unicode[unicode.length-1], shortname);
            }
            return clear ? '' : shortname;
        });
    };
});