import {DomListener} from '@core/DomListener';

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners, options.name);
    this.emitter = options.emitter;
    this.subscribe = options.subscribe || [];
    this.store = options.store;
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

  $dispatch(action) {
    this.store.dispatch(action);
  }

  /**
   * Метод реагирует на изменения в тех полях, на которые есть подписка.
   * @param {Object} changes
   */
  storeChanged(changes) {
    console.log('changes', changes);
  }

  isWatching(key) {
    return this.subscribe.includes(key);
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
