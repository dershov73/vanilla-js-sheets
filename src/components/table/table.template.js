const CODES = {
  A: 65,
  Z: 90,
};

function createCell(cell = '') {
  return `
    <div class="cell" contenteditable>${cell}</div>
  `;
}

function createCol(col) {
  return `
    <div class="column">${col}</div>
  `;
}

function createRow(content, number = '') {
  return `
    <div class="row">
      <div class="row-info">${number}</div>
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
        return createCol(colTitle);
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
