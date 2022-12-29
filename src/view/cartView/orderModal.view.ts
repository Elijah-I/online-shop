import { Controller } from "../../controller";
import { Model } from "../../model";
import { ModalWindow } from "../../utils/modal";
import { ExtendedElement, Utils } from "../../utils/utils";
import { Card } from "types/card";
import { PopupWindow } from "../../utils/popup";

export class OrderModalView{
  modal: ModalWindow;

  constructor(private controller: Controller, private model: Model) {
    this.modal = new ModalWindow();
  }

  render() {
    const order = Utils.create<HTMLElement>("order", "div");

    this.fill(order);
    this.modal.buildModal(order);
    this.addHandlers();
  }

  fill(root: HTMLElement) {
    let template = ``;
    template += this.addTitle();
    template += this.addOrderForm();
    root.innerHTML = template;
  }

  addTitle() {
    return `<h3 class="order__title title">Данные для доставки</h3>`;
  }

  addOrderForm() {
    const template = `<form class='order__form order-form' id="order-form">
                       <div class="order-form__row">
                               <label for="full-name" class="order-form__label">
                                   <span class="order-form__text">
                                       Имя и фамилия
                                       <span class="order-form__required">*</span>
                                   </span>
                                   <input type='text' id="full-name" class='order-form__input' placeholder="Иван Иванов" required>
                               </label>
                       </div>
                       <div class="order-form__column">
                           <div class="order-form__row">
                               <label for="phone-number" class="order-form__label">
                                   <span class="order-form__text">
                                       Телефон
                                       <span class="order-form__required">*</span>
                                   </span>
                                   <input type='text' id="phone-number" class='order-form__input' placeholder="(123) 456-78-90" required>
                               </label>
                           </div>
                           <div class="order-form__row">
                               <label for="email" class="order-form__label">
                                   <span class="order-form__text">
                                       Email
                                       <span class="order-form__required">*</span>
                                   </span>
                                   <input type='email' id="email" placeholder="name@email.com" class='order-form__input' required>
                               </label>
                           </div>
                       </div>
                       <div class="order-form__row">
                           <label for="address" class="order-form__label">
                               <span class="order-form__text">
                                   Адрес доставки
                                   <span class="order-form__required">*</span>
                               </span>
                               <input type='text' id="address" class='order-form__input' placeholder="г. Санкт-Петербург" required>
                           </label>
                       </div>
                       <div class="order-form__row card">
                           <div class="card__content">
                               <div class="card__row">
                                   <label for="card-number" class="card__label">
                                       <span class="card__text">Номер карты</span>
                                       <input type='tel' id="card-number" class='card__input' placeholder='1234 5678 9123 4567' maxlength="19" required>
                                   </label>

                                   <div class="card__logo">
                                       <span class="icon icon--default"></span>
                                   </div>
                               </div>
                               <label for="card-cardholder" class="card__label">
                                   <span class="card__text">Владелец</span>
                                   <input type='text' id="card-cardholder" class='card__input' placeholder="IVAN IVANOV" size="20" required>
                               </label>
                               <div class="card__row">
                                   <label for="card-exp-month" class="card__label">
                                       <span class="card__text">Действительна до</span>
                                       <span class="card__input-columns">
                                           <input type='text' id="card-exp-month" class='card__input' placeholder="00" maxlength="2" size="2" required>
                                           <span>/</span>
                                           <input type='text' id="card-exp-year" class='card__input' placeholder="00" maxlength="2" size="2" required>
                                       </span>
                                   </label>
                                   <label for="card-cvc" class="card__label">
                                       <span class="card__text">CVC</span>
                                       <input type='text' id="card-cvc" class='card__input' placeholder="000" maxlength="3" size="3" required>
                                   </label>
                               </div>
                           </div>
                       </div>
                       <input type='submit' class='order-form__button' value='Подтвердить'>
                   </form>`;
    return template;
  }

  addHandlers() {
    this.addCardFieldsHandlers();
    this.addOrderFieldsHandlers();
    this.addSubmitHandler();
  }

  addOrderFieldsHandlers() {
    Utils.addEvent('#full-name', "input",
      (e: Event) => this.handleTextValidation(e)
    );
    Utils.addEvent('#phone-number', "input",
      (e: Event) => this.convertPhoneNumber(e)
    );
    Utils.addEvent('#full-name', "focusout",
      (e: Event) => this.handleFullNameValidation(e)
    );
    Utils.addEvent('#email', "focusout",
      (e: Event) => this.handleEmailValidation(e)
    );
    Utils.addEvent('#phone-number', "focusout",
      (e: Event) => this.handlePhoneValidation(e)
    );
    Utils.addEvent('#address', "focusout",
      (e: Event) => this.handleAddressValidation(e)
    );
  }

