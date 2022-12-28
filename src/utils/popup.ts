export class PopupWindow {
  popup: HTMLElement;
  popupContent: HTMLElement;

  constructor() {
    this.popup = this.createDomNode('div', 'popup');
    this.popupContent = this.createDomNode('div', 'popup__content');
  }

  buildPopup(content: HTMLElement) {
    this.setContent(content);
    this.appendPopupElements();
    this.showPopup();
  }

  createDomNode<T extends HTMLElement>(element: string, ...classes: string[]): T{
    const node = document.createElement(element);
    node.classList.add(...classes);
    return node as T;
  }

  setContent(content: HTMLElement) {
    this.popupContent.innerHTML = '';
    this.popupContent.append(content);
  }

  appendPopupElements() {
    this.popup.append(this.popupContent);
  }

  showPopup() {
    document.body.append(this.popup);

    setTimeout(() => {
      this.popup.classList.add('popup--show')
    },  1000);

    setTimeout(this.closePopup, 5000);

  }

  closePopup() {
    const popup = document.querySelector('.popup');

    popup?.classList.remove('popup--show');

    popup?.addEventListener('transitionend', () => {
      document.querySelector('.popup')?.remove();
    })
  }
}
