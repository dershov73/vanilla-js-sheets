import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/dom';
import {changeTitle} from '@/redux/actions';
import {defaultTitle} from '@/constants';

export class Header extends ExcelComponent {
  static className = 'excel__header';

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input'],
      ...options,
    });
  }

  toHTML() {
    const {title} = this.store.getState() || defaultTitle;

    return `
      <input type="text" class="input" value="${title}">
      <div>
          <button class="button">
              <i class="material-icons">delete</i>
          </button>
          <button class="button">
              <i class="material-icons">exit_to_app</i>
          </button>
      </div>
    `;
  }

  onInput(event) {
    const $target = $(event.target);
    this.$dispatch(changeTitle($target.text()));
  }
}
