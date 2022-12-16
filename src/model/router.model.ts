import { State } from "store/index";
import { SearchParams, SearchParamsObject } from "types/searchParams";

export class RouterModel {
  setRoute(route: string) {
    State.route = route;
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
