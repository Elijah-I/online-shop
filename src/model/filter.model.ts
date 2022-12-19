import { State } from "store/index";

export class FilterModel {
  changeCategory(checked: boolean, id: number) {
    State.categories.map((categorie) => {
      if (categorie.id === id) {
        categorie.checked = checked;
      }
      return categorie;
    });
  }

  getCategories(searchCategories: string | null) {
    return searchCategories ? searchCategories.split("↕") : [];
  }

  changeBrand(checked: boolean, id: number) {
    State.brands.map((brand) => {
      if (brand.id === id) {
        brand.checked = checked;
      }
      return brand;
    });
  }

  getBrands(searchBrands: string | null) {
    return searchBrands ? searchBrands.split("↕") : [];
  }

  changePrice(from: number, to: number) {
    State.price.from = from;
    State.price.to = to;
  }

  getPrices(searchPrices: string | null) {
    return searchPrices ? searchPrices.split("↕") : [null, null];
  }

  changeStock(from: number, to: number) {
    State.stock.from = from;
    State.stock.to = to;
  }

  getStocks(searchStocks: string | null) {
    return searchStocks ? searchStocks.split("↕") : [null, null];
  }
}
