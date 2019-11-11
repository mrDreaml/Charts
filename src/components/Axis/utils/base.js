export const getPointsQuantity = (elementsQuantity, showQuantity) => Math.round(elementsQuantity / showQuantity) || 1;

export const shouldShow = (currentIndex, visibleIndex) => Math.round(currentIndex % visibleIndex) === 0;

export const calcTransformPos = (i, step, align = 0) => i * step - align;
