//type Callback = <T>(...args: T[]) => void;
//type Callback = <T extends number | string >(args: T) => void;
type Callback = <T>(args: T) => void;

interface IObject {
    [key: string]: Array<Callback>;
}

export class Observer {
    events: IObject  = {};

    on(eventName: string, callback: Callback) {
        this.events[eventName] ??= [];
        this.events[eventName].push(callback);
    }

    off(eventName: string) {
        delete this.events[eventName];
    }

    emmit<T>(eventName: string, args?: T) {
        for (const callback of this.events[eventName]) {
            callback(args);
        }
    }
}
