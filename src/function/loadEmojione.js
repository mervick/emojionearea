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
            var version;
            if (emojione.cacheBustParam) {
                version = emojione.cacheBustParam;
                if (!isObject(emojione['jsEscapeMap'])) return '1.5.2';
                if (version === "?v=1.2.4") return '2.0.0';
                if (version === "?v=2.0.1") return '2.1.0'; // v2.0.1 || v2.1.0
                if (version === "?v=2.1.1") return '2.1.1';
                if (version === "?v=2.1.2") return '2.1.2';
                if (version === "?v=2.1.3") return '2.1.3';
                if (version === "?v=2.1.4") return '2.1.4';
                if (version === "?v=2.2.7") return '2.2.7';
                return '2.2.7';
            } else {
                return emojione.emojiVersion;
            }

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
                case '2.2.7': return 4;
                case '3.0.1':
                case '3.0.2':
                case '3.0.3':
                case '3.0': return 5;
                case '3.1.0':
                case '3.1.1':
                case '3.1.2':
                case '3.1':
                default: return 6;
            }
        }

        options = getOptions(options);
        if (!cdn.isLoading) {
            if (!emojione || getSupportMode(detectVersion(emojione)) < 2) {
                cdn.isLoading = true;
                var emojioneJsCdnUrlBase;
                if (getSupportMode(emojioneVersion) > 5) {
                    emojioneJsCdnUrlBase = cdn.defaultBase3 + "npm/emojione@" + emojioneVersion;
                } else if (getSupportMode(emojioneVersion) > 4) {
                    emojioneJsCdnUrlBase = cdn.defaultBase3 + "emojione/" + emojioneVersion;
                } else {
                    emojioneJsCdnUrlBase = cdn.defaultBase + "/" + emojioneVersion;
                }
                $.getScript(emojioneJsCdnUrlBase + "/lib/js/emojione.min.js", function () {
                    emojione = window.emojione;
                    emojioneVersion = detectVersion(emojione);
                    emojioneSupportMode = getSupportMode(emojioneVersion);
                    var sprite;
                    if (emojioneSupportMode > 4) {
                        cdn.base = cdn.defaultBase3 + "emojione/assets/" + emojioneVersion;
                        sprite = cdn.base + "/sprites/emojione-sprite-" + emojione.emojiSize + ".css";
                    } else {
                        cdn.base = cdn.defaultBase + emojioneVersion + "/assets";
                        sprite = cdn.base + "/sprites/emojione.sprites.css";
                    }
                    if (options.sprite) {
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
                if (emojioneSupportMode > 4) {
                    cdn.base = cdn.defaultBase3 + "emojione/assets/" + emojioneVersion;
                } else {
                    cdn.base = cdn.defaultBase + emojioneVersion + "/assets";
                }
            }
        }

        emojioneReady(function() {
            var emojiSize = "";
            if (options.useInternalCDN) {
                if (emojioneSupportMode > 4) emojiSize = emojione.emojiSize + "/";

                emojione.imagePathPNG = cdn.base + "/png/" + emojiSize;
                emojione.imagePathSVG = cdn.base + "/svg/" + emojiSize;
                emojione.imagePathSVGSprites = cdn.base + "/sprites/emojione.sprites.svg";
                emojione.imageType = options.imageType;
            }
            if (getSupportMode(emojioneVersion) > 4) {
                uniRegexp = emojione.regUnicode;
                emojione.imageType = options.imageType || "png";
            } else {
                uniRegexp = new RegExp("<object[^>]*>.*?<\/object>|<span[^>]*>.*?<\/span>|<(?:object|embed|svg|img|div|span|p|a)[^>]*>|(" + emojione.unicodeRegexp + ")", "gi");
            }
        });
    };
});
