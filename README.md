# EmojiOne Area

EmojiOne Area is a small jQuery plugin that allows you to transform any html element into simple WYSIWYG editor with
ability to use Emojione icons.
The end result is a secure text/plain in which the image icons will be replaced with their Unicode analogues.

### Version 3.x

![EmojiOne Area version 3.0.0](http://mervick.github.io/emojionearea/images/v3.png)

[See the Live Demo here.](https://jsfiddle.net/1v03Lqnu/)

### Version 2.1 (Legacy)

![EmojiOne Area version 2.1](http://mervick.github.io/emojionearea/images/screen.png)

#### Version 2.1 (Legacy) - Standalone mode
![EmojiOne Area version 2.1 - Standalone mode](http://mervick.github.io/emojionearea/images/standalone.png)

[See Version 2.1 Live Demo here.](http://mervick.github.io/emojionearea/)

[See Version 2.1 Documentation here.](https://github.com/mervick/emojionearea/blob/master/doc/README_v2.1.md)

## Installation

The preferred way to install is via [Bower](http://bower.io/), [npm](https://www.npmjs.com/) or [Composer](https://getcomposer.org/).

### Install

```bash
bower install emojionearea#^3.0.0
# or
npm install emojionearea@^3.0.0
# or
composer require mervick/emojionearea ^3.0.0
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
    $("#example1").emojioneArea();
  });
</script>
```

### Options

Customize emojione version
```js
window.emojioneVersion = "2.1.1";
```

Default options
```js
  var default_options = {
      dir               : "ltr", // direction http://www.w3schools.com/tags/att_global_dir.asp
      spellcheck        : false, // spellcheck http://www.w3schools.com/tags/att_global_spellcheck.asp
      autocomplete      : "off", // autocomplete http://www.w3schools.com/tags/att_input_autocomplete.asp
      autocorrect       : "off", // autocorrect https://davidwalsh.name/disable-autocorrect
      autocapitalize    : "off", // autocapitalize http://www.w3schools.com/tags/att_input_autocomplete.asp

      buttonTitle       : "Use the TAB key to insert emoji faster", // title of emojionearea smiley button
      placeholder       : null, // placeholder
      pickerPosition:   : "top", // position of picker in relation to input [ top | bottom | right ]
      container         : null, // by default, emojionearea container created directly under source,
                                // in this option you can specify custom {jQuery|selector} container
      tones             : true, // whether to show the skin tone buttons in Emoji picker
      tonesStyle        : "bullet" // style of skin tones selector [ bullet | radio | square | checkbox ]

      hideSource        : true,  // hide source element after binding
      autoHideFilters   : false, // auto hide filters panel

      sprite            : true, // use sprite instead of images, is awesome, but not works in old browsers
      shortnames        : false, // if true - will converts emojis to short names,
                                 // by default converts emojis to unicode characters
      standalone        : false, // whether to use standalone EmojiOneArea picker (for EmojiOneArea 2.1 only)
      useInternalCDN    : true,
      recentEmojis      : true, // whether to show recently select Emoji's in picker

      textcomplete: {
        maxCount: 15,           // max amount of items to show in autocomplete drop-down list
        placement: null,        // placement of autocomplete dropdown list [ null (default) | top | absleft | absright ]
      },

      filters: {
        // customize filters & emoji buttons
        // see in source file href="https://raw.githubusercontent.com/mervick/emojionearea/master/src/var/default_options.js
      },

      events: {
        // events handlers
        // see below
      }
  };
```

### Api
```js
  .on(events, handler);
  // - events
  //   Type: String
  //   One or more space-separated event types and optional namespaces
  // - handler
  //   Type: Function(jQuery Element, Event eventObject [, Anything extraParameter ] [, ... ] )
  //   A function to execute when the event is triggered.

  .off(events[, handler]);
  // - events
  //   Type: String
  //   One or more space-separated event types and optional namespaces
  // - handler
  //   Type: Function(jQuery Element, Event eventObject [, Anything extraParameter ] [, ... ] )
  //   A handler function previously attached for the event(s)

  // built-in events:
  //   "mousedown", "mouseup", "click", "keyup", "keydown", "keypress"
  //   "filter.click", "emojibtn.click", "arrowLeft.click", "arrowRight.click",
  //   "focus", "blur", "paste", "resize", "change"

  .setText(str);
  // - str
  //   Type: String
  //   Set text

  .getText();
  //   Get text

  // Usage methods, example:
  var el = $("selector").emojioneArea();
  el[0].emojioneArea.on("emojibtn.click", function(btn, event) {
    console.log(btn.html());
  });
```

### Events

Two ways to set events, in options:
```JS
$("selector").emojioneArea({
  events: {
    /**
     * @param {jQuery} editor EmojioneArea input
     * @param {Event} event jQuery Event object
     */
    focus: function (editor, event) {
      console.log('event:focus');
    },
    /**
     * @param {jQuery} editor EmojioneArea input
     * @param {Event} event jQuery Event object
     */
    blur: function (editor, event) {
      console.log('event:blur');
    },
    /**
     * @param {jQuery} editor EmojioneArea input
     * @param {Event} event jQuery Event object
     */
    mousedown: function (editor, event) {
      console.log('event:mousedown');
    },
    /**
     * @param {jQuery} editor EmojioneArea input
     * @param {Event} event jQuery Event object
     */
    mouseup: function (editor, event) {
      console.log('event:mouseup');
    },
    /**
     * @param {jQuery} editor EmojioneArea input
     * @param {Event} event jQuery Event object
     */
    click: function (editor, event) {
      console.log('event:click');
    },
    /**
     * @param {jQuery} editor EmojioneArea input
     * @param {Event} event jQuery Event object
     */
    keyup: function (editor, event) {
      console.log('event:keyup');
    },
    /**
     * @param {jQuery} editor EmojioneArea input
     * @param {Event} event jQuery Event object
     */
    keydown: function (editor, event) {
      console.log('event:keydown');
    },
    /**
     * @param {jQuery} editor EmojioneArea input
     * @param {Event} event jQuery Event object
     */
    keypress: function (editor, event) {
      console.log('event:keypress');
    },
    /**
     * @param {jQuery} editor EmojioneArea input
     * @param {Event} event jQuery Event object
     */
    paste: function (editor, event) {
      console.log('event:paste');
    },
    /**
     * @param {jQuery} editor EmojioneArea input
     * @param {Event} event jQuery Event object
     */
    change: function (editor, event) {
      console.log('event:change');
    },
    /**
     * @param {jQuery} filter EmojioneArea filter
     * @param {Event} event jQuery Event object
     */
    filter_click: function (filter, event) {
      console.log('event:filter.click, filter=' + filter.data("filter"));
    },
    /**
     * @param {jQuery} button EmojioneArea emoji button
     * @param {Event} event jQuery Event object
     */
    emojibtn_click: function (button, event) {
      console.log('event:emojibtn.click, emoji=' + button.children().data("name"));
    },
    /**
     * @param {jQuery} button EmojioneArea left arrow button
     * @param {Event} event jQuery Event object
     */
    arrowLeft_click: function (button, event) {
      console.log('event:arrowLeft.click');
    },
    /**
     * @param {jQuery} button EmojioneArea right arrow button
     * @param {Event} event jQuery Event object
     */
    arrowRight_click: function (button, event) {
      console.log('event:arrowRight.click');
    }
  }
});
```

or by `.on()` &amp; `.off()` methods:
```JS
  var el = $("selector").emojioneArea();

  // attach event handler
  el[0].emojioneArea.on("emojibtn.click", function(button, event) {
    console.log('event:emojibtn.click, emoji=' + button.children().data("name"));
  });
  // unset all handlers attached to event
  el[0].emojioneArea.off("emojibtn.click");

  // like in jQuery you can specify few events separated by space
  el[0].emojioneArea.off("focus blur");

  // set & unset custom handler
  var eventHandler1 = function(button, event) {
    console.log('event1');
  };
  var eventHandler2 = function(button, event) {
    console.log('event2');
  };
  // attach event handlers
  el[0].emojioneArea.on("click", eventHandler1);
  el[0].emojioneArea.on("click", eventHandler2);
  // unset eventHandler1
  el[0].emojioneArea.off("click", eventHandler1);
```
## Building

Building EmojiOneArea requires grunt, compass, and sass to be available

For making changes and build project (scss/js):
```
npm update
npm run build
```

PRs welcome.


## FAQ / Troubleshooting

#### EmojiOne icons are appearing larger than expected
Most likely caused by including some scripts in the wrong order (or perhaps not at all!)
Include jQuery, then EmojiOne, then EmojiOneArea scripts

#### Can I use EmojiOneArea to just display Emoji icons in a div?
EmojiOneArea is intended to be a text editor which supports EmojiOne.
If you just want to display Emoji icons, the EmojiOne library already provides everything you need.

#### Can I add extra buttons into EmojiOneArea, alongside the existing emoji picker icon?
This is not fully supported, but you could respond to the jQuery onLoad event which EmojiOneArea fires once its initialised, and insert your buttons into the DOM at this point
see https://github.com/mervick/emojionearea/issues/152

#### Firefox is not positioning the input caret correctly in EmojiOneArea
This appears to be a long standing FireFox bug, apparently related to contenteditable, the placeholder attribute, and the pseudo :before or :after classes
https://bugzilla.mozilla.org/show_bug.cgi?id=1020973

There are various workarounds such as changing placeholder, or adding some padding
See https://github.com/mervick/emojionearea/issues/86

#### Can I modify the position of EmojiOneArea picker?
You can use the `pickerPosition` option which provides basic control of where the picker appears, in relation to the source input.
For more control, you could apply translate CSS to the picker

## Known Issues

#### Internet Explorer focus issues
IE 11 causes EmojiOneArea to hide (and trigger blur event) when the emoji picker scrollbar is clicked
There is no current fix for this, although there are a few crude workarounds
See https://github.com/mervick/emojionearea/issues/127

#### EmojiOneArea positioning
There are known issues with positioning the EmojiOneArea picker.
It does not currently ensure the picker is entirely visible on small screen devices, or positioned properly when it is invoked from the bottom of a page (it could be clipped)
See https://github.com/mervick/emojionearea/issues/131

#### Browser loads the textcomplete.js from CDN, everytime an EmojiOneArea is instantiated
You can avoid this by explicitly including the textcomplete script into your document.
If it already exists, EmojiOneArea will use the preloaded script instead of attempting to load it from CDN for each instance
You can also avoid this by disabling autocomplate entirely by setting the autocomplete option to false



## Requirements

- [jQuery](https://jquery.com/) >= 1.8.2

## License

EmojiOneArea is released under the MIT license.
