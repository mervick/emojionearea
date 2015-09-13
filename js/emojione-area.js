
(function($) {

    var default_options = {
        template          : "<editor/><panel><button/></panel>",

        className         : "emojionearea",
        editorClassName   : "emojionearea-editor",
        panelClassName    : "emojionearea-panel",
        buttonClassName   : "emojionearea-button",

        dir               : "ltr",
        spellcheck        : true,
        autocomplete      : "off",
        autocorrect       : "off",
        autocapitalize    : "off"
    };

    var EmojioneArea = function(element, options) {
        this.element = element;
        this.options = $.extend({}, default_options, options);
        this.events = {};

        this.init();
    };

    EmojioneArea.prototype.on = function(events, handler) {
        if (!!events && !!handler && Array.prototype.toString.call(handler) == '[object Function]') {
            $.each(events.split(' '), $.proxy(function(i, event) {
                if (!this.events[event]) {
                    this.events[event] = [];
                }
                this.events[event].push(handler);
            }, this));
        }
        return this;
    };

    EmojioneArea.prototype.off = function(events, handler) {
        if (!!events) {
            if (!!handler) {
                if (Array.prototype.toString.call(handler) == '[object Function]') {
                    $.each(events.split(' '), $.proxy(function(i, event) {
                        if (!!this.events[event] && !!this.events[event].length) {
                            $.each(this.events[event], $.proxy(function(j, attachedHandler) {
                                if (attachedHandler === handler) {
                                    this.events[event] = this.events[event].splice(j, 1);
                                }
                            }, this));
                        }
                    }, this));
                }
            } else {
                $.each(events.split(' '), $.proxy(function(i, event) {
                    this.events[event] = [];
                }, this));
            }
        }
        return this;
    };

    EmojioneArea.prototype.trigger = function(events, args) {
        var result = true;
        if (!!events) {
            if (!args) {
                args = [];
            }
            $.each(events.split(' '), $.proxy(function(i, event) {
                if (!!this.events[event] && !!this.events[event].length) {
                    $.each(this.events[event], function (i, f) {
                        return result = f.apply(null, args) !== false;
                    });
                }
                return result;
            }, this));
        }
        return result;
    };

    EmojioneArea.prototype.attach = function(element, elementEvents, events) {
        $.each(element, $.proxy(function(i, e) {
            $(e).on(elementEvents, $.proxy(function() {
                return this.trigger((!!events ? events : elementEvents), arguments)
            }, this));
        }, this));

        return this;
    };

    EmojioneArea.prototype.setText = function(content) {
        content = content
            .replace(/</g, '&lt;').replace(/>/g, '&gt;')
            .replace(/(?:\r\n|\r|\n)/g, '\n')
            .replace(/(\n+)/g, '<div>$1</div>')
            .replace(/\n/g, '<br/>')
            .replace(/<br\/><\/div>/g, '</div>');

        var emojioneImageType = emojione.imageType;
        emojione.imageType = 'png';
        content = emojione.unicodeToImage(content);
        emojione.imageType = emojioneImageType;

        this.editor.html('<div>' + content + '</div>');
        this.content = this.editor.html();
        this.trigger('emojioneArea.change change', [this.content]);
    }

    EmojioneArea.prototype.getText = function() {
        return this.editor.html()
            .replace(/<img class="emojione" alt="([^">]+)"[^>]+>/ig, '$1')
            .replace(/\n/g, '')
            .replace(/<br(?:[^>]+)?>/ig, '\n')
            .replace(/(?:<div(?:[^>]+)?>)+/ig, '<div>')
            .replace(/(?:<\/div>)+/ig, '</div>')
            .replace(/(?:<p(?:[^>]+)?>)+/ig, '<div>')
            .replace(/(?:<\/p>)+/ig, '</div>')
            .replace(/\n<div><\/div>/ig, '\n')
            .replace(/<div><\/div>\n/ig, '\n')
            .replace(/(?:<div>)+<\/div>/ig, '\n')
            .replace(/([^\n])<\/div><div>/ig, '$1\n')
            .replace(/(?:<\/div>)+/ig, '')
            .replace(/([^\n])<div>/ig, '$1\n')
            .replace(/\n<div>/ig, '\n')
            .replace(/<div>\n/ig, '\n\n')
            .replace(/<(?:[^>]+)?>/ig, '');
    }

    EmojioneArea.prototype.init = function() {
        this.type = this.element.is("INPUT") ? 'val' : 'text';

        var html = this.options.template
            .replace("<editor/>", '<div class="{{editorClassName}}" tabindex="0"></div>')
            .replace("<button/>", '<div class="{{buttonClassName}}" role="button" tabindex="-1"></div>')
            .replace("<panel>", '<div class="{{panelClassName}}">').replace("</panel>", '</div>');

        $.each(["editorClassName", "buttonClassName", "panelClassName"], $.proxy(function(i, name) {
            html = html.replace("{{" + name + "}}", this.options[name]);
        }, this));

        html = $('<div>' + html + '</div>').addClass(this.options.className).attr("role", "application");

        this.editor = html.find("." + this.options.editorClassName).attr("contenteditable", "true");
        this.button = html.find("." + this.options.buttonClassName);
        this.panel  = html.find("." + this.options.panelClassName);

        $.each(["dir", "spellcheck", "autocomplete", "autocorrect", "autocapitalize"], $.proxy(function(i, name) {
            this.editor.attr(name, this.options[name]);
        }, this));

        this.attach(this.editor, "mousedown")
            .attach([this.editor, this.panel], "mouseup")
            .attach(this.editor, "focus", "emojioneArea.focus focus")
            .attach(this.editor, "blur", "emojioneArea.blur blur")
            .attach([this.editor, this.panel], "click")
            .attach([this.editor, this.panel], "keyup")
            .attach([this.editor, this.panel], "keydown")
            .attach(this.panel, "mousedown", "emojioneArea.panel.mousedown panel.mousedown mousedown")
            .attach(this.button, "emojioneArea.button.mousedown button.mousedown");

        this.on("emojioneArea.panel.mousedown", function(e) {
            e.preventDefault();
            return false;
        });

        this.on("emojioneArea.button.mousedown", function(e) {
            e.preventDefault();
            return false;
        });

        this.on("emojioneArea.change", $.proxy(function() {
            this.element[this.type](this.getText());
        }, this)).on("emojioneArea.focus", function() {
            html.addClass("focused");
        }).on("emojioneArea.blur", $.proxy(function() {
            html.removeClass("focused");
            var content = this.editor.html();
            if (this.content !== content) {
                this.content = content;
                this.trigger('emojioneArea.change change', [this.content]);
            }
        }, this));

        html.insertAfter(this.element);
        this.element.hide();
        this.setText(this.element[this.type]());
    };


    $.fn.emojioneArea = function(options) {
        return this.each(function(){
            if (!!this.emojioneArea) return this.emojioneArea;
            return this.emojioneArea = new EmojioneArea($(this), options);
        });
    };

}) (jQuery);


// smiles
// fa-smile-o, fa-clock-o, (fa-flag fa-flag-checkered fa-flag-o), fa-leaf, fa-track, fa-cutlery,  fa-trophy,  fa-gift, fa-heart,  fa-ellipsis-h