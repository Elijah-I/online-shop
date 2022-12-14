import {state} from "../store";

export class CounterModel {

    decrement() {
        state.counterValue--;
    }

    increment() {
        state.counterValue++;
    }
}
