import { ExtendedElement, Utils } from "../../utils/utils";
import { Model } from "model/index";
import { FilterView } from "./filter.view";
import { ProductsView } from "./products.view";
import { HeadControlsView } from "./headControls.view";
import { Controller } from "controller";

export class MainView {
  filters: FilterView;
  headControls: HeadControlsView;
  productsList: ProductsView;
  productsRoot: HTMLElement;
  headControlsRoot: HTMLElement;
  rightSideWrapper: HTMLDivElement;
  leftSideWrapper: HTMLDivElement;

  constructor(
    private controller: Controller,
    private model: Model,
    private root: ExtendedElement,
    private onCartUpdate: (a: number, s: number, d: number) => void
  ) {
    this.filters = new FilterView(this.controller, this.model);
    this.headControls = new HeadControlsView(this.controller, this.model);
    this.productsList = new ProductsView(this.controller, this.model);

    this.productsRoot = Utils.create<HTMLElement>("products", "section");
    this.headControlsRoot = Utils.create<HTMLElement>(
      "head-controls",
      "section"
    );
    this.rightSideWrapper = Utils.create<HTMLDivElement>(
      "main__right-side",
      "div"
    );
    this.leftSideWrapper = Utils.create<HTMLDivElement>(
      "main__left-side",
      "div"
    );

    this.addListeners();
  }

  addListeners() {
    const renderProductsCallback = () => {
      this.productsList.render(
        this.model.products,
        this.model.layout,
        this.productsRoot
      );

      this.filters.render(this.leftSideWrapper);
    };

    const cartCallback = () => {
      const cartIds = this.model.cartIds;

      this.productsList.applyCart(cartIds);

      this.onCartUpdate(
        this.model.cartStockTotal,
        this.model.totalPrice,
        this.model.totalDiscounted
      );
    };

    this.model.on("filter.update", renderProductsCallback);
    this.model.on("controls.update", renderProductsCallback);
    this.model.on("search.update", renderProductsCallback);

    this.model.on("cart.update", cartCallback);

    window.addEventListener("storage", () => {
      this.model.initState();
      this.controller.applyCart();
      cartCallback();
    });
  }

  render() {
    this.root.html("");

    this.headControls.render(this.headControlsRoot);
    this.rightSideWrapper.append(this.headControlsRoot, this.productsRoot);

    this.root.append(this.leftSideWrapper, this.rightSideWrapper);

    this.controller.applyFilters();
    this.controller.applyControls();
    this.controller.applyCart();
  }
}
