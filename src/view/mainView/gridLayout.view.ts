import { Utils } from "../../utils/utils";

export class GridLayoutView {
  render(root: HTMLElement) {
    const layouts = Utils.create<HTMLDivElement>(
      "head-controls__layouts layouts",
      "div"
    );

    const labelForRowsRadioInput = Utils.create<HTMLLabelElement>("", "label");
    labelForRowsRadioInput.setAttribute("for", "rows");

    const rowsRadioInput = Utils.create<HTMLInputElement>(
      "layouts__radio",
      "input"
    );
    rowsRadioInput.type = "radio";
    rowsRadioInput.name = "layout";
    rowsRadioInput.id = "rows";

    const iconForRowsRadioInput = Utils.create<HTMLSpanElement>(
      "icon icon--rows",
      "span"
    );

    labelForRowsRadioInput.append(rowsRadioInput, iconForRowsRadioInput);

    const labelForColumnsRadioInput = Utils.create<HTMLLabelElement>(
      "",
      "label"
    );
    labelForColumnsRadioInput.setAttribute("for", "columns");

    const columnsRadioInput = Utils.create<HTMLInputElement>(
      "layouts__radio",
      "input"
    );
    columnsRadioInput.type = "radio";
    columnsRadioInput.name = "layout";
    columnsRadioInput.id = "columns";

    const iconForColumnsRadioInput = Utils.create<HTMLSpanElement>(
      "icon icon--columns",
      "span"
    );

    labelForColumnsRadioInput.append(
      columnsRadioInput,
      iconForColumnsRadioInput
    );

    layouts.append(labelForRowsRadioInput, labelForColumnsRadioInput);

    root.append(layouts);

    this.addHandlers(layouts);
  }

  addHandlers(wrapper: HTMLElement) {
    wrapper.addEventListener("click", (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.tagName !== "INPUT") {
        return;
      }
      console.log("switch to", target.id);
    });
  }
}
