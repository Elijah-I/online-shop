import { Model } from "../model/index";
import { SearchParamsArray } from "types/searchParams";
import { RouterController } from "./router.controller";

export class Controller {
  routerController: RouterController;

  constructor(private model: Model) {
    this.routerController = new RouterController(model);
  }

  route(route: string, event: Event | false = false) {
    this.routerController.route(route, event);
  }

  addSearchParam(params: SearchParamsArray) {
    this.routerController.addSearchParam(params);
  }
}
