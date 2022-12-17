import { View } from "./view/index";
import { Controller } from "./controller/index";
import { Model } from "./model/index";

interface IApp {
  view: View;
  init: () => void;
}

class App implements IApp {
  constructor(public view: View) {}

  init() {
    this.view.init();
  }
}

const createApp = () => {
  const model = new Model();
  const controller = new Controller(model);
  const view = new View(controller, model);

  return new App(view);
};

const app = createApp();
app.init();
