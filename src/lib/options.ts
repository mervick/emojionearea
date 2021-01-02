import {options as emojione} from './emojione';
import {isFunction} from './utils';
import {HTMLAttributes} from "./types";

export interface ParserOptions {
  shortnames: boolean,
  images: boolean,
  unicode: boolean,
  html: boolean | string | string[],
  parser: ((input: string) => string) | null
}

export interface SaverOptions {
  saveAs: 'unicode' | 'shortname' | 'html',
  html: boolean | string | string[],
  nl: 'lf' | 'crlf' | 'cr',
  saver: ((html: string) => string) | null
}

export interface EventsOption {
  [event: string]: any,
}

export interface ButtonOptions {
  openIcon: string | HTMLElement | 'default',
  closeIcon: string | HTMLElement | 'default',
  title: string | null,
  events?: EventsOption
}

export type PickerPositionOption = 'top' | 'bottom' | 'left' | 'right' | 'auto';
export type PickerFiltersPositionOption = 'top' | 'bottom' | 'auto';
export type PickerSearchPositionOption = 'top' | 'bottom' | 'auto';

export interface PickerTemplateFuncElements {
  picker: HTMLElement,
  filters: HTMLElement,
  panel: HTMLElement,
  search: HTMLElement,
  tones: HTMLElement,
  scroll: HTMLElement,
  recent: HTMLElement,
  emojis: HTMLElement
}

export type PickerTemplateFunc = (elements: PickerTemplateFuncElements) => string;

export interface PickerFiltersListOption {
  [filter: string]: {
    icon?: string,
    title: string | (() => string),
    emoji?: string
  }
}

export interface PickerFiltersOptions {
  position: PickerFiltersPositionOption,
  list: PickerFiltersListOption,
  order: 'auto' | string
}

export interface PickerSearchOptions {
  placeholder: string,
  position: PickerSearchPositionOption,
  events?: EventsOption
}

export interface PickerOptions {
  template: string | PickerTemplateFunc,
  global: boolean,
  position: PickerPositionOption,
  recent: false | number | 'auto',
  tones: false | PickerTones,
  search: false | PickerSearchOptions,
  filters: PickerFiltersOptions,
  emojione: null | EmojioneOptions,
  events?: EventsOption
}

export interface EditorOptions {
  inline: boolean | 'auto',
  dir: 'auto' | 'ltr' | 'rtl',
  attributes: HTMLAttributes,
  container: HTMLElement | null,
  autocomplete: {
    tones: boolean,
    plugin: (() => void) | null
  },
  parser: ParserOptions,
  saver: SaverOptions,
  hideSource: boolean,
  hidePickerOnBlur: boolean,
  picker: HTMLElement | 'auto',
  events?: EventsOption
}

export interface EmojioneOptions {
  sprite: boolean, // sprite works with emojione 1.5.0, 2.1.7, 4.5.0
  type: 'png' | 'svg', // svg works with emojione <= 2.2.7
  size: 32 | 64 | 128,
  path: string
}

export interface AreaTemplateFuncElements {
  area: HTMLElement,
  editor: HTMLElement,
  button: HTMLElement,
  picker: HTMLElement
}

export interface AreaStandaloneTemplateFuncElements {
  standalone: HTMLElement,
  picker: HTMLElement
}

export type AreaTemplateFunc = (elements: AreaTemplateFuncElements) => string;
export type AreaStandaloneTemplateFunc = (elements: AreaStandaloneTemplateFuncElements) => string;

export type PickerTones = 'bullet' | 'radio' | 'square' | 'checkbox';

export interface StandaloneOptions {
  template: string | AreaStandaloneTemplateFunc,
  placeholder: string,
  title: string | null,
  events?: EventsOption
}

export interface AreaOptions {
  template: string | AreaTemplateFunc,
  standalone: boolean | StandaloneOptions,
  editor: EditorOptions,
  button: ButtonOptions | false,
  picker: PickerOptions | false,
  emojione: EmojioneOptions,
  events?: EventsOption
}

const defaultStandaloneOptions: StandaloneOptions = {
  template: '<standalone/><picker/>',
  placeholder: ':smiley:',
  title: null
};

