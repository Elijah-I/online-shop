import { Utils } from "../../utils/utils";

export class SearchView {
  render(root: HTMLElement) {
    const search = Utils.create<HTMLDivElement>(
      "head-controls__search search",
      "div"
    );

    const searchInput = Utils.create<HTMLInputElement>(
      "search__input",
      "input"
    );
    searchInput.placeholder = "Search products";
    searchInput.name = "search";

    search.append(searchInput);
    root.append(search);

    this.addHandler(searchInput);
  }

  addHandler(input: HTMLInputElement) {
    input.addEventListener("input", (e: Event) => {
      const inputEl = e.target as HTMLInputElement;
      console.log("input data", inputEl.value);
    });
  }
}
