import {storage} from '@core/utils';

export function createDashboard(id) {
  return `
        <div class="db__header">
            <h1>Dashboard</h1>
        </div>

        <div class="db__new">
            <div class="db__view">
                <a href="#excel/${id}" class="db__create">
                    Новая <br>Таблица
                </a>
            </div>
        </div>

        <div class="db__table db__view">
            ${createRecordsList()}
        </div>
    `;
}

function createListItem(key) {
  const model = storage(key);
  const id = key.split(':')[1];

  return `
    <li class="db__record">
      <a href="#excel/${id}">${model.title}</a>
      <strong>
        ${new Date(model.openedAt).toLocaleDateString()}
        ${new Date(model.openedAt).toLocaleTimeString()}
      </strong>
    </li>
  `;
}

function getAllKeys() {
  const keys = [];

  for (let i = 0; i < localStorage.length; i += 1) {
    const key = localStorage.key(i);
    if (key.includes('excel')) {
      keys.push(key);
    }
  }

  return keys;
}

function createRecordsList() {
  const keys = getAllKeys();

  if (!keys.length) {
    return `<p>Вы пока не создали ни одной таблицы</p>`;
  }

  return `
    <div class="db__list-header">
      <span>Название</span>
      <span>Дата открытия</span>
    </div>
    <ul class="db__list">
      ${keys.map(createListItem).join('')}
    </ul>
  `;
}
