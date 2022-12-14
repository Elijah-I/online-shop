import { Utils, ExtendedElement } from "../utils/utils";
import { Controller } from "../controller/index";
import { Model } from "../model/index";

export class CounterView {
  constructor(
    private root: ExtendedElement,
    private model: Model,
    private controller: Controller
  ) {}

  render() {
    this.root.html(`
      <div class="counter">
        <span class="value">${this.model.counterValue}</span>
        <button class="plus">+</button>
        <button class="minus">-</button>
      </div>
    `);
  }

  addHandlers() {
    Utils.addEvent(".plus", "click", () => {
      this.increment();
    });
    Utils.addEvent(".minus", "click", () => {
      this.decrement();
    });
  }

  increment() {
    this.controller.increment();
  }

  decrement() {
    this.controller.decrement();
  }
}
