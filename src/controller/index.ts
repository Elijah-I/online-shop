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
      )
    }

    this.routerController.addSearchParam([
      ["brand", filterBrands.join("↕")] // записываем в URL обновленную строку
    ]);

    this.applySearchFilters();
  }

  applySearchFilters() {
    this.model.applySearchFilters();
  }
}
