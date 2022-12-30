import { Utils } from "../../utils/utils";
import { Model } from "model";
import { Controller } from "controller";

export class SearchView {
  constructor(private controller: Controller, private model: Model) {}
  render(root: HTMLElement) {
    const search = Utils.create<HTMLDivElement>(
      "head-controls__search search",
      "div"
    );

    const searchInput = Utils.create<HTMLInputElement>(
      "search__input",
      "input"
    );
    searchInput.placeholder = "Найти товар";
    searchInput.name = "search";
    searchInput.value = this.model.search;

    search.append(searchInput);
    root.append(search);

    this.addHandler(searchInput);
  }

  addHandler(input: HTMLInputElement) {
    input.addEventListener("input", (e: Event) => {
      const input = e.target as HTMLInputElement;
      this.controller.addSearchPattern(input.value);
    });
  }
}
