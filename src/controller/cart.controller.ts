import { Model } from "../model/index";

export class CartController {
  constructor(private model: Model) {}

  toggle(id: number) {
    this.model.toggleCart(id);
    this.model.applyCart();
  }
}
