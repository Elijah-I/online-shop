import {Model} from "../model";
import {CounterController} from "./counter.controller";

export class Controller {

    counter: CounterController;

    constructor(private model: Model) {
        this.counter = new CounterController(model);
    }

    decrement() {
        this.counter.decrement();
    }

    increment() {
        this.counter.increment();
    }
}
