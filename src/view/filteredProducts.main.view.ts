import { ExtendedElement, Utils } from "../utils/utils";
import { ProductsMainView } from "./products.main.view";
import { SearchMainView } from "./search.main.view";

export class FilteredProductsMainView {
  searchHead: SearchMainView;
  productsList: ProductsMainView;

  constructor() {
    this.searchHead = new SearchMainView();
    this.productsList = new ProductsMainView();
  }

  render(root: ExtendedElement) {
    const filteredProducts = Utils.create<HTMLElement>(
      "filtered-products",
      "section"
    );

    this.searchHead.render(filteredProducts);

    this.productsList.render(filteredProducts);

    root.append(filteredProducts);
  }
}
