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

  constructor(private controller: Controller, private model: Model) {
    this.filters = new FilterView(this.controller, this.model);
    this.headControls = new HeadControlsView(this.controller, this.model);
    this.productsList = new ProductsView();

    this.productsRoot = Utils.create<HTMLElement>("products", "section");
    this.headControlsRoot = Utils.create<HTMLElement>(
      "head-controls",
      "section"
    );
    this.rightSideWrapper = Utils.create<HTMLDivElement>(
      "main__right-side",
      "div"
    );

    this.addListeners();
  }

  addListeners() {
    const renderProductsCallback = () =>
      this.productsList.render(
        this.model.products,
        this.model.layout,
        this.productsRoot
      );
    this.model.on("filter.update", renderProductsCallback);
    this.model.on("controls.update", renderProductsCallback);
    this.model.on("search.update", renderProductsCallback);
  }

  render(root: ExtendedElement) {
    root.html("");

    this.filters.render(root);
    this.headControls.render(this.headControlsRoot);
    this.rightSideWrapper.append(this.headControlsRoot, this.productsRoot);

    root.append(this.rightSideWrapper);

    this.controller.applyFilters();
    this.controller.applyControls();
  }
}
