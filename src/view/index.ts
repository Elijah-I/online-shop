import { ExtendedElement, Utils } from "../utils/utils";
import { Controller } from "../controller/index";
import { Routing } from "types/routing";
import { Model } from "../model/index";
import { ProductView } from "./productView/index";
import { MainView } from "./mainView/index";
import { CartView } from "./cartView/index";

const logo = require("../assets/svg/logo.svg") as string;

export class View {
  root: ExtendedElement;
  productView: ProductView;
  mainView: MainView;
  cartView: CartView;

  constructor(private controller: Controller, private model: Model) {
    this.root = Utils.id("#root") as ExtendedElement;

    this.addListeners();
    this.renderHeader();
    this.renderContent();
    this.renderFooter();

    const main = Utils.id(".main__wrapper") as ExtendedElement;
    const onCartUpdate = (a: number, s: number, d: number) =>
      this.updateCart(a, s, d);

    this.productView = new ProductView(
      this.controller,
      this.model,
      main,
      onCartUpdate
    );
    this.mainView = new MainView(
      this.controller,
      this.model,
      main,
      onCartUpdate
    );
    this.cartView = new CartView(
      this.controller,
      this.model,
      main,
      onCartUpdate
    );

    this.checkRestoreRoute();
    this.addHandlers();
  }

  checkRestoreRoute() {
    const route = localStorage.getItem("restore");

    if (route) {
      localStorage.removeItem("restore");
      this.controller.route(route);

      if (route.indexOf("/cart") > 0) {
        this.model.initState();
        this.cartView.render();
      }
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
    window.addEventListener("popstate", () => {
      this.controller.updateRoute(window.location.href);
    });

    this.model.on("route", () => {
      this.renderRoute();
    });
  }

  renderRoute() {
    const route = this.model.route;
    const [, path, id] = route.path;

    switch (path) {
      case "":
      case Routing.MAIN:
        this.mainView.render();
        break;

      case Routing.CART:
        this.cartView.render();
        break;

      case Routing.PRODUCTS:
        this.productView.render(id);
        break;
    }
  }

  private updateCart(amount: number, sum: number, discounted: number) {
    const value = Utils.id(".cart__total-value") as ExtendedElement;
    const price = Utils.id(".cart__total-price") as ExtendedElement;

    value
      .html(amount ? amount.toString() : "")
      .parentElement!.parentElement!.setAttribute(
        "style",
        amount ? "" : "display: none;"
      );

    const total =
      sum === discounted
        ? `<b>${sum.toString()}₽</b>`
        : `<span>${sum.toString()}₽</span><b>${discounted.toString()}₽</b>`;

    price.html(sum ? total : "");
  }

  renderHeader() {
    const header = Utils.create<HTMLElement>("header", "header");

    header.innerHTML = `
            <div class="wrapper header__wrapper">
                <a href="/" class="header__logo logo nav__link"><img src="${logo}" alt="Hobbies Art Logo"></a>
                <nav class="header__nav nav">
                    <ul class="nav__list">
                        <li class="nav__item main-link"><a href="/" class="nav__link">Главная</a></li>
                        <li class="nav__item cart">
                            <a href="/cart" class="nav__link cart__link">
                                <div class="cart__total-price"></div>
                                <div class="cart__wrapper">
                                    <div class="cart__content">
                                        <span class="icon icon--cart"></span>
                                        <p class="cart__text">Корзина</p>
                                        <div class="cart__total">
                                            <div class="icon-circle icon-circle--sec-color">
                                                <span class="cart__total-value"></span>
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

  renderFooter() {
    const footer = Utils.create<HTMLElement>("footer", "footer");

    footer.innerHTML = `
            <footer class="footer">
            <div class="footer__wrapper wrapper">
                <div class="footer__gh gh">
                    <a class="gh__link" href="https://github.com/Elijah-I"><span class="icon icon--gh-face"></a>
                    <a class="gh__link" href="https://github.com/fogarea"><span class="icon icon--gh"></a>
                </div>
                <div class="footer__text">
                  <span>fogarea / elijah</span>
                  <span>2022</span>
                </div>
                <div class="footer__rss rss">
                    <a class="rss__link" href="https://rs.school/js/"><span class="icon icon--rss"></a>
                </div>
            </div>
        </footer>
    `;

    this.root.append(footer);
  }
}
