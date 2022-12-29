import { PaginationParams } from "types/paginationParams";
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

  makeOrder() {
    this.model.makeOrder();
  }

  resetCart() {
    this.model.resetCart();
  }

  changeQantity(id: number, qantity: number) {
    this.model.changeQantity(id, qantity);
  }

  switchPage(direction: number) {
    const switched = this.model.switchPage(direction);
    if (switched) {
      this.routerController.addUrlParam(
        [
          [
            PaginationParams.CURRENT_PAGE,
            this.model.pagination.currentPage.toString()
          ]
        ],
        "/cart/"
      );
    }
  }

  applyPerPage(perPage: number) {
    const applied = this.model.applyPerPage(perPage);
    if (applied) {
      this.routerController.addUrlParam(
        [[PaginationParams.PER_PAGE, perPage.toString()]],
        "/cart/"
      );
    }
  }

  applyPromo(promo: string) {
    this.model.applyPromo(promo);
  }

  removePromo(promo: string) {
    this.model.removePromo(promo);
  }
}