  addCardFieldsHandlers() {
    const cardLogo = Utils.id(".card__logo .icon") as ExtendedElement;

    Utils.addEvent('#card-number', "focusout",
      (e: Event) => this.handleCardNumberValidation(e)
    );
    Utils.addEvent('#card-number', "input",
      (e: Event) => this.convertCardNumber(e, cardLogo)
    );

    Utils.addEvent('#card-cardholder', "focusout",
      (e: Event) => this.handleCardholderNameValidation(e)
    );
    Utils.addEvent('#card-cardholder', "input",
      (e: Event) => {
        this.handleTextValidation(e);
        this.convertCardholderName(e);
      }
    );

    Utils.addEvent('#card-exp-month', "focusout",
      (e: Event) => this.handleCardExpMonthValidation(e)
    );
    Utils.addEvent('#card-exp-month', "input",
      (e: Event) => this.handleNumberValidation(e)
    );

    Utils.addEvent('#card-exp-year', "focusout",
      (e: Event) => this.handleCardExpYearValidation(e)
    );
    Utils.addEvent('#card-exp-year', "input",
      (e: Event) => this.handleNumberValidation(e)
    );

    Utils.addEvent('#card-cvc', "focusout",
      (e: Event) => this.handleCardCvcValidation(e)
    );
    Utils.addEvent('#card-cvc', "input",
      (e: Event) => this.handleNumberValidation(e)
    );
  }

  addSubmitHandler() {
    const form = document.querySelector('#order-form');

    form?.addEventListener('submit',  (e: Event) => {
      e.preventDefault()
      const errors = document.querySelectorAll('.error');
      if (errors.length) {
        this.addErrorPopup();
      } else {
        this.controller.resetCart();
        this.modal.removeModal();
        const href = "http://localhost:3000/";
        this.controller.route(href); // TODO redirect to main page
        this.addOrderPopup();
      }
    })
  }

  addErrorPopup() {
    const error = Utils.create<HTMLElement>("error-popup", "div");
    error.innerHTML = "Пожалуйста, проверьте правильность введенных данных и повторите попытку.";
    const popup = new PopupWindow();
    popup.buildPopup(error);
  }

  addOrderPopup() {
    const order = Utils.create<HTMLElement>("order-popup", "div");
    order.innerHTML = "Заказ успешно оформлен! Спасибо за покупку!";
    const popup = new PopupWindow();
    popup.buildPopup(order);
  }

  handleTextValidation(e: Event) {
    const charsRegExp = /[^A-Za-zА-Яа-я\s]/g;
    const target = e.target as HTMLInputElement;
    target.value = target.value.replace(charsRegExp, '')
  }

  handleNumberValidation(e: Event) {
    const spaceRegExp = /\D/g;
    const target = e.target as HTMLInputElement;
    if (target.value.length){
      target.value = target.value
        .replace(spaceRegExp, '')
    }
  }

