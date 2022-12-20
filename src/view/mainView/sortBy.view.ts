import { Utils } from "../../utils/utils";
import {Controller} from "../../controller";
import {Model} from "../../model";
import {SortSettings} from "types/sortSettings";

export class SortByView {
  constructor(private controller: Controller, private model: Model) {}

  render(root: HTMLElement) {
    const sortBy = Utils.create<HTMLDivElement>(
      "head-controls__sort-by sort-by",
      "div"
    );

    const labelForSortBySelect = Utils.create<HTMLLabelElement>("sort-by__label", "label");
    labelForSortBySelect.innerText = "Sort By";
    labelForSortBySelect.setAttribute("for", "sort-by");

    sortBy.append(labelForSortBySelect)


    this.fill(sortBy);

    root.append(sortBy);
  }

  fill(root: HTMLElement) {
    const sortBySelect = Utils.create<HTMLSelectElement>(
        "sort-by__select",
        "select"
    );
    sortBySelect.name = "sort-by";
    sortBySelect.id = "sort-by";

    this.fillSelect(root, sortBySelect);
    this.addHandler(sortBySelect);
  }

  fillSelect(root: HTMLElement, sortBySelect: HTMLElement) {

    Object.values(SortSettings).forEach(setting => sortBySelect.append(this.generateOption(setting)))

    root.append(sortBySelect);
  }

  generateOption(value: string) {
    const option = Utils.create<HTMLOptionElement>("", "option");
    option.value = `${value}`;
    option.innerText = `${value.replaceAll('-', ' ')}`;
    if (this.model.sort === value) {
      option.selected = true;
    }

    return option;
  }

  addHandler(selects: HTMLSelectElement) {
    selects.addEventListener("change", (e: Event) => {
      const select = e.target as HTMLSelectElement;
      this.controller.changeSort(select.value);
    });
  }

}
