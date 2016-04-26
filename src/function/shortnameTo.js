define([
    'jquery',
    'var/emojione',
    'var/emojioneVersion',
    'function/getTemplate'
],
function($, emojione, emojioneVersion, getTemplate) {
    return function(str, template, useSprite, replaces) {
        return str.replace(/:?[\w_\-]+:?/g, function(shortname) {
            shortname = ":" + shortname.replace(/:$/,'').replace(/^:/,'') + ":";
            if ($.isArray(replaces)) {
                $.each(replaces, function(i, v) {
                    template = template.replace('{'+i+'}', v[useSprite ? 0 : 1])
                });
            }
            if (shortname in emojione.emojioneList) {
                return getTemplate(template, emojione.emojioneList[shortname][emojione.emojioneList[shortname].length-1], shortname);
            }
            return shortname;
        });
    };
});