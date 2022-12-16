import { ExtendedElement } from "../utils/utils";
import { SearchParamsObject } from "types/searchParams";

export class MainView {
  render(root: ExtendedElement, searchParams: SearchParamsObject) {
    root.html("main");
    console.log("Search Params", searchParams);
  }
}
