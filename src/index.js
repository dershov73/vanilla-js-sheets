import '@/scss/index.scss';
import {Router} from '@core/router/Router';
import {DashboardPage} from '@/pages/dashboard/DashboardPage';
import {ExcelPage} from '@/pages/excel/ExcelPage';


new Router('#app', {
  dashboard: DashboardPage,
  excel: ExcelPage,
});
