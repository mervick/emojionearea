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
    function detectVersion() {
        var version = emojione.cacheBustParam;
        if (!isObject(emojione['jsEscapeMap'])) return '1.5.2';
        if (version === "?v=1.2.4") return '2.0.0';
        if (version === "?v=2.0.1") return '2.1.0'; // v2.0.1 || v2.1.0
        if (version === "?v=2.1.1") return '2.1.1';
        if (version === "?v=2.1.2") return '2.1.2';
        if (version === "?v=2.1.3") return '2.1.3';
        if (version === "?v=2.1.4") return '2.1.4';
        return '2.1.4';
    }
    function getSupportMode(version) {
        switch (version) {
            case '1.5.2': return 0;
            case '2.0.0': return 1;
            case '2.1.0':
            case '2.1.1': return 2;
            case '2.1.2': return 3;
            case '2.1.3':
            case '2.1.4':
            default: return 4;
        }
    }
    if (!emojione || getSupportMode(detectVersion()) < 2) {
        $.getScript(cdn_base + emojioneVersion + "/lib/js/emojione.min.js", function () {
            emojione = window.emojione;
            emojioneVersion = detectVersion();
            emojioneSupportMode = getSupportMode(emojioneVersion);
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
        emojioneVersion = detectVersion();
        emojioneSupportMode = getSupportMode(emojioneVersion);
        cdn_base += emojioneVersion + "/assets";
    }

    emojioneReady(function() {
        emojione.imagePathPNG = cdn_base + "/png/";
        uniRegexp = new RegExp("<object[^>]*>.*?<\/object>|<span[^>]*>.*?<\/span>|<(?:object|embed|svg|img|div|span|p|a)[^>]*>|("+
            emojione.unicodeRegexp+")", "gi");
    });
});