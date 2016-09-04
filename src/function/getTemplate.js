define([
    'var/emojione',
    'var/emojioneSupportMode'
],
function(emojione, emojioneSupportMode) {
    return function(template, unicode, shortname) {
        var imageType = emojione.imageType, imagePath;
        if (imageType=='svg'){
            imagePath = emojione.imagePathSVG;
        } else {
            imagePath = emojione.imagePathPNG;
        }
        return template
            .replace('{name}', shortname || '')
            .replace('{img}', imagePath + (emojioneSupportMode < 2 ? unicode.toUpperCase() : unicode) + '.' + imageType)
            .replace('{uni}', unicode)
            .replace('{alt}', emojione.convert(unicode));
    };
});