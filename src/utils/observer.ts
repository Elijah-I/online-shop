type Callback = <T>(args: T) => void;

interface IObject {
  [key: string]: Array<Callback>;
}

export class Observer {
  events: IObject = {};

  on(eventName: string, callback: Callback) {
    this.events[eventName] ??= [];
    this.events[eventName].push(callback);
  }

  off(eventName: string) {
    delete this.events[eventName];
  }

  emmit<T>(eventName: string, args?: T) {
    if (this.events[eventName])
      for (const callback of this.events[eventName]) {
        callback(args);
      }
  }
}
