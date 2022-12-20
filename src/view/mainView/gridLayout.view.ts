import { Utils } from "../../utils/utils";
import { Controller } from "../../controller";
import { Model } from "../../model";

export class GridLayoutView {
  constructor(private controller: Controller, private model: Model) {}

  render(root: HTMLElement) {
    const layouts = Utils.create<HTMLDivElement>(
        "head-controls__layouts layouts",
        "div"
    );
    root.append(layouts);

    this.fill(layouts);
  }

  fill(root: HTMLElement) {
    this.fillRadioInputs(root);
    this.addHandlers(root);
  }

  fillRadioInputs(root: HTMLElement) {
    const rows = this.generateRadioInput('rows');
    const columns = this.generateRadioInput('columns');
    root.append(rows, columns);
  }

  generateRadioInput(id: string) {
    const label = Utils.create<HTMLLabelElement>("", "label");
    label.setAttribute("for", `${id}`);

    const radioInput = Utils.create<HTMLInputElement>(
        "layouts__radio",
        "input"
    );
    radioInput.type = "radio";
    radioInput.name = "layout";
    radioInput.id = `${id}`;

    if (this.model.layout === id) {
      radioInput.checked = true;
    }

    const iconForRadioInput = Utils.create<HTMLSpanElement>(
        `icon icon--${id}`,
        "span"
    );

    label.append(radioInput, iconForRadioInput);

    return label;
  }

  addHandlers(wrapper: HTMLElement) {
    wrapper.addEventListener("click", (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.tagName !== "INPUT") {
        return;
      }
      const productList = document.querySelector('.products__wrapper');
      productList?.classList.replace(`layout-${this.model.layout}`, `layout-${target.id}`);

      this.controller.changeLayout(target.id);
    });
  }
}
