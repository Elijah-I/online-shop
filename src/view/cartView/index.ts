import { ExtendedElement } from "../../utils/utils";

export class CartView {
  constructor(private root: ExtendedElement) {}

  render() {
    this.root.html("cart");
  }
}
