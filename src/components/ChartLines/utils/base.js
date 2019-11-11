const calcCoordinate = (step, value, alignReverse) => {
  if (alignReverse) {
    return Math.round(alignReverse - step * value);
  }
  return Math.round(step * value);
};

export const calcPath = (columns, height, yStep, xStep) => columns.reduce((d, yValue, xValue) => {
  const yCoordinate = calcCoordinate(yValue, yStep, height);
  const xCoordinate = calcCoordinate(xValue, xStep);
  if (xValue === 0) {
    return `M${xCoordinate} ${yCoordinate}`;
  }
  return d.concat(` L${xCoordinate} ${yCoordinate}`);
}, '');
