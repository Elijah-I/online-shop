import { Observer } from "../utils/observer";
import { RouterModel } from "./router.model";

export class Model extends Observer {
  routerModel: RouterModel;

  constructor() {
    super();
    this.routerModel = new RouterModel();
  }

  setRoute(route: string) {
    this.routerModel.setRoute(route);
    this.emmit("route");
  }

  get route() {
    return this.routerModel.route;
  }
}
