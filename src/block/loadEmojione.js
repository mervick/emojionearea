define([
    'var/emojione',
    'var/uniRegexp',
    'var/emojioneVersion',
    'var/readyCallbacks',
    'var/emojioneSupportMode',
    'function/emojioneReady',
    'function/isObject'
],
function(emojione, uniRegexp, emojioneVersion, readyCallbacks, emojioneSupportMode, emojioneReady, isObject) {
    var cdn_base = "https://cdnjs.cloudflare.com/ajax/libs/emojione/";
    function detectSupportMode() {
        return isObject(emojione['jsEscapeMap']) ? emojione.cacheBustParam === "?v=1.2.4" ? 2 : 1 : 0;
    }
    if (!emojione || detectSupportMode() === 0) {
        $.getScript(cdn_base + emojioneVersion + "/lib/js/emojione.min.js", function () {
            emojione = window.emojione;
            emojioneSupportMode = detectSupportMode();
            cdn_base += emojioneVersion + "/assets";
            var sprite = cdn_base +"/sprites/emojione.sprites.css";
            if (document.createStyleSheet) {
                document.createStyleSheet(sprite);
            } else {
                $('<link/>', {rel: 'stylesheet', href: sprite}).appendTo('head');
            }
            while (readyCallbacks.length) {
                readyCallbacks.shift().call();
            }
        });
    } else {
        emojioneSupportMode = detectSupportMode();
        cdn_base += (emojioneSupportMode > 1 ? '2.0.0' : '2.1.1') + "/assets";
    }

    emojioneReady(function() {
        emojione.imagePathPNG = cdn_base + "/png/";
        uniRegexp = new RegExp("<object[^>]*>.*?<\/object>|<span[^>]*>.*?<\/span>|<(?:object|embed|svg|img|div|span|p|a)[^>]*>|("+
            emojione.unicodeRegexp+")", "gi");
    });
});