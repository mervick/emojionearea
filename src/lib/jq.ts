
export type JQNodes = HTMLElement | HTMLElement[] | HTMLCollection | NodeList | string;
export type JQOptions = {[key: string]: any};

class JQ {
  // isJQ = true;
  list: HTMLElement[];

  constructor(nodes: JQNodes, options?: JQOptions) {
    let elements: HTMLElement[] = [];

    if (nodes) {
      const $type = typeof nodes;

      if ($type === 'string') {
        const first = (nodes as string)[0] || '';
        if (first === '.') {
          elements = <HTMLElement[]>Array.from(document.getElementsByClassName((nodes as string).substr(1)));
        }
        else if (first === '<') {
          const element = document.createElement((nodes as string).substr(1, -2));
          elements.push(element);
          if (options) {
            Object.keys(options).forEach((prop: string) => {
              element.setAttribute(prop, options[prop]);
            });
          }
        }
        else {
          elements = <HTMLElement[]>Array.from(document.getElementsByTagName(<string>nodes));
        }
      }

      else if ($type === 'object') {
        if (Array.isArray(nodes)) {
          elements = <HTMLElement[]>nodes;
        } else {
          const str = Object.prototype.toString.call(nodes);

          const isCollection = nodes === 'object' &&
            /^\[object (HTMLCollection|NodeList|Object)\]$/.test(str) &&
            (typeof (nodes as any).length === 'number') &&
            ((nodes as any).length === 0 || (typeof nodes[0] === 'object' && ((nodes as any) as NodeList)[0].nodeType > 0));

          if (isCollection) {
            elements = <HTMLElement[]>Array.from(<any>nodes);
          } else {
            elements.push(<HTMLElement>nodes);
          }
        }
      }
    }

    this.list = elements;
  }

  attr(attr: string | {[key: string]: string}, value?: string): JQ {
    const $type = typeof attr;
    this.list.forEach((element: HTMLElement) => {
      if ($type === 'object') {
        Object.keys(attr).forEach((key: string) => {
          element.setAttribute(key, (attr as {[key: string]: string})[key]);
        });
      } else {
        element.setAttribute((attr as string), (value as string));
      }
    });
    return this;
  }

  text(content: string): JQ {
    if (this.list.length) { // only first element
      this.list[0].innerText = content;
    }
    return this;
  }

  html(content: string): JQ {
    if (this.list.length) { // only first element
      this.list[0].innerHTML = content;
    }
    return this;
  }

  addClass(className: string): JQ {
    if (this.list.length) { // only first element
      this.list[0].classList.add(className);
    }
    return this;
  }

  removeClass(className: string): JQ {
    if (this.list.length) { // only first element
      this.list[0].classList.remove(className);
    }
    return this;
  }

  children(selector: string): JQ {
    const list: HTMLElement[] = [];

    if (this.list.length) { // only first element
      if (selector[0] === '.') { // only class
        // const regex = new RegExp('(?:^|\s)' + selector.substr(1).replace(/\-/g, '\\-') + '(?:\s|$)');
        const classes: string[] = selector.substr(1).split('.');

        for (let i: number = 0; i < this.list[0].childNodes.length; i++) {
          const node: HTMLElement = <HTMLElement>this.list[0].childNodes[i];
          const classList: string[] = node.className.split(' ');

          // regex.test(node.className) && child.push(node);
          if (classes.every((className: string) => classList.indexOf(className) !== -1)) {
            list.push(node);
          }
        }
      }
    }

    return jq(list);
  }

  remove() {
    this.list.forEach((element: HTMLElement) => {
      element.remove()
    });
    this.list = [];
  }

  toArray() {
    return this.list;
  }
}

export default function jq(nodes?: JQNodes, options?: JQOptions): JQ {
  return new JQ(nodes || [], options);
}
