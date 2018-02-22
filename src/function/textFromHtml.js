define([
    'var/emojione',
    'var/invisibleChar',
    'function/unicodeTo',
],
function(emojione, invisibleChar, unicodeTo) {
    return function(str, self) {
        var previousImageWithUnicodeAlt = {};
        var replaceImageTagsWithAltAttribute = function(image, alt, offset) {
            if (emojione.unicodeToImage(alt)) {
                if (Object.keys(previousImageWithUnicodeAlt).length) {
                    if (previousImageWithUnicodeAlt.offset + previousImageWithUnicodeAlt.image.length === offset) {
                        var combinedEmojioneImage = emojione.unicodeToImage(previousImageWithUnicodeAlt.unicode + alt);
                        if (combinedEmojioneImage.indexOf('<img') === -1) {
                            alt = '&nbsp;' + alt;
                        }
                    }
                }
                previousImageWithUnicodeAlt.unicode = alt;
                previousImageWithUnicodeAlt.image = image;
                previousImageWithUnicodeAlt.offset = offset;
            }
            return alt;
        };

        str = str
            .replace(/&#10;/g, '\n')
            .replace(/&#09;/g, '\t')
            .replace(/<img[^>]*alt="([^"]+)"[^>]*>/ig, replaceImageTagsWithAltAttribute)
            .replace(/\n|\r/g, '')
            .replace(/<br[^>]*>/ig, '\n')
            .replace(/(?:<(?:div|p|ol|ul|li|pre|code|object)[^>]*>)+/ig, '<div>')
            .replace(/(?:<\/(?:div|p|ol|ul|li|pre|code|object)>)+/ig, '</div>')
            .replace(/\n<div><\/div>/ig, '\n')
            .replace(/<div><\/div>\n/ig, '\n')
            .replace(/(?:<div>)+<\/div>/ig, '\n')
            .replace(/([^\n])<\/div><div>/ig, '$1\n')
            .replace(/(?:<\/div>)+/ig, '</div>')
            .replace(/([^\n])<\/div>([^\n])/ig, '$1\n$2')
            .replace(/<\/div>/ig, '')
            .replace(/([^\n])<div>/ig, '$1\n')
            .replace(/\n<div>/ig, '\n')
            .replace(/<div>\n/ig, '\n\n')
            .replace(/<(?:[^>]+)?>/g, '')
            .replace(new RegExp(invisibleChar, 'g'), '')
            .replace(/&nbsp;/g, ' ')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&quot;/g, '"')
            .replace(/&#x27;/g, "'")
            .replace(/&#x60;/g, '`')
            .replace(/&#60;/g, '<')
            .replace(/&#62;/g, '>')
            .replace(/&amp;/g, '&');

        switch (self.saveEmojisAs) {
            case 'image':
                str = unicodeTo(str, self.emojiTemplate);
                break;
            case 'shortname':
                str = emojione.toShort(str);
        }
        return str;
    }
});