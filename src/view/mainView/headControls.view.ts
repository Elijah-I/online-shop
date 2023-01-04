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
    this.fillFilterButton(headControlsWrapper);

    root.append(headControlsWrapper);
  }

  fillFilterButton(root: HTMLElement) {
    const filterButton = Utils.create<HTMLButtonElement>(
      "button button--bordered filter__button",
      "button"
    );

    filterButton.innerText = "Фильтры";

    root.append(filterButton);
    this.addFilterHandler(filterButton);
  }

  addFilterHandler(button: HTMLButtonElement) {
    button?.addEventListener("click", (e) => {
      const filter = document.querySelector(".filter");
      const target = e.target as HTMLElement;
      filter?.classList.add("filter--show");
      console.log(target);

      Utils.addEvent(".filter", "click", (e) => {
        const target = e.target as HTMLElement;
        if (target.classList.contains('icon--close')){
          filter?.classList.remove("filter--show");
        }
      })
    })
  }
}
