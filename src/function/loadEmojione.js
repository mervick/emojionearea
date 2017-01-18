define([
    'var/emojione',
    'var/uniRegexp',
    'var/emojioneVersion',
    'var/readyCallbacks',
    'var/emojioneSupportMode',
    'var/cdn',
    'function/emojioneReady',
    'function/isObject'
],
function(emojione, uniRegexp, emojioneVersion, readyCallbacks, emojioneSupportMode, cdn, emojioneReady, isObject) {
    return function(options) {

        function detectVersion(emojione) {
            var version = emojione.cacheBustParam;
            if (!isObject(emojione['jsEscapeMap'])) return '1.5.2';
            if (version === "?v=1.2.4") return '2.0.0';
            if (version === "?v=2.0.1") return '2.1.0'; // v2.0.1 || v2.1.0
            if (version === "?v=2.1.1") return '2.1.1';
            if (version === "?v=2.1.2") return '2.1.2';
            if (version === "?v=2.1.3") return '2.1.3';
            if (version === "?v=2.1.4") return '2.1.4';
            if (version === "?v=2.2.7") return '2.2.7';
            return '2.2.7';
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
                case '2.2.7':
                default: return 4;
            }
        }
        options = getOptions(options);

        if (!cdn.isLoading) {
            if (!emojione || getSupportMode(detectVersion(emojione)) < 2) {
                cdn.isLoading = true;
                $.getScript(cdn.defaultBase + emojioneVersion + "/lib/js/emojione.min.js", function () {
                    emojione = window.emojione;
                    emojioneVersion = detectVersion(emojione);
                    emojioneSupportMode = getSupportMode(emojioneVersion);
                    cdn.base = cdn.defaultBase + emojioneVersion + "/assets";
                    if (options.sprite) {
                        var sprite = cdn.base + "/sprites/emojione.sprites.css";
                        if (document.createStyleSheet) {
                            document.createStyleSheet(sprite);
                        } else {
                            $('<link/>', {rel: 'stylesheet', href: sprite}).appendTo('head');
                        }
                    }
                    while (readyCallbacks.length) {
                        readyCallbacks.shift().call();
                    }
                    cdn.isLoading = false;
                });
            } else {
                emojioneVersion = detectVersion(emojione);
                emojioneSupportMode = getSupportMode(emojioneVersion);
                cdn.base = cdn.defaultBase + emojioneVersion + "/assets";
            }
        }

        emojioneReady(function() {
            if (options.useInternalCDN) {
                emojione.imagePathPNG = cdn.base + "/png/";
                emojione.imagePathSVG = cdn.base + "/svg/";
                emojione.imagePathSVGSprites = cdn.base + "/sprites/emojione.sprites.svg";
                emojione.imageType = options.imageType;
            }

            uniRegexp = new RegExp("<object[^>]*>.*?<\/object>|<span[^>]*>.*?<\/span>|<(?:object|embed|svg|img|div|span|p|a)[^>]*>|(" + emojione.unicodeRegexp + ")", "gi");
        });
    };
});
