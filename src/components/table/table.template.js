const CODES = {
  A: 65,
  Z: 90,
};

function createCell(cell = '', colIdx, rowIdx) {
  return `
    <div class="cell" data-col="${colIdx}" data-row="${rowIdx}" contenteditable>
      ${cell}
    </div>
  `;
}

function createCol(col, colIdx) {
  return `
    <div class="column" data-type="resizable" data-col="${colIdx}">
      ${col}
      <div class="col-resize" data-resize="col"></div>
    </div>
  `;
}

function createRow(content, number = '') {
  const resizer = number
    ? '<div class="row-resize" data-resize="row"></div>'
    : '';

  return `
    <div class="row" data-type="resizable">
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

export function createTable(rowsCount = 15, ) {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];
  const cols = new Array(colsCount)
      .fill('')
      .map((_, idx) => {
        const colTitle = codeToChar(CODES.A + idx);
        return createCol(colTitle, idx);
      })
      .join('');

  rows.push(createRow(cols));

  for (let i = 0; i < rowsCount; i += 1) {
    const cells = new Array(colsCount)
        .fill('')
        .map(createCell)
        .join('');

    rows.push(createRow(cells, i + 1));
  }

  return rows.join('');
}
