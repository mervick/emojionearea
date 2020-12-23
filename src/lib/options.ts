
export interface EditorOptions {
  inline: boolean,
  standalone: boolean
}

export interface ParserOptions {
  shortnames: boolean,
  images: boolean,
  unicode: boolean,
  html: boolean | string | string[]
}

export interface ButtonOptions {
  openIcon: string | HTMLElement,
  closeIcon: string | HTMLElement
}

export type PickerPositionOption = 'top' | 'bottom' | 'left' | 'right' | 'auto';
export type PickerFiltersPositionOption = 'top' | 'bottom';
export type PickerSearchPositionOption = 'top' | 'bottom';

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

export interface PickerOptions {
  template: string | PickerTemplateFunc,
  recent: boolean,
  tones: boolean,
  search: boolean,
  searchPlaceholder: string,
  position: PickerPositionOption,
  global: boolean
  filtersPosition: PickerFiltersPositionOption,
  searchPosition: PickerSearchPositionOption
}

export interface EmojioneOptions {
  version: string | 'latest',
  sprite: boolean, // works only with svg and only with emojione version < 2.1.2
  path: string
}

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
  parser: ParserOptions,
  saver: ParserOptions,
  button: boolean | ButtonOptions,
  picker: boolean | PickerOptions,
  emojione: EmojioneOptions
}

export const DefaultAreaOptions: AreaOptions = {
  template: '<area><editor/><button/></area><picker/>',
  editor: {
    inline: false,
    standalone: false
  },
  parser: {
    shortnames: true,
    images: false,
    unicode: true,
    html: false
  },
  picker: {
    template: '<picker><filters/><panel><search/><tones/></panel><scroll><recent/><emojis/></scroll></picker>',
    recent: true,
    tones: true,
    search: true,
    searchPlaceholder: 'Search',
    position: 'auto',
    global: true,
    filtersPosition: 'top',
    searchPosition: 'top'
  }
};
