import { ExtendedElement, Utils } from "../utils/utils";
import { Controller } from "../controller/index";
import { Routing } from "types/routing";
import { Model } from "../model/index";

import { ProductView } from "./product.view";
import { MainView } from "./main.view";
import { CartView } from "./cart.view";

export class View {
  root: ExtendedElement;
  productView: ProductView;
  mainView: MainView;
  cartView: CartView;

  constructor(private controller: Controller, private model: Model) {
    this.root = Utils.id("#root") as ExtendedElement;

    this.productView = new ProductView();
    this.mainView = new MainView();
    this.cartView = new CartView();
  }

  init() {
    this.render();
    this.addHandlers();
    this.addListeners();
  }

  render() {
    this.renderHeader();
    this.renderContent();
    this.renderRoute();
  }

  addHandlers() {
    for (const link of Utils.id(
      ".header__link"
    ) as NodeListOf<ExtendedElement>) {
      link.addEventListener("click", (e: Event) => {
        this.controller.route(e, link.href!);
      });
    }
  }

  addListeners() {
    //window.addEventListener("popstate", () => {});

    this.model.on("route", () => {
      this.renderRoute();
    });
  }

  renderRoute() {
    const route = this.model.route;
    const [, path, id] = route.path;
    const searchParams = route.searchParams;

    const main = Utils.id(".main") as ExtendedElement;

    switch (path) {
      case "":
      case Routing.MAIN:
        this.mainView.render(main, searchParams);
        break;

      case Routing.CART:
        this.cartView.render(main);
        break;

      case Routing.PRODUCTS:
        this.productView.render(main, id);
        break;

      default:
        console.log("404");
    }
  }

  renderHeader() {
    const header = Utils.create<HTMLElement>("header", "header");
    header.setAttribute("style", "display: flex; gap: 20px; padding: 20px;");

    const mainLink = Utils.create<HTMLAnchorElement>("header__link", "a");
    mainLink.href = "/";
    mainLink.innerText = "Main";

    const cartLink = Utils.create<HTMLAnchorElement>("header__link", "a");
    cartLink.href = "/cart";
    cartLink.innerText = "Cart";

    const productLink = Utils.create<HTMLAnchorElement>("header__link", "a");
    productLink.href = "/product/0";
    productLink.innerText = "Product";

    const searchPattern = Utils.create<HTMLButtonElement>("", "button");
    searchPattern.innerText = "Search Pattern";
    Utils.addEvent(searchPattern, "click", () => {
      this.controller.addSearchParam([
        ["category", "smartphones"],
        ["brand", "apple"],
        ["price", "58↕899"],
        ["stock", "25↕94"],
        ["sort", "price-ASC"],
        ["view", "small"]
      ]);
    });

    header.append(mainLink, cartLink, productLink, searchPattern);

    this.root.append(header);
  }

  renderContent() {
    const main = Utils.create<HTMLElement>("main", "main");
    this.root.append(main);
  }
}
