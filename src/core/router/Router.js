import {$} from '@core/dom';
import {ActiveRoute} from '@core/router/ActiveRoute';

export class Router {
  constructor(selector, routes) {
    if (!selector) {
      throw new Error('Selector is not provided in Router');
    }

    this.$placeholder = $(selector);
    this.changePageHandler = this.changePageHandler.bind(this);
    this.routes = routes;
    this.route = null;
    this.init();
  }

  init() {
    window.addEventListener('hashchange', this.changePageHandler);
    this.changePageHandler();
  }

  destroy() {
    window.removeEventListener('hashchange', this.changePageHandler);
  }

  changePageHandler() {
    this.$placeholder.clear();

    if (this.route) {
      this.route.destroy();
    }

    const Page = ActiveRoute.path.includes('excel')
      ? this.routes.excel
      : this.routes.dashboard;
    this.route = new Page(ActiveRoute.param);

    this.$placeholder.append(this.route.getRoot());
    this.route.afterRender();
  }
}
