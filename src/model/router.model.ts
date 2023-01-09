import { State } from "store/index";
import { PaginationParams } from "types/paginationParams";
import { SearchParams, SearchParamsObject } from "types/searchParams";

type SearchString = Array<string>;

export class RouterModel {
  setRoute(route: string) {
    State.route = route;
  }

  get route() {
    const route = new URL(State.route);

    let searchParams: SearchParamsObject = {};
    let searchString: SearchString = [];
    const { host, origin } = route;

    [searchString, searchParams] = this.getSearchString(route, "search");

    if (!searchString.length) {
      [searchString, searchParams] = this.getSearchString(route, "pagination");
    }

    return {
      host,
      origin,
      searchParams,
      searchString: searchString.join("&"),
      path: route.pathname.replace(State.deployPath, "/").split("/")
    };
  }

  private getSearchString(
    route: URL,
    type: string
  ): [SearchString, SearchParamsObject] {
    const searchString: SearchString = [];
    const searchParams: SearchParamsObject = {};

    let params: SearchParams[] | PaginationParams[] =
      Object.values(SearchParams);
    if (type === "pagination") params = Object.values(PaginationParams);

    for (const param of params) {
      const value = route.searchParams.get(param);

      searchParams[param] = value;

      if (value) {
        searchString.push(`${param}=${value}`);
      }
    }

    return [searchString, searchParams];
  }
}
