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

    localStorage.setItem(
      "checkedCategoriesId",
      JSON.stringify(filterCategories)
    );

    this.model.applySearchFilters();
  }
}
