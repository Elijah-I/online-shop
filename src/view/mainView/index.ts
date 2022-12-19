import { ExtendedElement, Utils } from "../../utils/utils";
import { Model } from "model/index";
import { SearchParamsObject } from "types/searchParams";
import { FilterView } from "./filter.view";
import { ProductsView } from "./products.view";
import { HeadControlsView } from "./headControls.view";

export class MainView {
  filters: FilterView;
  headControls: HeadControlsView;
  productsList: ProductsView;

  constructor(private model: Model) {
    this.filters = new FilterView(this.model.brands, this.model.categories);
    this.headControls = new HeadControlsView();
    this.productsList = new ProductsView();
  }

  render(root: ExtendedElement, searchParams: SearchParamsObject) {
    root.html("");
    console.log("Search Params", searchParams);

    this.renderFilters(root);
    this.renderHeadAndContent(root);
  }

  renderFilters(root: ExtendedElement) {
    this.filters.render(root);
  }

  renderHeadAndContent(root: ExtendedElement) {
    const rightSideWrapper = Utils.create<HTMLDivElement>(
      "main__right-side",
      "div"
    );

    this.renderHeadControls(rightSideWrapper);
    this.renderProductsList(rightSideWrapper);

    root.append(rightSideWrapper);
  }

  renderHeadControls(root: HTMLElement) {
    this.headControls.render(root);
  }

  renderProductsList(root: HTMLElement) {
    this.productsList.render(root);
  }
}
