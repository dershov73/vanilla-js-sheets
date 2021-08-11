import {capitalize} from '@core/utils';

export class DomListener {
  constructor($root, listeners = [], name) {
    if (!$root) {
      throw new Error(`No $root provided for DomListener!`);
    }

    this.$root = $root;
    this.listeners = listeners;
    this.name = name || 'Unknown';
  }

  initDomListeners() {
    this.listeners.forEach((listener) => {
      const method = getMethodName(listener);
      if (!this[method]) {
        throw new Error(`
          Method ${method} is not implemented in ${this.name} Component
        `);
      }

      this[method] = this[method].bind(this);
      this.$root.on(listener, this[method]);
    });
  }

  removeDomListeners() {
    this.listeners.forEach((listener) => {
      const method = getMethodName(listener);
      if (!this[method]) {
        throw new Error(`
          Method ${method} is not implemented in ${this.name} Component
        `);
      }

      this.$root.off(listener, this[method]);
    });
  }
}

function getMethodName(eventName) {
  return 'on' + capitalize(eventName);
}
