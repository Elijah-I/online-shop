import { Pagination, State } from "store/index";
import { PROMO } from "types/promo";

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

  changeQantity(id: number, qantity: number, onNull: () => void) {
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

        if (!product.stockUsed) {
          this.toggle(id);
        }
      }
    });

    if (!Object.keys(State.cartStock).length) {
      onNull();
    }

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

    return switched;
  }

  applyPerPage(perPage: number) {
    let applied = false;

    if (perPage !== State.pagination.perPage) {
      State.pagination = {
        perPage,
        currentPage: 1
      };

      applied = true;
    }

    return applied;
  }

  applyPromo(promo: string[], code: string) {
    let applied = false;

    if (Object.keys(PROMO).includes(code)) {
      const discount = PROMO[code as keyof typeof PROMO];
      if (typeof discount === "number" && !promo.includes(code)) {
        applied = true;
        State.promo.push(code);
        localStorage.setItem("promo", JSON.stringify(State.promo));
      }
    }

    return applied;
  }

  verifyPromo(promo: string[], code: string) {
    let virified = false;

    if (Object.keys(PROMO).includes(code)) {
      const discount = PROMO[code as keyof typeof PROMO];
      if (typeof discount === "number" && !promo.includes(code)) {
        virified = true;
      }
    }

    return virified;
  }

  removePromo(promo: string[], code: string) {
    let removed = false;

    if (Object.keys(PROMO).includes(code)) {
      const discount = PROMO[code as keyof typeof PROMO];
      if (typeof discount === "number" && promo.includes(code)) {
        removed = true;
        State.promo = State.promo.filter((pCode) => pCode !== code);

        if (!State.promo.length) localStorage.removeItem("promo");
        else localStorage.setItem("promo", JSON.stringify(State.promo));
      }
    }

    return removed;
  }

  getPerPage(perPage: string | null) {
    return perPage ? +perPage : 5;
  }

  getCurrentPage(currentPage: string | null) {
    return currentPage ? +currentPage : 1;
  }
}
