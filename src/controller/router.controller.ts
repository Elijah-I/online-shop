import { State } from "store/index";
import { Model } from "../model/index";
import { SearchParamsArray } from "types/searchParams";
import { PaginationParamsArray } from "types/paginationParams";

export class RouterController {
  constructor(private model: Model) {}

  route(route: string, event: Event | false) {
    if (event) {
      event.preventDefault();
    }

    window.history.pushState({}, "", this.makeRoute(route));

    this.updateRoute(route);
  }

  updateRoute(route: string) {
    this.model.setRoute(route);
  }

  addUrlParam(
    addParams: SearchParamsArray | PaginationParamsArray,
    from = "/"
  ) {
    const route = this.model.route;
    const params = new URLSearchParams(route.searchString);

    for (const [param, value] of addParams) {
      const action = params.has(param) ? "set" : "append";

      if (!value) params.delete(param);
      else params[action](param, value);
    }

    let newRoute = `${route.origin}`;

    if (addParams.length && params.toString()) {
      newRoute += `${from}?${params}`;
    }

    window.history.replaceState({}, "", this.makeRoute(newRoute));

    this.model.setRoute(newRoute, true);
  }

  private makeRoute(route: string) {
    const { host, origin } = this.model.route;

    if (host.indexOf("github.io") > 0) {
      route = route.replace(
        origin.replace(State.deployPath, ""),
        origin + State.deployPath
      );
    }

    return route;
  }
}
