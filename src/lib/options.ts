
import {filters} from './defaultFilters';

export interface ParserOptions {
  shortnames: boolean,
  images: boolean,
  unicode: boolean,
  html: boolean | string | string[],
  parser: ((input: string) => string) | null
}

export const DefaultParserOptions: ParserOptions = {
  shortnames: true,
  images: false,
  unicode: true,
  html: false,
  parser: null
};

export interface SaverOptions {
  saveAs: 'unicode' | 'shortname' | 'html',
  html: boolean | string | string[],
  nl: 'lf' | 'crlf' | 'cr',
  saver: ((html: string) => string) | null
}

export const DefaultSaverOptions: SaverOptions = {
  saveAs: 'unicode',
  html: false,
  nl: 'lf',
  saver: null
};

export interface ButtonOptions {
  openIcon: string | HTMLElement | 'default',
  closeIcon: string | HTMLElement | 'default',
  title: string | null
}

export const DefaultButtonOptions: ButtonOptions = {
  openIcon: 'default',
  closeIcon: 'default',
  title: null
};

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

export const DefaultPickerFiltersOptions: PickerFiltersOptions = {
  position: 'top',
  list: filters,
  order: 'auto'
};

export type PickerTemplateFunc = (elements: PickerTemplateFuncElements) => string;

export interface PickerSearchOptions {
  placeholder: string,
  position: PickerSearchPositionOption
}

export const DefaultPickerSearchOptions: PickerSearchOptions = {
  placeholder: 'Search',
  position: 'top'
};

export type PickerTones = 'bullet' | 'radio' | 'square' | 'checkbox';

export interface PickerOptions {
  template: string | PickerTemplateFunc,
  global: boolean,
  position: PickerPositionOption,
  recent: false | number | 'auto',
  tones: false | PickerTones,
  search: false | PickerSearchOptions,
  filters: PickerFiltersOptions,
}

export const DefaultPickerOptions: PickerOptions = {
  template: '<picker><filters/><panel><search/><tones/></panel><scroll><recent/><emojis/></scroll></picker>',
  global: false,
  position: 'auto',
  recent: 'auto',
  tones: 'bullet',
  search: DefaultPickerSearchOptions,
  filters: DefaultPickerFiltersOptions
};

export interface EditorOptions {
  inline: boolean | 'auto',
  standalone: boolean,
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

export const DefaultEditorOptions: EditorOptions = {
  inline: 'auto',
  standalone: false,
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
  parser: DefaultParserOptions,
  saver: DefaultSaverOptions,
  hidePickerOnBlur: true,
  picker: 'auto'
};

export interface EmojioneVersionsEnum {
  latest: string,
  v4: string,
  v3: string,
  v2: string,
  v1: string
}

export const EmojioneVersions: EmojioneVersionsEnum = {
  latest: '4.0.0',
  v4: '4.0.0',
  v3: '3.1.2',
  v2: '2.2.7',
  v1: '1.5.0'
  // popular: '2.2.7', '3.1.2', '2.1.4', '4.0.0', '1.5.0' '4.5.0'
};

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

export const DefaultEmojioneOptions: EmojioneOptions = {
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

export interface AreaTemplateFuncElements {
  area: HTMLElement,
  editor: HTMLElement,
  button: HTMLElement,
  picker: HTMLElement
}

export type AreaTemplateFunc = (elements: AreaTemplateFuncElements) => string;

export interface AreaOptions {
  template: string | AreaTemplateFunc,
  editor: EditorOptions,
  button: ButtonOptions | false,
  picker: PickerOptions | false,
  emojione: EmojioneOptions
}

export const DefaultOptions: AreaOptions = {
  template: '<area><editor/><button/></area><picker/>',
  editor: DefaultEditorOptions,
  button: DefaultButtonOptions,
  picker: DefaultPickerOptions,
  emojione: DefaultEmojioneOptions
};
