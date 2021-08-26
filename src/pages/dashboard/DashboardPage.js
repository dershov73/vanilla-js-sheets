import {Page} from '@core/Page';
import {$} from '@core/dom';
import {createDashboard} from '@/pages/dashboard/dashboard.template';

export class DashboardPage extends Page {
  getRoot() {
    const now = Date.now().toString();
    return $.create('div', 'db').html(createDashboard(now));
  }
}
