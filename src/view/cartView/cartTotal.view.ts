import { PROMO } from "types/promo";
import { Controller } from "../../controller";
import { Model } from "../../model";
import { ExtendedElement, Utils } from "../../utils/utils";

export class CartTotalView {
  constructor(private controller: Controller, private model: Model) {}

  render(root: HTMLElement) {
    const cartTotal = Utils.create<HTMLElement>(
      "cart-section__total-bill cart-total",
      "div"
    );
    const cartTotalWrapper = Utils.create<HTMLElement>(
      "cart-total__wrapper",
      "div"
    );

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
    const applied = [];
    for (const promo of this.model.promo) {
      applied.push(`
        <div class="cart-total__line">
          <span class="cart-total__line-text">${promo}</span>
          <span class="cart-total__line-value opacified">[${
            PROMO[promo as keyof typeof PROMO]
          }%]</span>
          <span class="cart-total__line-dashes"></span>
          <span class="icon icon--close" data-id="${promo}"></span>
        </div>
      `);
    }

    return `
      <div class="cart-total__promo-code promo-code">
          <div class="cart-total__line">
              <span class="cart-total__line-text">Promo for test</span>
              <span class="cart-total__line-dashes"></span>
              <span class="cart-total__line-value">RSS, HOBBIE</span>
          </div>


          <div class="promo-code__input">
              <input class="promo-code__text" type="text" id="promo-input" placeholder="Введите промокод">
              <input class="promo-code__button" type="submit" value="Применить">
          </div>

          <div class="promo-code__error"></div>

          <div class="promo-code__applied">${applied.join("")}</div>
      </div>`;
  }

  addCartPriceTotal() {
    const withPromo = !!this.model.promo.length;
    const withDiscount = this.model.totalDiscounted !== this.model.totalPrice;

    const discountedPrice = withPromo
      ? (
          this.model.totalDiscounted -
          this.model.totalDiscounted *
            this.model.promo.reduce((total, code) => {
              total += PROMO[code as keyof typeof PROMO] / 100;
              return total;
            }, 0)
        ).toFixed(2)
      : this.model.totalDiscounted;

    return (
      `<div class="cart-total__line cart-total__default-sum">
                <span class="cart-total__line-text cart-total__default-sum-text">Итого</span>
                <span class="cart-total__line-dashes"></span>
                <span class="cart-total__line-value cart-total__default-sum-value${
                  !withPromo && !withDiscount
                    ? " cart-total__default-sum-alone"
                    : ""
                }">${this.model.totalPrice}₽</span>
            </div>` +
      (withPromo || withDiscount
        ? `<div class="cart-total__line cart-total__discount-sum">
                <span class="cart-total__line-text cart-total__discount-sum-text">Со скидкой</span>
                <span class="cart-total__line-dashes"></span>
                <span class="cart-total__line-value cart-total__discount-sum-value">${discountedPrice}₽</span>
            </div>`
        : "")
    );
  }

  addCartOrderButton() {
    return `<div class="cart-total__button">
                <button class="button button--colored" id="order">Оформить заказ</button>
            </div>`;
  }

  addHandlers() {
    const promo = Utils.id(".promo-code__button");
    const applied = Utils.ids(".icon--close");
    const purchase = Utils.id("#order");

    if (promo !== null) {
      Utils.addEvent(promo as ExtendedElement, "click", () => {
        this.controller.applyPromo(
          (Utils.id("#promo-input") as ExtendedElement).value!
        );
      });
    }

    if (applied !== null) {
      for (const apply of applied) {
        Utils.addEvent(apply, "click", () => {
          this.controller.removePromo(apply.dataset!.id);
        });
      }
    }

    if (purchase !== null) {
      Utils.addEvent(purchase as ExtendedElement, "click", () => {
        this.controller.makeOrder();
      });
    }
  }
}
