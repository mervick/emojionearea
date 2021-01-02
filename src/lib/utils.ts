import {JQ} from './jq';
import jq from './jq';
import {HTMLAttributes} from './types';

export function isFunction(fn: any): boolean {
  return {}.toString.call(fn) === '[object Function]';
}

interface HTMLAttributesExtra extends HTMLAttributes {
  suffix: string
}

export function div(data: string | HTMLAttributesExtra, ...args: any[]): JQ {
  let attrs: HTMLAttributes = {};
  let suf: string = data as any as string;

  if (typeof data === 'object') {
    const {
      suffix,
      ...rest
    } = data;
    attrs = rest as HTMLAttributes;
    suf = suffix;
  }
  attrs['class'] = [].concat(prefix(suf) as any, (attrs['class'] as any) || []).join(' ');

  const parent: JQ = jq('<div/>', attrs);

  if (args) {
    args.forEach((item: any) => {
      if (item) {
        if (isFunction(item)) {
          const child: JQ = (item as ((parent: JQ) => void | JQ))(parent) as JQ;
          child && parent.append(child);
        } else {
          parent.append(item);
        }
      }
    });
  }

  return parent;
}

const cssClass: string = 'emojionearea-';

export function prefix(pref: string): string {
  return pref.split(' ').map((a: string) => cssClass + a).join(' ');
}

export function getAttributes(element: HTMLElement): HTMLAttributes {
  const attrs = element.attributes;
  const attributes: {[key: string]: string} = {};

  for (let i = attrs.length - 1; i >= 0; i--) {
    attributes[attrs[i].name] = attrs[i].value;
  }

  return attributes;
}

// export registerEvents