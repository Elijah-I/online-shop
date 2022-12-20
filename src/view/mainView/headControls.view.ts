import { Utils } from "../../utils/utils";
import { GridLayoutView } from "./gridLayout.view";
import { SearchView } from "./search.view";
import { SortByView } from "./sortBy.view";

export class HeadControlsView {
  gridLayout: GridLayoutView;
  search: SearchView;
  sortBy: SortByView;

  constructor() {
    this.gridLayout = new GridLayoutView();
    this.search = new SearchView();
    this.sortBy = new SortByView();
  }

  render(root: HTMLElement) {
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
