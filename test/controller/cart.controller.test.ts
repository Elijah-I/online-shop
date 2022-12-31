import { State } from "../../src/store/index";
import { RouterController } from "../../src/controller/router.controller";
import { CartController } from "../../src/controller/cart.controller";
import { Model } from "../../src/model/index";

let cartController: CartController;
let model: Model;

beforeEach(() => {
  model = new Model();
  model.initState();

  cartController = new CartController(model, new RouterController(model));
});

describe("CartController", () => {
  it("change cart product quantity", () => {
    [
      { id: 0, quantity: 5 },
      { id: 20, quantity: 10 }
    ].forEach((product) => {
      cartController.changeQantity(product.id, product.quantity);
      expect(State.products[product.id].stockUsed).toEqual(product.quantity);
    });
  });
});

describe("switchPage", () => {
  const products = [0, 1, 2, 3, 4, 5, 6, 7];

  beforeEach(() => {
    products.forEach((productId) => cartController.toggle(productId));
  });

  afterEach(() => {
    products.forEach((productId) => cartController.toggle(productId));
  });

  it("switch page to next", () => {
    const direction = 1;
    const expectedPage = 2;

    cartController.switchPage(direction);
    expect(State.pagination.currentPage).toEqual(expectedPage);
  });

  it("switch page to previous", () => {
    const direction = -1;
    const expectedPage = 1;

    cartController.switchPage(direction);
    expect(State.pagination.currentPage).toEqual(expectedPage);
  });
});

describe("applyPerPage", () => {
  const products = [0, 1, 2, 3, 4, 5, 6, 7];

  beforeEach(() => {
    products.forEach((productId) => cartController.toggle(productId));
  });

  afterEach(() => {
    products.forEach((productId) => cartController.toggle(productId));
  });

  it("correctly apply per page parameter", () => {
    [
      { perPage: 1, pages: 8, current: 1, direction: 1 },
      { perPage: 2, pages: 4, current: 1, direction: -1 }
    ].forEach(({ perPage, pages, current, direction }) => {
      cartController.switchPage(direction);
      cartController.applyPerPage(perPage);

      const totalPages = Math.ceil(
        model.cartItems.length / State.pagination.perPage
      );

      expect(State.pagination.currentPage).toEqual(current);
      expect(State.pagination.perPage).toEqual(perPage);
      expect(totalPages).toEqual(pages);
    });
  });
});
