import {$} from '@core/dom';
import {ActiveRoute} from '@core/router/ActiveRoute';
import {Loader} from '@/components/loader/Loader';

export class Router {
  constructor(selector, routes) {
    if (!selector) {
      throw new Error('Selector is not provided in Router');
    }

    this.$placeholder = $(selector);
    this.changePageHandler = this.changePageHandler.bind(this);
    this.routes = routes;
    this.route = null;
    this.loader = new Loader();
    this.init();
  }

  init() {
    window.addEventListener('hashchange', this.changePageHandler);
    this.changePageHandler();
  }

  destroy() {
    window.removeEventListener('hashchange', this.changePageHandler);
  }

  async changePageHandler() {
    this.$placeholder.clear().append(this.loader);

    if (this.route) {
      this.route.destroy();
    }

    const Page = ActiveRoute.path.includes('excel')
      ? this.routes.excel
      : this.routes.dashboard;

    this.route = new Page(ActiveRoute.param);
    const root = await this.route.getRoot();

    this.$placeholder.clear().append(root);
    this.route.afterRender();
  }
}
