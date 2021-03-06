class Dom {
  constructor(selector) {
    this.$el = typeof selector === 'string'
      ? document.querySelector(selector)
      : selector;
  }

  get data() {
    return this.$el.dataset;
  }

  id(parsed) {
    if (parsed) {
      const parsed = this.id()?.split(':');
      return {
        row: +parsed[0],
        col: +parsed[1],
      };
    }

    return this.data.id;
  }

  html(html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html;
      return this;
    }

    return this.$el.outerHTML.trim();
  }

  text(text) {
    if (typeof text === 'string' || typeof text === 'number') {
      this.$el.textContent = text;
      return this;
    }

    const key = this.$el.tagName.toLowerCase() === 'input'
      ? 'value'
      : 'textContent';

    return this.$el[key].trim();
  }

  attr(name, value) {
    if (value) {
      this.$el.setAttribute(name, value);
      return this;
    }

    return this.$el.getAttribute(name);
  }

  focus() {
    this.$el.focus();
    return this;
  }

  clear() {
    this.html('');
    return this;
  }

  append(node) {
    if (node instanceof Dom) {
      node = node.$el;
    }

    if (Element.prototype.append) {
      this.$el.append(node);
    } else {
      this.$el.appendChild(node);
    }

    return this;
  }

  closest(selector) {
    return $(this.$el.closest(selector));
  }

  getCoords() {
    return this.$el.getBoundingClientRect();
  }

  find(selector) {
    return $(this.$el.querySelector(selector));
  }

  findAll(selector) {
    return this.$el.querySelectorAll(selector);
  }

  addClass(className) {
    this.$el.classList.add(className);
    return this;
  }

  removeClass(className) {
    this.$el.classList.remove(className);
    return this;
  }

  css(styles = {}) {
    Object.keys(styles).forEach((styleName) => {
      this.$el.style[styleName] = styles[styleName];
    });
  }

  getStyles(...styles) {
    return styles.reduce((acc, style) => {
      return {
        ...acc,
        [style]: this.$el.style[style],
      };
    }, {});
  }

  on(eventType, callback) {
    this.$el.addEventListener(eventType, callback);
  }

  off(eventType, callback) {
    this.$el.removeEventListener(eventType, callback);
  }
}

export function $(selector) {
  return new Dom(selector);
}

$.create = (tagName, classes = '') => {
  const el = document.createElement(tagName);
  if (classes) {
    el.classList.add(classes);
  }

  return $(el);
};
