# EmojiOne Area

EmojiOne Area is a small jQuery plugin that allows you to transform any html element into simple WYSIWYG editor with 
ability to use Emojione icons. 
The end result is a secure text/plain in which the image icons will be replaced with their Unicode analogues.


![EmojiOne Area](http://mervick.github.io/emojionearea/images/screen.png)

See a [Demo page](http://mervick.github.io/emojionearea/).

## Installation

The preferred way to install is via `bower`, `npm` or `Composer`.

Using [Bower](http://bower.io/):
```bash
bower install emojionearea
```
Using [npm](https://www.npmjs.com/):
```bash
npm install emojionearea
```
Using [Composer](https://getcomposer.org/):
```bash
composer require mervick/emojionearea
```

## Usage

Add the following lines to `head`:
```html
<link rel="stylesheet" href="file/to/path/css/emojionearea.min.css">
<script type="text/javascript" src="file/to/path/js/emojionearea.min.js"></script>
```
Simple usage:

```html
<textarea id="example1"></textarea>
<script type="text/javascript">
  $(document).ready(function() {
    // define emojione location (optional, see more at https://github.com/Ranks/emojione)
    // emojione.imagePathPNG = '../vendor/emojione/emojione/assets/png/';
    $("#example1").emojioneArea({
      // options
      autoHideFilters: true
    });
  });
</script>
```

## Requirements

- [jQuery](https://jquery.com/) >= 1.8.2
- [EmojiOne](https://github.com/Ranks/emojione) >= 1.5.0

## License

EmojiOneArea is released under the MIT license.
