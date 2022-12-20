import { ExtendedElement } from "../../utils/utils";

export class ProductView {
  constructor(private root: ExtendedElement) {}

  render(id: string) {
    this.root.html(`product ${id}`);
  }
}
