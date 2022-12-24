import { State } from "store/index";

export class CartModel {
  toggle(id: number) {
    let added = false;

    State.products.map((product) => {
      if (product.id === id) {
        product.cart = !product.cart;

        added = product.cart;
        product.stockUsed += added ? 1 : -1;
      }
      return product;
    });

    if (added) {
      State.cart.push(id);
      State.cartStock[id] = State.cartStock[id] ? State.cartStock[id] + 1 : 1;
    } else {
      State.cart = State.cart.filter((productId) => productId !== id);
      delete State.cartStock[id];
    }

    this.cartLocalStorage();
  }

  private cartLocalStorage() {
    if (!State.cart.length) {
      localStorage.removeItem("cart");
    } else {
      localStorage.setItem("cart", JSON.stringify(State.cart));
    }

    if (!Object.keys(State.cartStock).length) {
      localStorage.removeItem("cartStock");
    } else {
      localStorage.setItem("cartStock", JSON.stringify(State.cartStock));
    }
  }

  resetCart() {
    State.cart = [];
    State.cartStock = {};

    State.products.forEach((product) => {
      if (product.cart) {
        product.cart = false;
      }
      product.stockUsed = 0;
    });

    this.cartLocalStorage();
  }
}
