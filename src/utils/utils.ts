type Callback = (e: Event) => void;

export interface ExtendedElement extends Element {
  css(style?: string): ExtendedElement;
  html(html: string): ExtendedElement;
  clear(): ExtendedElement;
  class(cls: string, rm?: boolean): ExtendedElement;
  value?: string;
  href?: string;
  checked?: boolean;
  dataset?: { [key: string]: string };
}

interface IUtils {
  actions: Record<string, Callback>;

  addEvent<T extends keyof WindowEventMap>(
    elem: string | ExtendedElement | HTMLElement,
    action: T,
    cb: Callback
  ): void;

  id(selector: string): NodeListOf<ExtendedElement> | ExtendedElement | null;

  create<T extends HTMLElement>(cls: string, type?: string): T;
}

export const Utils: IUtils = {
  actions: {},

  addEvent(el, action, cb) {
    const elem = (typeof el === "string" ? this.id(el) : el) as ExtendedElement;

    const params = { passive: true };
    const callback = (e: Event) => cb(e);
    const uniqKey = `${elem.className}-${action}-${cb}`;

    if (this.actions[uniqKey])
      elem.removeEventListener(action, this.actions[uniqKey]);

    elem.addEventListener(action, callback, params);

    this.actions[uniqKey] = callback;
  },

  id(selector) {
    const elems: NodeListOf<ExtendedElement> =
      document.querySelectorAll(selector);

    for (const elem of elems) {
      elem.css = (s) => {
        if (s) elem.setAttribute("style", s);
        else elem.removeAttribute("style");

        return elem;
      };

      elem.html = (h) => {
        elem.innerHTML = h;

        return elem;
      };

      elem.clear = () => {
        while (elem.firstChild) {
          elem.removeChild(elem.firstChild);
        }

        return elem;
      };

      elem.class = (c, rm = false) => {
        elem.classList[rm ? "remove" : "add"](c);

        return elem;
      };
    }

    if (elems.length === 1) return elems[0];
    if (elems.length) return elems;
    return null;
  },

  create<T extends HTMLElement>(classNM = "", type = "div"): T {
    const item = document.createElement(type);
    item.className = classNM;

    return item as T;
  }
};
