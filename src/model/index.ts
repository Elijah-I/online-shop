import {Observer} from "../utils/observer";
import {CounterModel} from "./counter.model";
import {state} from "../store";

export class Model extends Observer{
    counter: CounterModel;

    constructor() {
        super();
        this.counter = new CounterModel();
    }

    get counterValue() {
        return state.counterValue;
    }

    decrement() {
        this.counter.decrement();
        this.emmit('change.value')
    }

    increment() {
        this.counter.increment();
        this.emmit('change.value')
    }
}
