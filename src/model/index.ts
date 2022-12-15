import { Observer } from "../utils/observer";

import { state } from "../store/index";

export class Model extends Observer {
  constructor() {
    super();
  }

  updateRoute(route: string) {
    state.route = route;
    this.emmit("route");
  }

  get route() {
    return state.route;
  }

  get productId() {
    return state.route.split("-").pop()!;
  }
}
