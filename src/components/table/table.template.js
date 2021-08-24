import {stylesToString} from '@core/utils';
import {defaultStyles} from '@/constants';
import {parse} from '@core/parse';

const CODES = {
  A: 65,
  Z: 90,
};

const DEFAULT_WIDTH = 120;
const DEFAULT_HEIGHT = 24;

function createCell(rowIdx, state) {
  return (_, colIdx) => {
    const width = getWidth(state.colState, colIdx);
    const id = `${rowIdx}:${colIdx}`;
    const content = state.dataState[id] || '';
    const styles = stylesToString({...defaultStyles, ...state.stylesState[id]});

    return `
      <div
        class="cell"
        data-type="cell"
        data-col="${colIdx}"
        data-id="${id}"
        data-value="${content}"
        contenteditable
        style="${styles}; width: ${width}"
      >
        ${parse(content)}
      </div>
    `;
  };
}

function createCol(col, colIdx, width) {
  return `
    <div
      class="column"
      data-type="resizable"
      data-col="${colIdx}"
      style="width: ${width}"
    >
      ${col}
      <div class="col-resize" data-resize="col"></div>
    </div>
  `;
}

function createRow(content, number = '', state) {
  const resizer = number
    ? '<div class="row-resize" data-resize="row"></div>'
    : '';
  const rowHeight = getHeight(state, number);

  return `
    <div
      class="row"
      data-type="resizable"
      data-row="${number}"
      style="height: ${rowHeight}"
    >
      <div class="row-info">
        ${number}
        ${resizer}
      </div>
      <div class="row-data">${content}</div>
    </div>
  `;
}

function codeToChar(code) {
  return String.fromCharCode(code);
}

function getWidth(state = {}, index) {
  return (state[index] || DEFAULT_WIDTH) + 'px';
}

function getHeight(state = {}, index) {
  return (state[index] || DEFAULT_HEIGHT) + 'px';
}

export function createTable(rowsCount = 15, state = {}) {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];
  const cols = new Array(colsCount)
      .fill('')
      .map((_, idx) => {
        const colTitle = codeToChar(CODES.A + idx);
        return createCol(colTitle, idx, getWidth(state.colState, idx));
      })
      .join('');

  rows.push(createRow(cols));

  for (let row = 0; row < rowsCount; row += 1) {
    const cells = new Array(colsCount)
        .fill('')
        .map(createCell(row, state))
        .join('');

    rows.push(createRow(cells, row + 1, state.rowState));
  }

  return rows.join('');
}
