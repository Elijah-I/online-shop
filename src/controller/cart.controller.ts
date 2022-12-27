import { Model } from "../model/index";
import { RouterController } from "./router.controller";

export class CartController {
  constructor(
    private model: Model,
    private routerController: RouterController
  ) {}

  toggle(id: number) {
    this.model.toggleCart(id);
    this.model.applyCart();
  }

  quickBuy(e: Event, id: number, href: string) {
    e.preventDefault();
    localStorage.setItem("with.popup", "1");
    if (!this.model.inCart(id)) this.model.toggleCart(id);
    this.routerController.route(href, e);
  }

  resetCart() {
    this.model.resetCart();
  }

  changeQantity(id: number, qantity: number) {
    this.model.changeQantity(id, qantity);
  }

  switchPage(direction: number) {
    this.model.switchPage(direction);
  }

  applyPerPage(perPage: number) {
    this.model.applyPerPage(perPage);
  }

  applyPromo(promo: string) {
    this.model.applyPromo(promo);
  }

  removePromo(promo: string) {
    this.model.removePromo(promo);
  }
}
