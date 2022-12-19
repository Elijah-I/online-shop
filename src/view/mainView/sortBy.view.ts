import { Utils } from "../../utils/utils";

export class SortByView {
  render(root: HTMLElement) {
    let template = ``;

    const sortBy = Utils.create<HTMLDivElement>(
      "head-controls__sort-by sort-by",
      "div"
    );

    const labelForSortBySelect = Utils.create<HTMLLabelElement>("", "label");
    labelForSortBySelect.innerText = "Sorting By";
    labelForSortBySelect.setAttribute("for", "sort-by");

    const sortBySelect = Utils.create<HTMLSelectElement>(
      "sort-by__select",
      "select"
    );
    sortBySelect.name = "sort-by";
    sortBySelect.id = "sort-by";

    template += `<option value="default" selected>Default</option>
                 <option value="price-low-to-high">Price: Low to High</option>
                 <option value="price-high-to-low">Price: High to Low</option>
                 <option value="rating-high-to-low">Rating: High to Low</option>
                 <option value="rating-low-to-high">Rating: Low to High</option>`;

    sortBySelect.innerHTML = template;

    sortBy.append(labelForSortBySelect, sortBySelect);

    root.append(sortBy);

    this.addHandler(sortBySelect);
  }

  addHandler(selects: HTMLSelectElement) {
    selects.addEventListener("change", (e: Event) => {
      const select = e.target as HTMLSelectElement;
      console.log("change to", select.value);
    });
  }
}
