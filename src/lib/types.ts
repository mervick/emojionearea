export type Booleanish = boolean | 'true' | 'false';

export interface HTMLAttributes {
  checked?: Booleanish;
  value?: string | number | ReadonlyArray<string>;
  accesskey?: string;
  class?: string;
  contenteditable?: Booleanish | 'inherit';
  contextmenu?: string;
  dir?: 'auto' | 'ltr' | 'rtl';
  draggable?: Booleanish;
  hidden?: Booleanish;
  id?: string;
  lang?: string;
  placeholder?: string;
  slot?: string;
  spellcheck?: Booleanish;
  style?: any;
  tabindex?: number;
  title?: string;
  translate?: 'yes' | 'no';
  role?: string;
  type?: string;
  // https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/autocapitalize
  autocapitalize?: 'off' | 'none' | 'on' | 'sentences' | 'words' | 'characters';
  // https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete
  autocomplete?: 'off' | 'on' | 'name' | 'honorific-prefix' | 'given-name' | 'additional-name' | 'family-name' |
    'honorific-suffix' | 'nickname' | 'email' | 'username' | 'new-password' | 'current-password' | 'one-time-code' |
    'organization-title' | 'organization' | 'street-address' | 'address-line1' | 'address-line2' | 'address-line3' |
    'address-level4' | 'address-level3' | 'address-level2' | 'address-level1' | 'country' | 'country-name' |
    'postal-code' | 'cc-name' | 'cc-given-name' | 'cc-additional-name' | 'cc-family-name' | 'cc-number' | 'cc-exp' |
    'cc-exp-month' | 'cc-exp-year' | 'cc-csc' | 'cc-type' | 'transaction-currency' | 'transaction-amount' | 'language' |
    'bday' | 'bday-day' | 'bday-month' | 'bday-year' | 'sex' | 'tel' | 'tel-country-code' | 'tel-national' |
    'tel-area-code' | 'tel-local' | 'tel-extension' | 'impp' | 'url' | 'photo'
  ;

  // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Input#attr-autocorrect
  autocorrect?: 'on' | 'off';
}
