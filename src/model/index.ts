import { State } from "store/index";
import { Observer } from "../utils/observer";
import { SearchParams, SearchParamsObject } from "types/searchParams";

export class Model extends Observer {
  constructor() {
    super();
  }

  setRoute(route: string) {
    State.route = route;
    this.emmit("route");
  }

  get route() {
    const route = new URL(State.route);
    const searchParams: SearchParamsObject = {};
    const searchString: Array<string> = [];
    const { host, origin } = route;

    for (const param of Object.values(SearchParams)) {
      const value = route.searchParams.get(param);

      searchParams[param] = value;

      if (value) {
        searchString.push(`${param}=${value}`);
      }
    }

    return {
      host,
      origin,
      searchParams,
      searchString: searchString.join("&"),
      path: route.pathname.split("/")
    };
  }
}
