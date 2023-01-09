import { View } from "./view/index";
import { Controller } from "./controller/index";
import { Model } from "./model/index";

const model = new Model();
const controller = new Controller(model);
new View(controller, model);
