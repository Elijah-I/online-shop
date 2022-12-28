export class ModalWindow {
  modal: HTMLElement;
  modalContent: HTMLElement;
  modalCloseButton: HTMLElement;
  overlay: HTMLElement;

  constructor() {
    this.overlay = this.createDomNode('div', 'overlay', 'overlay--modal');
    this.modal = this.createDomNode('div', 'modal');
    this.modalContent = this.createDomNode('div', 'modal__content');
    this.modalCloseButton = this.createDomNode('span', 'modal__close-icon', 'icon', 'icon--close');
  }

  buildModal(content: HTMLElement) {
    this.setContent(content);
    this.appendModalElements();
    this.bindCloseModalEvents();
    this.openModal();
  }

  createDomNode<T extends HTMLElement>(element: string, ...classes: string[]): T{
    const node = document.createElement(element);
    node.classList.add(...classes);
    return node as T;
  }

  setContent(content: HTMLElement) {
    this.modalContent.innerHTML = '';
    this.modalContent.append(content);
  }

  appendModalElements() {
    this.modal.append(this.modalCloseButton);
    this.modal.append(this.modalContent);
    this.overlay.append(this.modal);
  }

  bindCloseModalEvents() {
    this.modalCloseButton.addEventListener('click', (e: Event) => this.closeModal(e));
    this.overlay.addEventListener('click', (e: Event) => this.closeModal(e))
  }

  openModal() {
    document.body.append(this.overlay);
    document.body.classList.add('body--scroll__disable');
  }

  closeModal(e: Event) {
    if(e){
      const target = e.target as HTMLElement;
      const classes = target.classList;
      if(classes.contains('overlay') || classes.contains('modal__close-icon')){
        this.removeModal();
      }
    }
  }

  removeModal() {
    document.querySelector('.overlay')?.remove();
    document.body.classList.remove('body--scroll__disable');
  }
}
