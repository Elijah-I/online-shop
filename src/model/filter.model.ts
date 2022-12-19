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
}
