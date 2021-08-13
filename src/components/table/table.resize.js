import {$} from '@core/dom';

const resizerOffset = 4;
const minSize = {
  row: 20,
  col: 40,
};

export function resizeHandler($root, event) {
  const tableSizes = {
    row: $root.$el.scrollWidth,
    col: $root.getCoords().height,
  };
  const $resizer = $(event.target);
  const $parent = $resizer.closest('[data-type="resizable"]');
  const coords = $parent.getCoords();
  const type = $resizer.data.resize;
  const sideProp = type === 'col' ? 'bottom' : 'right';
  let value;

  $resizer.css({
    [sideProp]: `-${tableSizes[type]}px`,
  });

  document.onmousemove = (e) => {
    if (type === 'col') {
      const delta = e.pageX - coords.right;
      value = coords.width + delta;
      $resizer.css({transform: `translateX(${delta + resizerOffset}px)`});
    } else {
      const delta = e.pageY - coords.bottom;
      value = coords.height + delta;
      $resizer.css({transform: `translateY(${delta + resizerOffset}px)`});
    }
  };

  document.onmouseup = () => {
    document.onmousemove = null;
    document.onmouseup = null;

    if (type === 'col') {
      $root.findAll(`[data-col="${$parent.data.col}"]`)
          .forEach((cell) => {
            cell.style.width = (value > 0 ? value : minSize.col) + 'px';
          });
    } else {
      $parent.css({height: (value > 0 ? value : minSize.row) + 'px'});
    }

    $resizer.css({
      bottom: 0,
      right: 0,
      transform: 'translate(0, 0)',
    });
  };
}
