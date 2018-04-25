# EmojiOne Area

EmojiOne Area is a small jQuery plugin that allows you to transform any html element into simple WYSIWYG editor with
ability to use Emojione icons.  
The end result is a secure text/plain in which the image icons will be replaced with their Unicode analogues.  

### Preview version 3.x

![EmojiOne Area version 3.0.0](http://mervick.github.io/emojionearea/images/v3.png)

[See the Live Demo here](https://jsfiddle.net/1v03Lqnu/)

[Version 2.x](https://github.com/mervick/emojionearea/tree/version2)

## Installation

The preferred way to install is via [bower](http://bower.io/), [npm](https://www.npmjs.com/) or [composer](https://getcomposer.org/).

```bash
bower install emojionearea#^3.0.0
# or
npm install emojionearea@^3.0.0
# or
composer require mervick/emojionearea ^3.0.0
```

## Usage

Add the following lines to the `head`:
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

EmojioneArea uses awesome [Emojione](https://github.com/emojione/emojione) emojis.  
So when `emojionearea.js` loads, it's require to `emojione.js` loaded too, but if it not loaded in the page then EmojioneArea loads it from CDN.  
For avoiding this behavior you can add `emojione.js` and `emojione.css` into your page.


### Customize emojione version

By changing value below you can change emojione version which will be loaded from CDN
```js
window.emojioneVersion = "3.1.2";
```

## Options

#### `standalone`

Standalone mode

**type**: `boolean`  
**default**: `false`  

Example:  
```js
$(".emojionearea").emojioneArea({
    standalone: true
});
```

Preview:  

![EmojiOneArea - Standalone mode](http://mervick.github.io/emojionearea/images/standalone_v3.png)

#### `emojiPlaceholder`

The placeholder (default emoji) of the button in the standalone mode.  
Works only with standalone mode

**type**: `string`  
**default**: `':smiley:'`  
**accepts values**: [any emojione shortname]

Example:  
```js
$(".emojionearea").emojioneArea({
    emojiPlaceholder: ":smile_cat:"
});
```

#### `placeholder`

The placeholder of the editor

**type**: `string`  
**default**: [uses placeholder attribute from the source input]  

Example:
```js
$(".emojionearea").emojioneArea({
    placeholder: "Type something here"
});
```

#### `search`

Whether is enabled search emojis in the picker

**type**: `boolean`  
**default**: `true`  

Example:
```js
$(".emojionearea").emojioneArea({
    search: false
});
```

#### `searchPlaceholder`

The search placeholder

**type**: `string`  
**default**: `'SEARCH'`  

Example:
```js
$(".emojionearea").emojioneArea({
    searchPlaceholder: "Search"
});
```

#### `useInternalCDN`

Whether to use the loading mechanism to load EmojiOne from CDN

**type**: `boolean`  
**default**: `true`  

Example:
```js
$(".emojionearea").emojioneArea({
    useInternalCDN: true
});
```

#### `buttonTitle`

The title of the emoji button (hint on the hover)

**type**: `string`  
**default**: `"Use the TAB key to insert emoji faster"`  

Example:
```js
$(".emojionearea").emojioneArea({
    buttonTitle: "Use the TAB key to insert emoji faster"
});
```

#### `recentEmojis`

Whether to show recently selected emojis in the picker

**type**: `boolean`  
**default**: `true`  

Example:
```js
$(".emojionearea").emojioneArea({
    recentEmojis: false
});
```

#### `pickerPosition`

The position of the emojis picker in the relation to the editor

**type**: `string`  
**default**: `'top'`  
**accepts values**: `'top' | 'right' | 'bottom'`  

Example:
```js
$(".emojionearea").emojioneArea({
    pickerPosition: "bottom"
});
```

#### `filtersPosition`

The position of the filters header in the emojis picker 

**type**: `string`  
**default**: `'top'`  
**accepts values**: `'top' | 'bottom'`  

Example:
```js
$(".emojionearea").emojioneArea({
    filtersPosition: "bottom"
});
```

![EmojiOneArea - searchPosition bottom](http://mervick.github.io/emojionearea/images/filters-position-bottom.png?1)

#### `searchPosition`

The search panel position if `search` option enabled

**type** `string`  
**default**: `top`  
**accepts**: `'top' | 'bottom'`  

Example:
```js
$(".emojionearea").emojioneArea({
    searchPosition: "bottom"
});
```

![EmojiOneArea - searchPosition bottom](http://mervick.github.io/emojionearea/images/search-position-bottom.png?!)

#### `hidePickerOnBlur`

Whether to hide picker when blur event triggers

**type**: `boolean`  
**default**: `true`  

Example:
```js
$(".emojionearea").emojioneArea({
    hidePickerOnBlur: false
});
```

#### `container`

The container of the plugin.  

By default, emojionearea container created directly under the source.  
In this option you can specify custom `jQuery|selector` container.

**type**: `jQuery|selector`  
**default**: `null`  

Examples:
```html
<input type="text" id="emojionearea1" />
<input type="text" id="emojionearea2" />
<!-- ... -->
<div id="container1"></div> <!-- #emojionearea2 plugin will use this container -->
<div id="container2"></div> <!-- #emojionearea1 plugin will use this container -->
<script>
    $("#emojionearea1").emojioneArea({
        container: "#container2" // by selector
    });
    $("#emojionearea2").emojioneArea({
        container: $("#container1") // by jQuery object
    });
</script>
```

#### `tones`

Whether to show the skin tone buttons in the emoji picker

**type**: `boolean`  
**default**: `true`  

Example:
```js
$(".emojionearea").emojioneArea({
    tones: false
});
```

#### `tonesStyle`

The style of the skin tones selector

**type**: `string`  
**default**: `'bullet'`  
**accepts values**: `'bullet' | 'radio' | 'square' | 'checkbox'`  

Example:
```js
$(".emojionearea").emojioneArea({
    tonesStyle: 'checkbox'
});
```

#### `shortnames`

By default EmojioneArea parses only utf8 emojis (e.g. `😀😊😍🤑😜🤓`) from the value of the input source.  
This option enables to parse also the shortnames (e.g. `:smile:`, `:smiley:`, `:cat:`, etc).  
Also affects the work of the method `setText()`.  

Note. Affects only to how it parse emojis.  
To change how it saves emojis use `saveEmojisAs` option (see below).

**type**: `boolean`  
**default**: `false`  

Example:
```js
$(".emojionearea").emojioneArea({
    shortnames: true
});
```

#### `saveEmojisAs`

The processor type of the how emojionearea saves icons to the source, also affects on the method `getText()`

**type**: `string`  
**default**: `'unicode'`  
**accepts values**: `'unicode' | 'shortname' | 'image'`  
* unicode - saves emojis as utf8 text (e.g. `😀😊😍🤑😜🤓`);
* shortname - save emojis as shortnames (e.g. `:smile:`, `:smiley:`, `:cat:`, etc);
* image - save emojis as html images, example: 
```html
<img alt="😀" class="emojioneemoji" src="https://cdnjs.cloudflare.com/ajax/libs/emojione/2.2.7/assets/png/1f600.png">
```

#### `hideSource`

Whether to hide source input after render the plugin

**type**: `boolean`  
**default**: `true`  

Example:
```js
$(".emojionearea").emojioneArea({
    hideSource: false
});
```

#### `inline`

Inline mode  
Whether to use plugin editor as inline input  

**type**: `boolean|null`  
**default**: `null`  
**accepts values**: `null | true | false`  
* `null` - auto detect, if input is textarea then `false`, when it is `input[type=text]` then `true`

Example:
```js
$(".emojionearea").emojioneArea({
    inline: true
});
```

Preview:  

![EmojioneArea - inline mode](http://mervick.github.io/emojionearea/images/inline.png?)

#### `shortcuts`

Whether to attach shortcuts events

**type**: `boolean`  
**default**: `true`  

Example:
```js
$(".emojionearea").emojioneArea({
    shortcuts: false
});
```

#### `autocomplete`

Whether to add the emojis short names autocomplete functional 

**type**: `boolean`  
**default**: `true`  

Example:
```js
$(".emojionearea").emojioneArea({
    autocomplete: false
});
```

#### `autocompleteTones`

Whether to show skin emojis in the autocomplete dropdown

**type**: `boolean`  
**default**: `false`  

Example:
```js
$(".emojionearea").emojioneArea({
    autocompleteTones: true
});
```

#### `textcomplete`

The settings of the autocomplete dropdown 

**type**: `object`  
**default**: 
```js
{
    maxCount  : 15,
    placement : null
}
```
where
* `maxCount` - max count of items in the dropdown
* `placement` - the placement of the dropdown (`null | "top" | "absleft" | "absright"`)

Example:
```js
$(".emojionearea").emojioneArea({
    textcomplete: {
        maxCount  : 20,
        placement : 'absleft'
    }
});
```

#### `attributes`

The html attributes of the editor (contenteditable) of the plugin 

**type**: `object`  
**default**: 
```js
{
    dir            : "ltr",
    spellcheck     : false,
    autocomplete   : "off",
    autocorrect    : "off",
    autocapitalize : "off",
}
```
where
* `dir`           - direction http://www.w3schools.com/tags/att_global_dir.asp
* `spellcheck`    - spellcheck http://www.w3schools.com/tags/att_global_spellcheck.asp
* `autocomplete`  - autocomplete http://www.w3schools.com/tags/att_input_autocomplete.asp
* `autocorrect`   - autocorrect https://davidwalsh.name/disable-autocorrect
* `autocapitalize`- autocapitalize http://www.w3schools.com/tags/att_input_autocomplete.asp

Example:
```js
$(".emojionearea").emojioneArea({
    attributes: {
        spellcheck : true,
        autocomplete   : "on",
    }
});
```

#### `filters`

The filters (tabs) in the emojis picker

**type**: `object`  
**default**: [the full default filters you can find here [here](https://github.com/mervick/emojionearea/blob/master/src/var/getDefaultOptions.js#L52)]
```js
{
    tones: {
        title: "Diversity",
        emoji: "[...]", // list of the emojis, see source code
    },
    recent: {
        icon: "clock3",
        title: "Recent",
    },
    smileys_people: {
        icon: "yum",
        title: "Smileys & People",
        emoji: "[...]", // list of the emojis, see source code
    },
    animals_nature: {
        icon: "hamster",
        title: "Animals & Nature",
        emoji: "[...]", // list of the emojis, see source code
    },
    food_drink: {
        icon: "pizza",
        title: "Food & Drink",
        emoji: "[...]", // list of the emojis, see source code
    },
    activity: {
        icon: "basketball",
        title: "Activity",
        emoji: "[...]", // list of the emojis, see source code
    },
    travel_places: {
        icon: "rocket",
        title: "Travel & Places",
        emoji: "[...]", // list of the emojis, see source code
    },
    objects: {
        icon: "bulb",
        title: "Objects",
        emoji: "[...]", // list of the emojis, see source code
    },
    symbols: {
        icon: "heartpulse",
        title: "Symbols",
        emoji: "[...]", // list of the emojis, see source code
    },
    flags: {
        icon: "flag_gb",
        title: "Flags",
        emoji: "[...]", // list of the emojis, see source code
    },
}

```

Example:
```js
$(".emojionearea").emojioneArea({
    filters: {
        recent : false, // disable recent
        smileys_people: {
            icon: 'cat' // change smileys_people filter icon to "cat"
        },
        animals_nature: {
            title: 'Animals' // change animals_nature filter title to "Animals"
        },
        food_drink: {
            emoji: "smiley smile cat" // change emojis of the filter food_drink
        },
        objects: false, // disable objects filter
        symbols: false, // disable symbols filter
        flags : false // disable flags filter
    }
});

```

## Api

### Methods
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
You can also avoid this by disabling autocomplete entirely by setting the autocomplete option to false



## Requirements

- [jQuery](https://jquery.com/) >= 1.8.2

## License

EmojiOneArea is released under the MIT license.