const defaultParserOptions: ParserOptions = {
  shortnames: true,
  images: false,
  unicode: true,
  html: false,
  parser: null
};

const defaultSaverOptions: SaverOptions = {
  saveAs: 'unicode',
  html: false,
  nl: 'lf',
  saver: null
};

const defaultButtonOptions: ButtonOptions = {
  openIcon: 'default',
  closeIcon: 'default',
  title: null
};

const defaultPickerFiltersOptions: PickerFiltersOptions = {
  position: 'top',
  order: 'auto',
  list: emojione.filters
};

const defaultPickerSearchOptions: PickerSearchOptions = {
  placeholder: 'Search',
  position: 'top'
};

const defaultEditorOptions: EditorOptions = {
  inline: 'auto',
  dir: 'auto',
  attributes: {
    spellcheck: false,
    autocomplete: 'off',
    autocorrect: 'off',
    autocapitalize: 'off'
  },
  container: null,
  autocomplete: {
    tones: false,
    plugin: null
  },
  parser: defaultParserOptions,
  saver: defaultSaverOptions,
  hideSource: true,
  hidePickerOnBlur: true,
  picker: 'auto'
};

const defaultEmojioneOptions: EmojioneOptions = {
  sprite: false,
  type: 'png',
  size: 32,
  path: 'auto'
};

const defaultPickerOptions: PickerOptions = {
  template: '<picker><filters/><panel><search/><tones/></panel><scroll><recent/><emojis/></scroll></picker>',
  global: false,
  position: 'auto',
  recent: 'auto',
  tones: 'bullet',
  search: defaultPickerSearchOptions,
  filters: defaultPickerFiltersOptions,
  emojione: defaultEmojioneOptions
};

const defaultOptions: AreaOptions = {
  template: '<area><editor/><button/></area><picker/>',
  standalone: false,
  editor: defaultEditorOptions,
  button: defaultButtonOptions,
  picker: defaultPickerOptions,
  emojione: defaultEmojioneOptions
};

type KeyObject = {[key: string]: any | KeyObject};
type MergeFunc = (value: any | (() => string)) => any;
type MergeRule = '<@OBJ>' | MergeFunc;
type MergeRuleSub = ['<@OBJ>', MergeRules] | ['<@LAST>', MergeFunc];
type MergeRulesMixed = MergeRule | MergeRuleSub;
type MergeRules = {[rule: string]: MergeRulesMixed};

const mergeRules: MergeRules | {emojione: MergeRuleSub, editor: MergeRuleSub, picker: MergeRuleSub} = {
  // if standalone equal true then use default standalone options
  standalone: (standalone: boolean | StandaloneOptions) => standalone === true ? defaultStandaloneOptions : '<@OBJ>',
  // children are treated as object
  events: '<@OBJ>',
  editor: ['<@OBJ>', {
    // array sub children objects
    attributes: '<@OBJ>',
    autocomplete: '<@OBJ>',
    parser: '<@OBJ>',
    saver: '<@OBJ>',
    events: '<@OBJ>'
  }],
  button: ['<@OBJ>', {
    events: '<@OBJ>'
  }],
  picker: ['<@OBJ>', {
    emojione: ['<@OBJ>', {
      paths: '<@OBJ>',
      spritePaths: '<@OBJ>'
    }],
    search: '<@OBJ>',
    events: '<@OBJ>',
    filters: ['<@OBJ>', {
      list: ['<@OBJ>', {
        '*': ['<@OBJ>', {
          'emoji': (emoji: string | (() => string)) => emoji && isFunction(emoji) ? (emoji as () => string)() : emoji
        }]
      }]
    }]
  }]
};

/**
 * Merging the options by rules.
 * By default all options will be merged as primitive types,
 * if rule has an element as an array then it will it call recursive merging for
 * all children elements of object or call passed function
 *
 * @param {Object} a Default options
 * @param {Object} b Global options
 * @param {Object} c Passed options
 * @param {MergeRules} rules
 * @returns {Object}
 */
