import { ExtendedElement, Utils } from "../utils/utils";
import { Controller } from "../controller/index";
import { Routing } from "types/routing";
import { Model } from "../model/index";
import { ProductView } from "./productView/index";
import { MainView } from "./mainView/index";
import { CartView } from "./cartView/index";

const logo = require("../assets/svg/logo.svg");

export class View {
  root: ExtendedElement;
  productView: ProductView;
  mainView: MainView;
  cartView: CartView;

  constructor(private controller: Controller, private model: Model) {
    this.root = Utils.id("#root") as ExtendedElement;

    this.productView = new ProductView();
    this.mainView = new MainView(this.model);
    this.cartView = new CartView();
  }

  init() {
    this.addListeners();
    this.render();
    this.addHandlers();
  }

  render() {
    this.renderHeader();
    this.renderContent();
    this.checkRestoreRoute();
  }

  checkRestoreRoute() {
    const route = localStorage.getItem("restore");

    if (route) {
      localStorage.removeItem("restore");
      this.controller.route(route);
      return;
    }

    this.renderRoute();
  }

  addHandlers() {
    for (const link of Utils.id(".nav__link") as NodeListOf<ExtendedElement>) {
      link.addEventListener("click", (e: Event) => {
        this.controller.route(link.href!, e);
      });
    }
  }

  addListeners() {
    this.model.on("route", () => {
      this.renderRoute();
    });
  }

  renderRoute() {
    const route = this.model.route;
    const [, path, id] = route.path;
    const searchParams = route.searchParams;

    const main = Utils.id(".main__wrapper") as ExtendedElement;

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
    }
  }

  renderHeader() {
    const header = Utils.create<HTMLElement>("header", "header");

    header.innerHTML = `
            <div class="wrapper header__wrapper">
                <a href="#" class="header__logo logo"><img src="${logo}" alt="Hobbies Art Logo"></a>
                <nav class="header__nav nav">
                    <ul class="nav__list">
                        <li class="nav__item"><a href="/" class="nav__link">Home</a></li>
                        <li class="nav__item cart">
                            <a href="/cart" class="nav__link">
                                <div class="cart__wrapper">
                                    <div class="cart__content">
                                        <span class="icon icon--cart"></span>
                                        <p class="cart__text">Cart</p>
                                        <div class="cart__total">
                                            <div class="icon-circle icon-circle--sec-color">
                                                <span class="cart__total-value">1</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
    `;
    /*
    const header = Utils.create<HTMLElement>("header", "header");
    const headerWrapper = Utils.create<HTMLDivElement>("wrapper header__wrapper", "div");
    //header.setAttribute("style", "display: flex; gap: 20px; padding: 20px;");

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

     */

    this.root.append(header);
  }

  renderContent() {
    const main = Utils.create<HTMLElement>("main", "main");
    const mainWrapper = Utils.create<HTMLElement>(
      "main__wrapper wrapper",
      "div"
    );
    main.append(mainWrapper);
    this.root.append(main);
  }
}
