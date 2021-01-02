import {JQ} from './lib/jq';
import {div} from './lib/utils';
import {getAttributes} from './lib/utils';
import {EditorOptions} from './lib/options';
import {getOptions} from './lib/options';

export default class editor {
  source: HTMLInputElement | HTMLElement;
  isInput: boolean;
  editor: JQ;
  options: EditorOptions;

  constructor(element: HTMLInputElement | HTMLElement, options?: Partial<EditorOptions>) {
    this.source = element;
    const attributes = getAttributes(element);

    // get element value
    const type: string = element.tagName.toLowerCase();
    this.isInput = type === 'input' || type === 'textarea';
    const inputValue = this.isInput ? (element as HTMLInputElement).value : element.innerHTML;

    if (this.isInput) {
      delete attributes.type;
      delete attributes.value;
    }

    const o = this.options = getOptions(options || {}, 'editor') as EditorOptions;

    this.editor = div({
      tabindex: 0,
      ...attributes,
      ...o.attributes,
      suffix: 'editor',
      contenteditable: true
    });

  }
}
