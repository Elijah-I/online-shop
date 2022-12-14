import { ExtendedElement, Utils } from "../utils/utils";
import { Controller } from "../controller/index";
import { Model } from "../model/index";
import { CounterView } from "./counter.view";

export class View {
  root: ExtendedElement;
  counterView: CounterView;

  constructor(private controller: Controller, private model: Model) {
    this.root = Utils.id("#root") as ExtendedElement;
    this.counterView = new CounterView(this.root, model, controller);
  }

  init() {
    this.render();
    this.addHandlers();
    this.addListeners();
  }

  render() {
    this.counterView.render();
  }

  addHandlers() {
    this.counterView.addHandlers();
  }

  addListeners() {
    this.model.on("change.value", () => {
      this.counterView.render();
      this.counterView.addHandlers();
    }); // subscribe
  }
}
