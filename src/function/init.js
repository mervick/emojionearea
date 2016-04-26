define([
    'jquery',
    'var/blankImg',
    'var/slice',
    'var/css_class',
    'function/trigger',
    'function/attach',
    'function/shortnameTo',
    'function/pasteHtmlAtCaret',
    'function/getOptions',
    'function/saveSelection',
    'function/restoreSelection',
    'function/htmlFromText',
    'function/textFromHtml',
    'function/isObject',
    'function/calcButtonPosition',
    'function/selector',
    'function/div'
],
function($, blankImg, slice, css_class, trigger, attach, shortnameTo, pasteHtmlAtCaret,
         getOptions, saveSelection, restoreSelection, htmlFromText, textFromHtml, isObject,
         calcButtonPosition, selector, div)
{
    return function(self, source, options) {
        options = getOptions(options);
        self.sprite     = options.sprite;
        self.shortnames = options.shortnames;
        self.pickerPosition = options.pickerPosition;

        var sourceValFunc = source.is("TEXTAREA") || source.is("INPUT") ? "val" : "text",
            editor, button, picker, tones, emojis, filters, filtersBtns, emojisList, headers, scrollArea,
            app = div({"class" : css_class + " " + source.attr("class"), role: "application"},
                editor = self.editor = div('editor').attr({
                    contenteditable: true,
                    placeholder: options["placeholder"] || source.data("placeholder") || source.attr("placeholder") || "",
                    tabindex: 0
                }),
                button = self.button = div('button',
                    div('button-open'),
                    div('button-close')
                ).attr('title', options.buttonTitle),
                picker = self.picker = div('picker',
                    div('wrapper',
                        filters = div('filters'),
                        scrollArea = div('scroll-area',
                            emojisList = div('emojis-list'),
                            tones = div('tones',
                                function() {
                                    var btns = [];
                                    if (options.tones) {
                                        for (var i = 0; i <= 5; i++) {
                                            btns.push($("<button/>", {
                                                "class": "btn-tone btn-tone-" + i + (!i ? " active" : ""),
                                                "data-skin": i
                                            }));
                                        }
                                    }
                                    return btns;
                                }
                            )
                        )
                    )
                ).addClass(selector('picker-position-' + options.pickerPosition, true))
                 .addClass(selector('filters-position-' + options.filtersPosition, true))
                 .addClass('hidden')
            );

        for (var attr = ["dir", "spellcheck", "autocomplete", "autocorrect", "autocapitalize"], j=0; j<5; j++) {
            editor.attr(attr[j], options[attr[j]]);
        }

        $.each(options.filters, function(filter, params) {
            $("<i/>", {
                "class": selector("filter", true) + " " + selector("filter-" + filter, true),
                "data-filter": filter,
                title: params.title
            })
            .wrapInner(shortnameTo(params.icon, self.sprite ? '<i class="emojione-{uni}"/>' : '<img class="emojione" src="{img}"/>'))
            .appendTo(filters);
        });

        var render = [],
            btnEvent = {click: "emojibtn.click"};
        $.each(options.filters, function(filter, params) {
            emojisList.append('<h1 name="' + filter + '">' + params.title + '</h1>');
            var emojis = div('emojis').appendTo(emojisList),
                items = shortnameTo(params.emoji.replace(/\s+/g, ','), '<i class="emojibtn" role="button"><' +
                    (self.sprite ? 'i class="emojione-{uni}"' : 'img class="emojione" src="{img}"') +
                    ' data-name="{name}"/></i>').split(',');

            if (self.sprite) {
                emojis.html(items.join(''));
            } else {
                render.push(function () {
                    var timer = setInterval(function () {
                        if (!items.length) {
                            clearInterval(timer);
                            if (render.length) {
                                render.shift().call();
                            }
                        }
                        for (var i = 0; i < 10 && items.length; i++) {
                            emojis.append(items.shift());
                        }
                        attach(self, emojis.find(".emojibtn").not(".handled").addClass("handled"), btnEvent);
                    }, 10);
                });
            }
        });
        options.filters = null;
        attach(self, emojisList.find(".emojibtn"), btnEvent);
        headers = emojisList.find("h1");
        if (!self.sprite) {
            render.shift().call();
        }

        filtersBtns = filters.find(selector("filter"));
        filtersBtns.eq(0).addClass("active");

        var noListenScroll = false;
        scrollArea.on('scroll', function (event) {
            if (!noListenScroll) {
                var item = headers.eq(0), scrollTop = scrollArea.offset().top;
                headers.each(function (i, e) {
                    if ($(e).offset().top - scrollTop >= 3) {
                        return false;
                    }
                    item = $(e);
                });
                var filter = filtersBtns.filter('[data-filter="' + item.attr("name") + '"]');
                if (!filter.is(".active")) {
                    filtersBtns.removeClass("active");
                    filter.addClass("active");
                }
            }
        });

        if (options.container) {
            $(options.container).wrapInner(app);
        } else {
            app.insertAfter(source);
        }

        if (options.hideSource) {
            source.hide();
        }

        self.setText(source[sourceValFunc]());
        calcButtonPosition.apply(self);

        attach(self, window, {resize: "!resize"});
        attach(self, [picker, button], {mousedown: "!mousedown"}, editor);
        attach(self, button, {click: "button.click"});
        attach(self, editor, {paste :"!paste"}, editor);
        attach(self, editor, ["focus", "blur"], function() { return self.stayFocused ? false : editor; });
        attach(self, [editor, picker], ["mousedown", "mouseup", "click", "keyup", "keydown", "keypress"], editor);
        attach(self, picker.find(".emojionearea-filter"), {click: "filter.click"});

        if (isObject(options.events) && !$.isEmptyObject(options.events)) {
            $.each(options.events, function(event, handler) {
                self.on(event.replace(/_/g, '.'), handler);
            });
        }

        self.on("@filter.click", function(filter) {
                noListenScroll = true;
                if (!filter.is(".active")) {
                    filtersBtns.filter(".active").removeClass("active");
                    filter.addClass("active");
                }
                var headerOffset = emojisList.find('h1[name="' + filter.data('filter') + '"]').offset().top,
                    scroll = scrollArea.scrollTop(),
                    offsetTop = scrollArea.offset().top;
                scrollArea.stop().animate({
                    scrollTop: headerOffset + scroll - offsetTop - 2
                }, 200, 'swing', function() {
                    noListenScroll = false;
                });
            })

            .on("@button.click", function(button) {
                if (button.is(".active")) {
                    self.hidePicker();
                } else {
                    self.showPicker();
                }
            })

            .on("@!paste", function(editor) {
                self.stayFocused = true;
                // insert invisible character for fix caret position
                pasteHtmlAtCaret('<span>&#8291;</span>');

                var sel = saveSelection(editor[0]),
                    editorScrollTop = editor.scrollTop(),
                    clipboard = $("<div/>", {contenteditable: true})
                        .css({position: "fixed", left: "-999px", width: "1px", height: "1px", top: "20px", overflow: "hidden"})
                        .appendTo($("BODY"))
                        .focus();

                window.setTimeout(function() {
                    var caretID = "caret-" + (new Date()).getTime();
                    editor.focus();
                    restoreSelection(editor[0], sel);
                    var text = textFromHtml(clipboard.html().replace(/\r\n|\n|\r/g, '<br>'), self),
                        html = htmlFromText(text, self);
                    pasteHtmlAtCaret(html);
                    clipboard.remove();
                    pasteHtmlAtCaret('<i id="' + caretID +'"></i>');
                    editor.scrollTop(editorScrollTop);
                    var caret = $("#" + caretID),
                        top = caret.offset().top - editor.offset().top,
                        height = editor.height();
                    if (editorScrollTop + top >= height || editorScrollTop > top) {
                        editor.scrollTop(editorScrollTop + top - 2 * height/3);
                    }
                    caret.remove();
                    self.stayFocused = false;
                    calcButtonPosition.apply(self);
                    trigger(self, 'paste', [editor, text, html]);
                }, 200);
            })

            .on("@emojibtn.click", function(emojibtn) {
                if (!app.is(".focused")) {
                    editor.focus();
                }
                saveSelection(editor[0]);
                pasteHtmlAtCaret(shortnameTo(emojibtn.children().data("name"),
                    '<img alt="{alt}" class="emojione' + (self.sprite ? '-{uni}" src="'+blankImg+'">' : '" src="{img}">')));

            })

            .on("@!resize @keyup @emojibtn.click", calcButtonPosition)

            .on("@!mousedown", function(editor, event) {
                if (!options.autoHideFilters && !app.is(".focused")) {
                    editor.focus();
                }
                event.preventDefault();
                return false;
            })

            .on("@change", function(editor) {
                var html = editor.html().replace(/<\/?(?:div|span|p)[^>]*>/ig, '');
                // clear input: chrome adds <br> when contenteditable is empty
                if (!html.length || /^<br[^>]*>$/i.test(html)) {
                    self.setText('', false);
                }
                source[sourceValFunc](self.getText());
            })

            .on("@focus", function() {
                app.addClass("focused");
            })

            .on("@blur", function(editor) {
                app.removeClass("focused");

                if (options.hidePickerOnBlur) {
                    self.hidePicker();
                }

                var content = editor.html();
                if (self.content !== content) {
                    self.content = content;
                    trigger(self, 'change', [editor]);
                    source.blur().trigger("change");
                } else {
                    source.blur();
                }
            });
    };
});