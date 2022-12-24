import { ExtendedElement, Utils } from "../../utils/utils";
import {Controller} from "../../controller";
import {Model} from "../../model";
import { CartListView } from "./cartList.view";
import { CartTotalView } from "./cartTotal.view";

export class CartView {
  cartRoot: HTMLElement;
  breadcrumbsNav: HTMLElement;
  cartWrapper: HTMLElement;
  cartList: CartListView;
  cartTotal: CartTotalView;

  constructor(
      private controller: Controller,
      private model: Model,
      private root: ExtendedElement,
      private onCartUpdate: (a: number, s: number, d: number) => void
  ) {
    this.breadcrumbsNav = Utils.create<HTMLElement>("breadcrumbs-nav", "div");
    this.cartWrapper = Utils.create<HTMLElement>("cart-wrapper", "div");
    this.cartList = new CartListView(this.controller, this.model);
    this.cartTotal = new CartTotalView(this.controller, this.model);

    this.cartRoot = Utils.create<HTMLElement>("cart-section", "section");
    this.addListeners();
  }

  addListeners() {
    this.model.on("cart.reset", () => this.render());
  }

  render() {
    this.root.html("");

    if (this.model.cartIds.length) {
      this.fillBreadcrumbsNav();
      this.cartWrapper.append(this.breadcrumbsNav, this.cartRoot)
      this.root.append(this.cartWrapper);

      this.cartList.render(this.cartRoot);
      this.cartTotal.render(this.cartRoot);

    } else {
      this.root.html("You have no product in your cart.");
    }
  }

  fillBreadcrumbsNav() {
    this.breadcrumbsNav.innerHTML = `
      <ul class="breadcrumbs-nav__list">
        <li class="breadcrumbs-nav__item"><a class="bread__link" href="/">Главная</a></li>
        <li class="breadcrumbs-nav__item"><a href="#" onClick="return(false);">Моя корзина</a></li>
      </ul>`;
  }
}
