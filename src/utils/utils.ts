type NodeList = NodeListOf<Element>

export const Utils = {
  /*
  actions: [],

  addEvent(elem: string | NodeList, action: string, func) {
    if (typeof elem === "string") elem = this.id(elem)

    const params = { passive: true }
    const uniqKey = `${elem.className}-${action}-${func}`
    const callback = (e) => func(e)

    if (this.actions[uniqKey])
      elem.removeEventListener(action, this.actions[uniqKey])

    elem.addEventListener(action, callback, params)

    this.actions[uniqKey] = callback
  },
  */

  id(selector: string) {
    const elems: NodeList = document.querySelectorAll(selector)

    for (let elem of elems) {
      elem.css = (s) => {
        if (s) elem.setAttribute("style", s)
        else elem.removeAttribute("style")
        return elem
      }
      elem.html = (h) => {
        elem.innerHTML = h
        return elem
      }
      elem.clear = () => {
        while (elem.firstChild) elem.removeChild(elem.firstChild)
        return elem
      }
    }

    return elems.length === 1 ? elems[0] : elems.length ? elems : null
  }

  /*
  create(classNM = "", type = "div") {
    const item = document.createElement(type)
    item.className = classNM
    return item
  }
  */
}
