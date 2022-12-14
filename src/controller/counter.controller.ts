import {Model} from "../model";

export class CounterController {
    constructor(private model: Model) {
    }

    decrement() {
        this.model.decrement();
    }

    increment() {
        this.model.increment();
    }
}
