import {JQ} from './jq';
import jq from './jq';

export function isFunction(fn: any): boolean {
  return {}.toString.call(fn) === '[object Function]';
}

export function(data: string | {[key: string]: string}, ...args: any[]) {
  const parent = jq('<div/>', typeof data === 'object' ? data : {"class" : prefix(data)});

  if (args) {
    args.forEach((item: any) => {
      if (item) {
        if (isFunction(item)) {
          const child: JQ = (item as ((parent: JQ) => void | JQ))(parent) as JQ;
          if (child) {
            JQ.append
          }
        } else {

        }
      }
    });
  }
  jq().each([].slice.call(arguments).slice(1), function(i, child) {
    if ($.isFunction(child)) {
      child = child.call(parent);
    }
    if (child) {
      $(child).appendTo(parent);
    }
  });
  return parent;
}

const cssClass: string = 'emojionearea-';

export function prefix(pref: string) {
  return pref.split(' ').map((a: string) => cssClass + a).join(' ');
}
