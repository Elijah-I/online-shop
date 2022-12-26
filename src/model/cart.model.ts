import { Pagination, State } from "store/index";

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

  changeQantity(id: number, qantity: number) {
    let added = true;

    State.products.map((product) => {
      if (product.id === id) {
        product.stockUsed += qantity;

        if (product.stockUsed < 0) {
          product.stockUsed = 0;
          added = false;
        }

        if (product.stockUsed > product.stock) {
          product.stockUsed = product.stock;
          added = false;
        }

        State.cartStock[id] = product.stockUsed;
      }
    });

    this.cartLocalStorage();

    return added;
  }

  switchPage(total: number, direction: number, pagination: Pagination) {
    let switched = true;

    let { currentPage } = pagination;
    const totalPages = Math.ceil(total / pagination.perPage);

    currentPage += direction;

    if (currentPage < 1) {
      currentPage = 1;
      switched = false;
    }

    if (currentPage > totalPages) {
      currentPage = totalPages;
      switched = false;
    }

    State.pagination.currentPage = currentPage;

    localStorage.setItem("pagination", JSON.stringify(State.pagination));

    return switched;
  }

  applyPerPage(perPage: number) {
    let applied = false;

    if (perPage !== State.pagination.perPage) {
      State.pagination = {
        perPage,
        currentPage: 1
      };

      localStorage.setItem("pagination", JSON.stringify(State.pagination));

      applied = true;
    }

    return applied;
  }
}
