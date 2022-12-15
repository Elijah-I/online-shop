import { ExtendedElement } from "../utils/utils";

export class ProductView {
  render(root: ExtendedElement, id: string) {
    root.html(`product ${id}`);
  }
}
