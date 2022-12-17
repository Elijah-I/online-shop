import { ExtendedElement } from "../utils/utils";
import { SearchParamsObject } from "types/searchParams";
import { FilterMainView } from "./filter.main.view";
import { FilteredProductsMainView } from "./filteredProducts.main.view";

export class MainView {
  render(root: ExtendedElement, searchParams: SearchParamsObject) {
    root.html("");
    console.log("Search Params", searchParams);

    this.renderFilters(root);
    //this.renderSearchHead(root);
    this.renderFilteredProducts(root);
  }

  renderFilters(root: ExtendedElement) {
    const filters = new FilterMainView();
    filters.render(root);
  }

  //renderSearchHead(root: ExtendedElement) {}

  renderFilteredProducts(root: ExtendedElement) {
    const filteredProducts = new FilteredProductsMainView();
    filteredProducts.render(root);
  }
}
