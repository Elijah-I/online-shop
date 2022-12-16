import { SearchParamsArray } from "types/searchParams";
import { Model } from "../model/index";

export class RouterController {
  constructor(private model: Model) {}

  route(event: Event, route: string) {
    event.preventDefault();

    window.history.pushState({}, "", route);

    this.model.setRoute(route);
  }

  addSearchParam(addParams: SearchParamsArray) {
    const route = this.model.route;
    const params = new URLSearchParams(route.searchString);

    for (const [param, value] of addParams) {
      const action = params.has(param) ? "set" : "append";

      if (!value) params.delete(param);
      else params[action](param, value);
    }

    const newRoute = `${route.origin}?${params}`;

    window.history.replaceState({}, "", newRoute);

    this.model.setRoute(newRoute);
  }
}