function mergeOptions(a: KeyObject, b: KeyObject, c: KeyObject, rules: MergeRules): KeyObject {
  const o: KeyObject = a;
  const complexKeys: string[] = Object.keys(rules);

  [b, c].forEach((merge: KeyObject) => {

    if (merge && typeof merge === 'object') {
      Object.keys(merge).forEach((key: string) => {
        // complex merging
        if (complexKeys[0] === '*' || complexKeys.indexOf(key) !== -1) {
          let rule: MergeRuleSub | MergeRule = rules[key];

          while(true) {
            if (rule === '<@OBJ>') {
              o[key] = mergeOptions(a[key], b[key], c[key], {} as MergeRules);
              break;
            }

            else if (Array.isArray(rule)) {
              if (rule[0] === '<@OBJ>') {
                o[key] = mergeOptions(a[key], b[key], c[key], rule[1] as MergeRules);
                break;
              }
              else if (rule[0] === '<@LAST>') {
                rule = rule[1];
              }
            }

            if (isFunction(rule)) {
              const val = (rule as MergeFunc)(merge[key]);
              if (val === '<@OBJ>') {
                rule = val;
                continue;
              }
            }
            break;
          }
        }

        // primitive merging
        else {
          o[key] = merge[key];
        }
      });
    }
  });

  return o;
}

interface Events {
  // standalone: EventsOption;
  editor: EventsOption;
  button: EventsOption;
  picker: EventsOption;
};

function splitEvents(events: EventsOption): Events {
  const ev: Events = {
    // standalone: {},
    editor: {},
    button: {},
    picker: {}
  };

  Object.keys(events).forEach((key: string) => {
    const parts = key.replace('_', '.').split('.');
    let context = 'editor';
    let attr =  key;
    if (parts[1]) {
      if (!ev[parts[0] as keyof Events]) return;
      context = parts[0];
      attr = parts[1];
    }
    ev[context as keyof Events][attr] = events[key];
  });

  return ev;
}

function mergeContext(a: KeyObject, b: KeyObject, c: KeyObject, rules: MergeRules, context?: string | null): KeyObject {
  if (context) {
    a = a[context];
    b && (b = b[context]);
    c && (c = c[context]);
    rules && rules[context] && (rules = (rules[context] as MergeRuleSub)[1] as MergeRules);
  }

  const options: AreaOptions = <AreaOptions>mergeOptions(
    a as KeyObject,
    (b || {}) as KeyObject,
    (c || {}) as KeyObject,
    rules as MergeRules
  );

  if (!context) {
    const events = splitEvents(options.events || {});
    Object.keys(events).forEach((cntx: string) => {
      if (!options[cntx as keyof Events]) return;
      options[cntx as keyof Events].events = {
        ...options[cntx as keyof Events].events,
        ...events[cntx as keyof Events]
      };
    });
  }

  return options;
}

/**
 * Gets result of merging of the plugin default options, user's global defined options and passed options to the instance
 * @param {Partial<AreaOptions|EditorOptions|PickerOptions|ButtonOptions>} options
 * @param {"area"|"editor"|"picker"|"button"="area"} context
 */
export function getOptions(options: Partial<AreaOptions|EditorOptions|PickerOptions|ButtonOptions>,
                           context: 'area'|'editor'|'picker'|'button' = 'area'): AreaOptions|EditorOptions|PickerOptions|ButtonOptions {
  const globalConfig: KeyObject = <KeyObject>(window as any).EmojioneArea.defaults;

  const config: AreaOptions|EditorOptions|PickerOptions|ButtonOptions = <AreaOptions|EditorOptions|PickerOptions|ButtonOptions>
    mergeContext(defaultOptions as KeyObject, globalConfig as KeyObject, options as KeyObject, mergeRules, context !== 'area' ? context : null);

  const emojiConfig: EmojioneOptions = <EmojioneOptions>mergeContext(defaultOptions as KeyObject, globalConfig as KeyObject,
    options as KeyObject, mergeRules, 'emojione');

  // get emojione CDN path
  const repl: any = {
    ...emojiConfig,
    'type-size': emojiConfig.size === 32 ? emojiConfig.type : `${emojiConfig.type}-${emojiConfig.size}`
  };

  emojiConfig.path.replace(/\{([a-z-]+)\}/g, (_, m) => repl[m]);
  (config as AreaOptions).emojione = emojiConfig;

  return config;
}
