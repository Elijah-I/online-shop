import { Model } from "../model/index";

export class Controller {
  constructor(private model: Model) {}

  updateRoute() {
    this.model.updateRoute(window.location.hash);
  }
}
