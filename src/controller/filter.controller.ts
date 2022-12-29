import { Model } from "model";
import { SearchParams } from "types/searchParams";
import { RouterController } from "./router.controller";

export class FilterController {
  constructor(
    private model: Model,
    private routerController: RouterController
  ) {}

  changeCategory(checked: boolean, id: number) {
    this.model.changeFilterCategory(checked, id);

    let filterCategories = this.model.filterCategories;

    if (checked) {
      filterCategories.push(id.toString());
    } else {
      filterCategories = filterCategories.filter(
        (categoryId) => categoryId !== id.toString()
      );
    }

    this.routerController.addUrlParam([
      [SearchParams.CATEGORY, filterCategories.join("↕")]
    ]);

    this.applyFilters();
  }

  changeBrand(checked: boolean, id: number) {
    this.model.changeFilterBrand(checked, id); // меняем в модели на чекед/анчекд

    let filterBrands = this.model.filterBrands;

    if (checked) {
      filterBrands.push(id.toString()); // добавляем новый чекед
    } else {
      filterBrands = filterBrands.filter(
        (brandId) => brandId !== id.toString() // удаляем чекед
      );
    }

    this.routerController.addUrlParam([
      [SearchParams.BRAND, filterBrands.join("↕")] // записываем в URL обновленную строку
    ]);

    this.applyFilters();
  }

  applyFilters() {
    this.model.applyFilters();
  }

  changePrice(from: number, to: number) {
    this.model.changeFilterPrice(from, to);

    let [filterPriceFrom, filterPriceTo] = this.model.filterPrice;

    filterPriceFrom = from.toString();
    filterPriceTo = to.toString();

    this.routerController.addUrlParam([
      [SearchParams.PRICE, `${filterPriceFrom}↕${filterPriceTo}`]
    ]);

    this.applyFilters();
  }

  changeStock(from: number, to: number) {
    this.model.changeFilterStock(from, to);

    let [filterStockFrom, filterStockTo] = this.model.filterStock;

    filterStockFrom = from.toString();
    filterStockTo = to.toString();

    this.routerController.addUrlParam([
      [SearchParams.STOCK, `${filterStockFrom}↕${filterStockTo}`]
    ]);

    this.applyFilters();
  }

  reset() {
    this.routerController.addUrlParam([
      [SearchParams.CATEGORY, ""],
      [SearchParams.BRAND, ""],
      [SearchParams.STOCK, ""],
      [SearchParams.PRICE, ""]
    ]);

    this.model.initState();
    this.applyFilters();
  }
}
