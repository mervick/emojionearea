define([
    'jquery',
    'var/blankImg',
    'var/slice',
    'function/trigger',
    'function/attach',
    'function/shortnameTo',
    'function/pasteHtmlAtCaret',
    'function/getOptions',
    'function/saveSelection',
    'function/restoreSelection',
    'function/htmlFromText',
    'function/textFromHtml',
    'function/isObject'
],
function($, blankImg, slice, trigger, attach, shortnameTo, pasteHtmlAtCaret,
         getOptions, saveSelection, restoreSelection, htmlFromText, textFromHtml, isObject)
{
    return function(self, source, options) {
        options = getOptions(options);

        var sourceValFunc = source.is("TEXTAREA") || source.is("INPUT") ? "val" : "text",
            stayFocused = false;

        self.sprite     = options.sprite;
        self.shortnames = options.shortnames;

        var css_class = "emojionearea";
        function selector(prefix, skip_dot) {
            return (skip_dot ? '' : '.') + css_class + (prefix ? ("-" + prefix) : "");
        }
        function div(prefix) {
            var parent = $('<div/>', isObject(prefix) ? prefix : {"class" : selector(prefix, true)});
            $.each(slice.call(arguments).slice(1), function(i, child) {
                child.appendTo(parent);
            });
            return parent;
        }

        var editor, button, picker, tones, emojis, filters, emojisList,
            app = div({"class" : css_class + " " + source.attr("class"), role: "application"},
                editor = self.editor = div('editor').attr({
                    contenteditable: true,
                    placeholder: options["placeholder"] || source.data("placeholder") || source.attr("placeholder") || "",
                    tabindex: 0
                }),
                button = div('button',
                    div('button-open'),
                    div('button-close')
                ),
                picker = self.picker = div('picker',
                    div('wrapper',
                        filters = div('filters'),
                        emojisList = div('emojis-list',
                            tones = div('tones'),
                            emojis = div('emojis')
                        )
                    )
                ).addClass(selector('picker-position-' + options.pickerPosition, true))
                 .addClass(selector('filters-position-' + options.filtersPosition, true))
            );

        for (var attr = ["dir", "spellcheck", "autocomplete", "autocorrect", "autocapitalize"], j=0; j<5; j++) {
            editor.attr(attr[j], options[attr[j]]);
        }

        $.each(options.filters, function(filter, params) {
            $("<i/>", {"class": selector("filter", true) + " " + selector("filter-" + filter, true), "data-filter": filter})
                .wrapInner(shortnameTo(params.icon, self.sprite ? '<i class="emojione-{uni}"/>' : '<img class="emojione" src="{img}"/>'))
                .appendTo(filters);
        });

        var flush = function() {
            flush = null;
            $.each(options.filters, function(filter, params) {
                emojisList.append('<h1 name="' + filter + '">' + params.title + '</h1>');
                div('emojis').html(shortnameTo(params.emoji.replace(' ', ','), '<i class="emojibtn" role="button"><' +
                    (self.sprite ? 'i class="emojione-{uni}"' : 'img class="emojione" src="{img}"') +
                    ' data-name="{name}"/></i>') . split(','). join('')).appendTo(emojisList);
            });
            attach(self, emojisList.find(".emojibtn"), {click: "emojibtn.click"});
        };

        var filtersBtns = filters.find(selector("filter"));

        if (options.container) {
            $(options.container).wrapInner(app);
        } else {
            app.insertAfter(source);
        }

        if (options.hideSource) {
            source.hide();
        }

        self.setText(source[sourceValFunc]());

        attach(self, [picker, button], {mousedown: "area.mousedown"}, editor);
        attach(self, button, {click: "button.click"});
        attach(self, editor, {paste :"editor.paste"}, editor);
        attach(self, editor, ["focus", "blur"], function() { return stayFocused ? false : editor; });
        attach(self, [editor, picker], ["mousedown", "mouseup", "click", "keyup", "keydown", "keypress"], editor);
        attach(self, picker.find(".emojionearea-filter"), {click: "filter.click"});

        if (isObject(options.events) && !$.isEmptyObject(options.events)) {
            $.each(options.events, function(event, handler) {
                self.on(event.replace(/_/g, '.'), handler);
            });
        }

        self.on("@filter.click", function(element) {
                if (element.is(".active")) {
                    element.removeClass("active");
                } else {
                    filtersBtns.filter(".active").removeClass("active");
                    element.addClass("active");
                    //var i, timer, tab = show(hide(show(tabs).children())
                    //    .filter(".emojionearea-tab-" + element.data("filter"))),
                    //    items = tab.data("items"),
                    //    event = {click: "emojibtn.click"};
                    //if (items) {
                    //    tab.data("items", false);
                    //    items = items.split(',');
                    //    if (self.sprite) {
                    //        tab.html(items.join(''));
                    //        attach(self, tab.find(".emojibtn"), event);
                    //    } else {
                    //        timer = window.setInterval(function () {
                    //            for (i = 0; i < 20 && items.length; i++) {
                    //                tab.append(items.shift());
                    //            }
                    //            attach(self, tab.find(".emojibtn").not(".handled").addClass("handled"), event);
                    //            if (!items.length) window.clearInterval(timer);
                    //        }, 5);
                    //    }
                    //}
                }
            })

            .on("@button.click", function(button) {
                if (button.is(".active")) {
                    button.removeClass("active");
                } else {
                    if (flush) flush();
                    //scroll.nanoScroller();
                    button.addClass("active");
                }
            })

            .on("@editor.paste", function(element) {
                stayFocused = true;
                // inserts invisible character for fix caret
                pasteHtmlAtCaret('<span>&#8291;</span>');

                var sel = saveSelection(element[0]),
                    editorScrollTop = element.scrollTop(),
                    clipboard = $("<div/>", {contenteditable: true})
                        .css({position: "fixed", left: "-999px", width: "1px", height: "1px", top: "20px", overflow: "hidden"})
                        .appendTo($("BODY"))
                        .focus();

                window.setTimeout(function() {
                    var caretID = "caret-" + (new Date()).getTime();
                    element.focus();
                    restoreSelection(element[0], sel);
                    var text = textFromHtml(clipboard.html().replace(/\r\n|\n|\r/g, '<br>'), self),
                        html = htmlFromText(text, self);
                    pasteHtmlAtCaret(html);
                    clipboard.remove();
                    pasteHtmlAtCaret('<i id="' + caretID +'"></i>');
                    element.scrollTop(editorScrollTop);
                    var caret = $("#" + caretID),
                        top = caret.offset().top - element.offset().top,
                        height = element.height();
                    if (editorScrollTop + top >= height || editorScrollTop > top) {
                        element.scrollTop(editorScrollTop + top - 2 * height/3);
                    }
                    caret.remove();
                    stayFocused = false;
                    trigger(self, 'paste', [element, text, html]);
                }, 200);
            })

            .on("@emojibtn.click", function(element) {
                saveSelection(editor[0]);
                pasteHtmlAtCaret(shortnameTo(element.children().data("name"),
                    '<img alt="{alt}" class="emojione' + (self.sprite ? '-{uni}" src="'+blankImg+'">' : '" src="{img}">')));
            })

            .on("@area.mousedown", function(element, event) {
                if (!options.autoHideFilters && !app.is(".focused")) {
                    element.focus();
                }
                event.preventDefault();
                return false;
            })

            .on("@change", function(element) {
                var html = element.html().replace(/<\/?(?:div|span|p)[^>]*>/ig, '');
                // clear input, fix: chrome add <br> on contenteditable is empty
                if (!html.length || /^<br[^>]*>$/i.test(html)) {
                    self.setText('', false);
                }
                source[sourceValFunc](self.getText());
            })

            .on("@focus", function() {
                app.addClass("focused");
            })

            .on("@blur", function(element) {
                app.removeClass("focused");

                var content = element.html();
                if (self.content !== content) {
                    self.content = content;
                    trigger(self, 'change', [editor]);
                    source.blur().trigger("change");
                } else {
                    source.blur();
                }
            });

        trigger(self, 'ready', [editor]);
    };
});