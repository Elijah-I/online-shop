import { State } from "../../src/store/index";
import { Model } from "../../src/model/index";
import * as Products from "../../src/store/products.json";

const model = new Model();

describe("initState", () => {
  it("products are not null on initial state", () => {
    expect(State.products).toContain(Products[20]);
    expect(State.products).not.toContain(Products[21]);
  });
});

describe("toggleCart", () => {
  it("mark product with cart flag true", () => {
    const product = 20;
    model.toggleCart(product);
    expect(State.products[product].cart).toEqual(true);
  });
});

describe("changeSearchPattern", () => {
  it("set search pattern according to passed agrument", () => {
    const pattern = "пряжа";
    model.changeSearchPattern(pattern);
    expect(State.search).toEqual(pattern);
  });
});
