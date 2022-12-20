import { Utils } from "../../utils/utils";
import { Model } from "model";
import { Controller } from "controller";
import { GridLayoutView } from "./gridLayout.view";
import { SearchView } from "./search.view";
import { SortByView } from "./sortBy.view";

export class HeadControlsView {
  gridLayout: GridLayoutView;
  search: SearchView;
  sortBy: SortByView;

  constructor(private controller: Controller, private model: Model) {
    this.gridLayout = new GridLayoutView(this.controller, this.model);
    this.sortBy = new SortByView(this.controller, this.model);
    this.search = new SearchView(this.controller, this.model);
  }

  render(root: HTMLElement) {
    root.innerHTML = "";

    const headControlsWrapper = Utils.create<HTMLElement>(
      "head-controls__wrapper",
      "div"
    );

    this.gridLayout.render(headControlsWrapper);
    this.search.render(headControlsWrapper);
    this.sortBy.render(headControlsWrapper);

    root.append(headControlsWrapper);
  }
}
