import {filters} from './defaultFilters';

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

export interface ButtonOptions {
  openIcon: string | HTMLElement | 'default',
  closeIcon: string | HTMLElement | 'default',
  title: string | null
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
  position: PickerSearchPositionOption
}

export interface PickerOptions {
  template: string | PickerTemplateFunc,
  global: boolean,
  position: PickerPositionOption,
  recent: false | number | 'auto',
  tones: false | PickerTones,
  search: false | PickerSearchOptions,
  filters: PickerFiltersOptions,
  emojione: null | EmojioneOptions
}

export interface EditorOptions {
  inline: boolean | 'auto',
  dir: 'auto' | 'ltr' | 'rtl',
  attributes: {
    [key: string]: string | number | boolean;
  },
  container: HTMLElement | null,
  autocomplete: {
    tones: boolean,
    plugin: (() => void) | null
  },
  parser: ParserOptions,
  saver: SaverOptions,
  hidePickerOnBlur: boolean,
  picker: HTMLElement | 'auto'
}

export interface EmojioneOptions {
  version: string | 'latest' | 'v4' | 'v3' | 'v2' | 'v1',
  sprite: boolean, // sprite works with emojione 1.5.0, 2.1.7, 4.5.0
  type: 'png' | 'svg', // svg works with emojione <= 2.2.7
  size: 32 | 64 | 128,
  path: string | 'auto',
  spritePath: string | 'auto',
  cdn: string,
  paths: {
    [key: string]: string | ((args: {[key: string]: string | number}) => string);
  },
  spritePaths: {
    [key: string]: string | ((args: {[key: string]: string | number}) => string);
  }
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
}

export interface AreaOptions {
  template: string | AreaTemplateFunc,
  standalone: boolean | StandaloneOptions,
  editor: EditorOptions,
  button: ButtonOptions | false,
  picker: PickerOptions | false,
  emojione: EmojioneOptions
}

export type VersionSplit = [number, number, number];

const isFunction = (fn: any): boolean => ({}.toString.call(fn) === '[object Function]');

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
  list: filters,
  order: 'auto'
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
  hidePickerOnBlur: true,
  picker: 'auto'
};

export const emojioneVersions: {[version: string]: string} = {
  latest: '4.0.0',
  v4: '4.0.0',
  v3: '3.1.2',
  v2: '2.2.7',
  v1: '1.5.0'
  // popular: '2.2.7', '3.1.2', '2.1.4', '4.0.0', '1.5.0' '4.5.0'
};

const defaultEmojioneOptions: EmojioneOptions = {
  version: 'v3',
  sprite: false,
  type: 'png',
  size: 32,
  path: 'auto',
  spritePath: 'auto',
  cdn: 'https://cdn.jsdelivr.net',
  paths: { // @TODO fix assets urls
    '4.5.0': '{cdn}/npm/emojione-assets@{version}/{type}/{size}/0023.png',
    '4.0.0': '{cdn}/npm/emojione-assets@{version}/{type}/{size}/0023.png',
    '3.1.2': '{cdn}/emojione/assets/3.1/png/{size}/{icon}.{type}',
    '2.2.7': '{cdn}/npm/emojione@{version}/emojione/assets/{type-size}/{emoji}.{type}', // 2.2.7 tested
    '2.1.4': '{cdn}/npm/emojione@{version}/emojione/assets/{type-size}/{emoji}.{type}', // 2.2.7 tested
    '1.5.0': '{cdn}/npm/emojione@{version}/assets/{type}/{emoji-upper}.{type}' // 1.5.0 tested
  },
  spritePaths: {}
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
type MergeFunc = (value: any | ((ver: VersionSplit) => string), ver: VersionSplit) => any;
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
  emojione: ['<@OBJ>', {
    paths: '<@OBJ>',
    spritePaths: '<@OBJ>'
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
          // reverse order, first merge plugin options, then global options and then default option
          'emoji': ['<@LAST>',
            (emoji: string | ((emojioneVer: VersionSplit) => string), emojioneVer: VersionSplit) => {
              return emoji && isFunction(emoji) ?
                (emoji as (emojioneVer: VersionSplit) => string) (emojioneVer) : emoji;
            }
          ]
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
 * @param {VersionSplit=} emojioneVer
 * @returns {Object}
 */
function mergeOptions(a: KeyObject, b: KeyObject, c: KeyObject, rules: MergeRules, emojioneVer?: VersionSplit): KeyObject {
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
              o[key] = mergeOptions(a[key], b[key], c[key], {} as MergeRules, emojioneVer);
              break;
            }

            else if (Array.isArray(rule)) {
              if (rule[0] === '<@OBJ>') {
                o[key] = mergeOptions(a[key], b[key], c[key], rule[1] as MergeRules, emojioneVer);
              }
              else if (rule[0] === '<@LAST>') {
                rule = rule[1];
              }
            }

            if (isFunction(rule)) {
              const val = (rule as MergeFunc)(merge[key], (emojioneVer as any));
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

/**
 * Gets result of merging of the plugin default options, user's global defined options and passed options to the instance
 * @param {Partial<AreaOptions|EditorOptions|PickerOptions|ButtonOptions>} options
 * @param {"area"|"editor"|"picker"|"button"="area"} context
 */
export function getOptions(options: Partial<AreaOptions|EditorOptions|PickerOptions|ButtonOptions>,
                           context: 'area'|'editor'|'picker'|'button' = 'area') {
  const globalConfig: KeyObject = (window as any).EmojioneArea.defaults;

  if (context !== 'button') {
    const emojioneCfg: EmojioneOptions = <EmojioneOptions>mergeOptions(defaultOptions.emojione as KeyObject,
      ((globalConfig as any).emojione || {}) as KeyObject, ((options as AreaOptions).emojione || {}) as KeyObject,
      ((mergeRules as any).emojione as MergeRuleSub)[1] as MergeRules);

    // get emojione version

    let v: string = emojioneCfg.version;
    if (emojioneVersions[v]) {
      v = emojioneVersions[v];
    }

    // get emojione CDN path

    if (emojioneCfg.path === 'auto') {
      if (emojioneCfg.paths[v]) {
        const path = emojioneCfg.paths[v];
        emojioneCfg.path = (isFunction(path) ? (path as ((k: any) => string))(emojioneCfg) : path) as string;
      } else {
        throw new Error('Unable to get CDN of emojione@v' + v);
      }

      const repl: any = {
        ...emojioneCfg,
        'type-size': emojioneCfg.size === 32 ? emojioneCfg.type : `${emojioneCfg.type}-${emojioneCfg.size}`
      };

      emojioneCfg.path.replace(/\{([a-z-]+)\}/g, (_, m) => repl[m]);
    }

    const ver: VersionSplit = <VersionSplit>v.split('.').map(a => parseInt(a));

    if (context !== 'area') {
      const cfg: EditorOptions|PickerOptions = <EditorOptions|PickerOptions>mergeOptions(defaultOptions.emojione as KeyObject,
        ((globalConfig as any).emojione || {}) as KeyObject, ((options as AreaOptions).emojione || {}) as KeyObject,
        ((mergeRules as any).emojione as MergeRuleSub)[1] as MergeRules, ver);
    }
  }
}
