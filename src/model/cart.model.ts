import { State } from "store/index";

export class CartModel {
  toggle(id: number) {
    let added = false;

    State.products.map((product) => {
      if (product.id === id) {
        product.cart = !product.cart;
        added = product.cart;
      }
      return product;
    });

    if (added) {
      State.cart.push(id);
    } else {
      State.cart = State.cart.filter((productId) => productId !== id);
    }

    if (!State.cart.length) localStorage.removeItem("cart");
    else localStorage.setItem("cart", JSON.stringify(State.cart));
  }
}
