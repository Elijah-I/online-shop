import { SearchParams } from "types/searchParams";
import { Model } from "../model/index";
import { FilterController } from "./filter.controller";
import { RouterController } from "./router.controller";
import { SearchController } from "./search.controller";

export class Controller {
  searchDelay: null | ReturnType<typeof setTimeout>;
  routerController: RouterController;
  filterController: FilterController;
  searchController: SearchController;

  constructor(private model: Model) {
    this.searchDelay = null;
    this.routerController = new RouterController(model);
    this.searchController = new SearchController(model, this.routerController);
    this.filterController = new FilterController(model, this.routerController);
  }

  route(route: string, event: Event | false = false) {
    this.routerController.route(route, event);
  }

  updateRoute(route: string) {
    this.routerController.updateRoute(route);
  }

  addSearchPattern(searchPattern: string) {
    if (this.searchDelay) {
      clearTimeout(this.searchDelay);
    }

    this.searchDelay = setTimeout(() => {
      this.searchController.addPattern(searchPattern);
    }, 1000);
  }

  changeFilterCategory(checked: boolean, id: number) {
    this.filterController.changeCategory(checked, id);
  }

  changeFilterBrand(checked: boolean, id: number) {
    this.filterController.changeBrand(checked, id);
  }

  applyFilters() {
    this.model.applyFilters();
  }

  applyControls() {
    this.model.applyControls();
  }

  changeFilterPrice(from: number, to: number) {
    this.filterController.changePrice(from, to);
  }

  changeFilterStock(from: number, to: number) {
    this.filterController.changeStock(from, to);
  }

  resetFilter() {
    this.filterController.reset();
  }

  changeLayout(layout: string) {
    this.model.changeLayout(layout);

    this.routerController.addSearchParam([[SearchParams.LAYOUT, layout]]);
  }

  changeSort(sort: string) {
    this.model.changeSort(sort);

    this.routerController.addSearchParam([[SearchParams.SORT, sort]]);

    this.applyControls();
  }
}
