import { View } from './view'
import {Controller} from "./controller";
import {Model} from "./model";

interface IApp {
    view: View, // TODO how to make private
    controller: Controller,
    init: () => void
}

class App implements IApp {
    constructor(public view: View, public controller: Controller) {
    }

    init() {
        this.view.init();
    }
}

const createApp = () => {
    const model = new Model();
    const controller = new Controller(model);
    const view = new View(controller, model);


    return new App(view, controller);
}

const app = createApp();
app.init();
