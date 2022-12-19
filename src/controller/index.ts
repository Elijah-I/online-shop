import { Model } from "../model/index";
import { RouterController } from "./router.controller";

export class Controller {
  routerController: RouterController;

  constructor(private model: Model) {
    this.routerController = new RouterController(model);
  }

  route(route: string, event: Event | false = false) {
    this.routerController.route(route, event);
  }

  changeFilterCategory(checked: boolean, id: number) {
    this.model.changeFilterCategory(checked, id);

    let filterCategories = this.model.filterCategories;

    if (checked) {
      filterCategories.push(id.toString());
    } else {
      filterCategories = filterCategories.filter(
        (categoryId) => categoryId !== id.toString()
      );
    }

    this.routerController.addSearchParam([
      ["category", filterCategories.join("↕")]
    ]);

    this.applySearchFilters();
  }

  changeFilterBrand(checked: boolean, id: number) {
    this.model.changeFilterBrand(checked, id); // меняем в модели на чекед/анчекд

    let filterBrands = this.model.filterBrands;

    if (checked) {
      filterBrands.push(id.toString()); // добавляем новый чекед
    } else {
      filterBrands = filterBrands.filter(
        (brandId) => brandId !== id.toString() // удаляем чекед
      );
    }

    this.routerController.addSearchParam([
      ["brand", filterBrands.join("↕")] // записываем в URL обновленную строку
    ]);

    this.applySearchFilters();
  }

  applySearchFilters() {
    this.model.applySearchFilters();
  }

  changeFilterPrice(from: number, to: number) {
    this.model.changeFilterPrice(from, to);

    let [filterPriceFrom, filterPriceTo] = this.model.filterPrice;

    filterPriceFrom = from.toString();
    filterPriceTo = to.toString();

    this.routerController.addSearchParam([
      ["price", `${filterPriceFrom}↕${filterPriceTo}`]
    ]);

    this.applySearchFilters();
  }

  changeFilterStock(from: number, to: number) {
    this.model.changeFilterStock(from, to);

    let [filterStockFrom, filterStockTo] = this.model.filterStock;

    filterStockFrom = from.toString();
    filterStockTo = to.toString();

    this.routerController.addSearchParam([
      ["stock", `${filterStockFrom}↕${filterStockTo}`]
    ]);

    this.applySearchFilters();
  }

  resetFilter() {
    this.routerController.addSearchParam([]);
    this.model.initState();
    this.applySearchFilters();
  }
}
