import { Model } from "../model/index";
import { SearchParamsArray } from "types/searchParams";
import { RouterController } from "./router.controller";

export class Controller {
  routerController: RouterController;

  constructor(private model: Model) {
    this.routerController = new RouterController(model);
  }

  route(event: Event, route: string) {
    this.routerController.route(event, route);
  }

  addSearchParam(params: SearchParamsArray) {
    this.routerController.addSearchParam(params);
  }
}
