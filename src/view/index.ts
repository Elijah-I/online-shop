import { ExtendedElement, Utils } from "../utils/utils";
import { Controller } from "../controller/index";
import { Model } from "../model/index";
import { Routing } from "types/routing";
import { MainView } from "./main.view";
import { ProductView } from "./product.view";
import { CartView } from "./cart.view";

export class View {
  root: ExtendedElement;
  mainView: MainView;
  productView: ProductView;
  cartView: CartView;

  constructor(private controller: Controller, private model: Model) {
    this.root = Utils.id("#root") as ExtendedElement;
    this.mainView = new MainView();
    this.productView = new ProductView();
    this.cartView = new CartView();
  }

  init() {
    this.render();
    // this.addHandlers();
    this.addListeners();
  }

  render() {
    this.renderHeader();
    this.renderContent();
    this.renderRoute();
  }
  /*
    addHandlers() {
    }
  */

  addListeners() {
    window.addEventListener("popstate", () => {
      this.controller.updateRoute();
    });

    this.model.on("route", () => {
      this.renderRoute();
    });
  }

  renderRoute() {
    const main = Utils.id(".main") as ExtendedElement;
    console.log("this.model.route", this.model.route);
    switch (this.model.route) {
      case "":
      case Routing.MAIN:
        this.mainView.render(main);
        break;
      case Routing.CART:
        this.cartView.render(main);
        break;
      default:
        this.productView.render(main, this.model.productId);
    }
  }

  renderHeader() {
    const header = Utils.create<HTMLElement>("header", "header");
    const mainLink = Utils.create<HTMLAnchorElement>("header__main-link", "a");
    mainLink.href = "#";
    mainLink.innerText = "Main";

    const cartLink = Utils.create<HTMLAnchorElement>("header__cart-link", "a");
    cartLink.href = "#cart";
    cartLink.innerText = "Cart";

    const productLink = Utils.create<HTMLAnchorElement>(
      "header__product-link",
      "a"
    );
    productLink.href = "#product-0";
    productLink.innerText = "Product";

    header.append(mainLink, cartLink, productLink);

    this.root.append(header);
  }

  renderContent() {
    const main = Utils.create<HTMLElement>("main", "main");
    this.root.append(main);
  }
}
