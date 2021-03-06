export class Emitter {
  constructor() {
    this.listeners = {};
  }

  emit(eventName, ...args) {
    this.listeners[eventName]?.forEach((listener) => listener(...args));
  }

  subscribe(eventName, fn) {
    this.listeners[eventName] = this.listeners[eventName] || [];
    this.listeners[eventName].push(fn);

    return () => {
      this.listeners[eventName] = this.listeners[eventName]
          .filter((listener) => listener !== fn);
    };
  }
}
