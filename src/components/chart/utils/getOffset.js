export const getOffset = (event) => {
  let el = event.target;
  let x = 0;
  let y = 0;

  while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
    x += el.offsetLeft - el.scrollLeft;
    y += el.offsetTop - el.scrollTop;
    el = el.offsetParent;
  }

  return {
    x: event.clientX - x,
    y: event.clientY - y,
  };
};
