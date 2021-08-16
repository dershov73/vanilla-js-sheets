import {DomListener} from '@core/DomListener';

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners, options.name);
    this.emitter = options.emitter;
    this.unsubscribers = [];

    this.prepare();
  }

  /**
   * Настройка компонента перед инициализацией
   */
  prepare() {}

  /**
   * Возвращает шаблон компонента
   * @return {string}
   */
  toHTML() {
    return '';
  }

  /**
   * Инициализация компонента
   * Регистрация слушателей событий
   */
  init() {
    this.initDomListeners();
  }

  /**
   * Удаление компонента
   * Отписка от событий
   */
  destroy() {
    this.removeDomListeners();
    this.unsubscribers.forEach((unsub) => unsub());
  }

  /**
   * Выбрасывает событие eventName
   * @param {string} eventName
   * @param {any} args
   */
  $emit(eventName, ...args) {
    this.emitter.emit(eventName, ...args);
  }

  /**
   * Регистрируем обработчик события eventName
   * @param {string} eventName
   * @param {function} fn
   */
  $on(eventName, fn) {
    const unsub = this.emitter.subscribe(eventName, fn);
    this.unsubscribers.push(unsub);
  }
}
