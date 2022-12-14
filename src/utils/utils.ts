type Callback = (e: Event) => void;

export interface ExtendedElement extends Element {
  css(style?: string): ExtendedElement;
  html(html: string): ExtendedElement;
  clear(): ExtendedElement;
  class(cls: string, rm?: boolean): ExtendedElement;
}

interface IUtils {
  actions: Record<string, Callback>;

  addEvent<T extends keyof WindowEventMap>(
    elem: string | ExtendedElement,
    action: T,
    cb: Callback
  ): void;

  id(selector: string): NodeListOf<ExtendedElement> | ExtendedElement | null;

  create(cls: string, type?: string): HTMLElement;
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

    for (let elem of elems) {
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

  create(classNM = "", type = "div") {
    const item: HTMLElement = document.createElement(type);
    item.className = classNM;

    return item;
  }
};
