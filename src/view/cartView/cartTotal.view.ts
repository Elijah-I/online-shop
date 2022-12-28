import { Controller } from "../../controller";
import { Model } from "../../model";
import { ExtendedElement, Utils } from "../../utils/utils";

export class CartTotalView {
  constructor(private controller: Controller, private model: Model) {
  }

  render(root: HTMLElement) {
    const cartTotal = Utils.create<HTMLElement>("cart-section__total-bill cart-total", "div");
    const cartTotalWrapper = Utils.create<HTMLElement>("cart-total__wrapper", "div");

    this.fill(cartTotalWrapper);

    cartTotal.append(cartTotalWrapper);
    root.append(cartTotal);

    this.addHandlers();
  }

  fill(root: HTMLElement) {
    let template = ``;

    template += this.addTitle();

    template += this.addCartTotalContent();

    root.innerHTML = template;
  }

  addTitle() {
    return `<h3 class="cart-total__title title">Детали заказа</h3>`;
  }

  addCartTotalContent() {
    let template = `<div class="cart-total__content">`;

    template += this.addCartStockTotal();
    template += this.addPromoCode();
    template += this.addCartPriceTotal();
    template += this.addCartOrderButton();

    template += `</div>`;

    return template;
  }

  addCartStockTotal() {
    return `<div class="cart-total__line">
                <span class="cart-total__line-text">Количество</span>
                <span class="cart-total__line-dashes"></span>
                <span class="cart-total__line-value">${this.model.cartStockTotal}шт.</span>
            </div>`;
  }

  addPromoCode() {
    return `<div class="cart-total__promo-code promo-code">
                                    <div class="cart-total__line">
                                        <span class="cart-total__line-text">Промокод</span>
                                        <span class="cart-total__line-dashes"></span>
                                        <span class="cart-total__line-value">
                                            <span class="icon icon--arrow-right"></span>
                                        </span>
                                    </div>


                                    <div class="promo-code__input">
                                        <input class="promo-code__text" type="text" id="promo-input" placeholder="Введите промокод">
                                        <input class="promo-code__button" type="submit" value="Применить">
                                    </div>

                                    <div class="promo-code__applied">
                                      <div class="cart-total__line">
                                        <span class="cart-total__line-text">RSS</span>
                                        <span class="cart-total__line-value">20%</span>
                                        <span class="cart-total__line-dashes"></span>
                                        <span class="icon icon--close" id="promo-1"></span>
                                      </div>
                                      <div class="cart-total__line">
                                        <span class="cart-total__line-text">HOBBIE</span>
                                        <span class="cart-total__line-value">10%</span>
                                        <span class="cart-total__line-dashes"></span>
                                        <span class="icon icon--close" id="promo-2"></span>
                                      </div>
                                    </div>
                                </div>`;
  }

  addCartPriceTotal() {
    return `<div class="cart-total__line cart-total__default-sum">
                <span class="cart-total__line-text cart-total__default-sum-text">Итого</span>
                <span class="cart-total__line-dashes"></span>
                <span class="cart-total__line-value cart-total__default-sum-value">${this.model.totalPrice}₽</span>
            </div>

            <div class="cart-total__line cart-total__discount-sum">
                <span class="cart-total__line-text cart-total__discount-sum-text">Со скидкой</span>
                <span class="cart-total__line-dashes"></span>
                <span class="cart-total__line-value cart-total__discount-sum-value">${this.model.totalDiscounted}₽</span>
            </div>`
  }

  addCartOrderButton() {
    return `<div class="cart-total__button">
                <button class="button button--colored" id="order">Оформить заказ</button>
            </div>`
  }

  addHandlers() {
    const purchase = Utils.id("#order");

    if (purchase !== null)
      Utils.addEvent(purchase as ExtendedElement, "click", () => {
        this.controller.makeOrder();
      });
  }
}
