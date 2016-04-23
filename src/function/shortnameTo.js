define([
    'var/emojione',
    'var/emojioneVersion',
    'function/getTemplate'
],
function(emojione, emojioneVersion, getTemplate) {
    return function(str, template) {
        return str.replace(/:?[\w_\-]+:?/g, function(shortname) {
            shortname = ":" + shortname.replace(/:$/,'').replace(/^:/,'') + ":";
            if (shortname in emojione.emojioneList) {
                return getTemplate(template, emojione.emojioneList[shortname][emojione.emojioneList[shortname].length-1], shortname);
            }
            return shortname;
        });
    };
});