import { RouterController } from "./router.controller";
import { SearchParams } from "types/searchParams";
import { Model } from "../model/index";

export class SearchController {
  constructor(
    private model: Model,
    private routerController: RouterController
  ) {}

  addPattern(searchPattern: string) {
    this.model.changeSearchPattern(searchPattern);

    this.routerController.addSearchParam([
      [SearchParams.SEARCH, encodeURIComponent(searchPattern)]
    ]);

    this.model.applyFilters();
  }
}
