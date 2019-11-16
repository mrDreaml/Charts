import constants from '../../../constants/constants';

export const isValidRange = (newRange, selfRange) => (
  newRange[1] - newRange[0] >= constants.minFlipSize
    && newRange[0] > selfRange[0] - 1
    && newRange[1] < selfRange[1]);

export const calcNewRange = ({
  x, data, xStep, selfRange, range, focusBasis,
}) => {
  let newRange = [...range];
  if (Array.isArray(data)) {
    const index = Math.round(x / xStep);
    const diff = newRange[1] - newRange[0];
    newRange = [index - focusBasis, index + diff - focusBasis];
  } else {
    const index = Math.round(x / xStep);
    newRange[data] = index;
  }

  console.log(newRange, selfRange)
  if (isValidRange(newRange, selfRange)) {
    return newRange;
  }
  return;
};

export const calcFocusBasis = (x, range, xStep) => Math.round((x - Math.round(range[0] * xStep)) / xStep);