  convertPhoneNumber(e: Event) {
    const target = e.target as HTMLInputElement;
    let temp = target.value;

    if (target.value.length) {
      temp = target.value.replace(/[-+\s.( )]/g, '');
      const chunks = temp.match(/(\d?)(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/)!;
      if (chunks[3]) {
        target.value = '+' + chunks[1] + ' (' + chunks[2] + ') ' + chunks[3] + (chunks[4] ? '-' + chunks[4] : '') + (chunks[5] ? '-' + chunks[5] : '')
      } else {
        target.value = '+' + chunks[1] + (chunks[2] ? chunks[2] : '');
      }
    }
  }

  convertCardNumber(e: Event, cardLogo: ExtendedElement) {
    const target = e.target as HTMLInputElement;

    if (target.value.length){
      target.value = target.value
        .replace(/\D/g, '')
    }

    if (target.value.length >= 4){
      target.value = target.value
        .match(/.{1,4}/g)!
        .join(' ')
    }

    cardLogo.className = `${Card.DEFAULT}`;

    switch (target.value[0]) {
      case '3':
        cardLogo.classList.add(`${Card.AMERICAN_EXPRESS}`);
        break;
      case '4':
        cardLogo.classList.add(`${Card.VISA}`);
        break;
      case '5':
        cardLogo.classList.add(`${Card.MASTERCARD}`);
        break;
      default:
        cardLogo.classList.add(`${Card.DEFAULT}`);
        break;
    }
  }

  convertCardholderName(e: Event) {
    const target = e.target as HTMLInputElement;

    if (target.value.length){
      target.value = target.value
        .toUpperCase();
    }
  }

  handleFullNameValidation(e: Event) {
    const fullNameRegExp = /^[А-Яа-я]{3,} [А-Яа-я]{3,}/;

    const target = e.target as HTMLInputElement;

    this.removeErrorMessage(target);

    if (fullNameRegExp.test(target.value)){
      this.addCorrectMessage(target);
    } else {
      this.addErrorMessage(target, 'Два слова, каждое не менее 3 букв (русская раскладка)');
    }
  }

  handleEmailValidation(e: Event) {
    const emailRegExp = /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/;

    const target = e.target as HTMLInputElement;

    this.removeErrorMessage(target);

    if (emailRegExp.test(target.value)){
      this.addCorrectMessage(target);
    } else {
      this.addErrorMessage(target, 'Попробуйте еще раз');
    }
  }

  handlePhoneValidation(e: Event) {
    const phoneRegExp = /^(\+(\d{0,3})) (\((\d{0,3})\)) (\d{0,3})-(\d{0,2})-(\d{0,2})/gm;
    const target = e.target as HTMLInputElement;

    this.removeErrorMessage(target);

    if (phoneRegExp.test(target.value)){
      this.addCorrectMessage(target);
    } else {
      this.addErrorMessage(target, 'Попробуйте еще раз');
    }
  }

  handleAddressValidation(e: Event) {
    const addressRegExp = /^[А-Яа-я.-]{5,} [А-Яа-я]{5,} [А-Яа-я]{5,}/;
    const target = e.target as HTMLInputElement;

    this.removeErrorMessage(target);

    if (addressRegExp.test(target.value)){
      this.addCorrectMessage(target);
    } else {
      this.addErrorMessage(target, 'Три слова, каждое не менее 5 букв (русская раскладка)');
    }
  }

  handleCardNumberValidation(e: Event) {
    const cardNumberRegExp = /(\d{4}) (\d{4}) (\d{4}) (\d{4})/;
    const target = e.target as HTMLInputElement;

    this.removeErrorMessage(target);

    if (cardNumberRegExp.test(target.value)){
      this.addCorrectMessage(target);
    } else {
      this.addErrorMessage(target, '16 цифр');
    }
  }

  handleCardholderNameValidation(e: Event) {
    const fullNameRegExp = /([A-Z]+) ([A-Z]+)/;
    const target = e.target as HTMLInputElement;

    this.removeErrorMessage(target);

    if (fullNameRegExp.test(target.value)){
      this.addCorrectMessage(target);
    } else {
      this.addErrorMessage(target, 'Как указано на карте');
    }
  }

  handleCardExpMonthValidation(e: Event) {
    const cardExpMonthRegExp = /(0[1-9]|1[0-2])/;
    const target = e.target as HTMLInputElement;

    this.removeCardErrorMessage(target);

    if (!cardExpMonthRegExp.test(target.value)){
      this.addCardErrorMessage(target);
    }
  }

  handleCardExpYearValidation(e: Event) {
    const cardExpYearRegExp = /(2[2-9]|3[0-9]|4[0-9]|5[0-9]|6[0-9]|7[0-9]|8[0-9]|9[0-9])/;
    const target = e.target as HTMLInputElement;

    this.removeCardErrorMessage(target);

    if (!cardExpYearRegExp.test(target.value)){
      this.addCardErrorMessage(target);
    }
  }

  handleCardCvcValidation(e: Event) {
    const cardCvcRegExp = /[0-9]{3}/;

    const target = e.target as HTMLInputElement;

    this.removeCardErrorMessage(target);

    if (!cardCvcRegExp.test(target.value)){
      this.addCardErrorMessage(target);
    }
  }

  addErrorMessage(target: HTMLInputElement, message: string) {
    target.style.borderColor = 'red';

    const error = Utils.create('error', 'span');
    error.style.color = 'red'
    error.style.paddingLeft = '5px';
    error.style.fontSize = "1.2rem";
    error.innerHTML = message;
    target.previousElementSibling?.append(error)
  }

  removeErrorMessage(target: HTMLInputElement) {
    const error = target.previousElementSibling?.querySelector('.error')
    error?.remove()
  }

  addCorrectMessage(target: HTMLInputElement) {
    target.style.borderColor = 'green';
  }

  addCardErrorMessage(target: HTMLInputElement) {
    target.parentElement?.classList.add('error');
    target.style.color = 'red';
  }

  removeCardErrorMessage(target: HTMLInputElement) {
    target.parentElement?.classList.remove('error');
    target.style.color = '';
  }
}
