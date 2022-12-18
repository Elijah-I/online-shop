import { ExtendedElement } from "../utils/utils";
import { SearchParamsObject } from "types/searchParams";
import { FilterMainView } from "./filter.main.view";
import { FilteredProductsMainView } from "./filteredProducts.main.view";

export class MainView {
  filters: FilterMainView;
  filteredProducts: FilteredProductsMainView;

  constructor() {
    this.filters = new FilterMainView();
    this.filteredProducts = new FilteredProductsMainView();
  }

  render(root: ExtendedElement, searchParams: SearchParamsObject) {
    root.html("");
    console.log("Search Params", searchParams);

    this.renderFilters(root);
    this.renderFilteredProducts(root);
  }

  renderFilters(root: ExtendedElement) {
    this.filters.render(root);
  }

  renderFilteredProducts(root: ExtendedElement) {
    this.filteredProducts.render(root);
  }
}
