define([
    'var/emojione',
    'var/emojioneSupportMode'
],
function(emojione, emojioneSupportMode) {
    return function(template, unicode, shortname) {
        return template
            .replace('{name}', shortname || '')
            .replace('{img}', emojione.imagePathPNG + (emojioneSupportMode < 2 ? unicode.toUpperCase() : unicode) + '.png')
            .replace('{uni}', unicode)
            .replace('{alt}', emojione.convert(unicode));
    }
});