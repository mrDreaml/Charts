import {calcSteps, calcYMaxValue, getActualColumns} from '../../containerBase';

const assert = require('assert');

describe('chartRenderData', function () {
  const width = 1200;
  const height = 500;

  const columns = {
    x: [1, 2, 3, 4, 5],
    y0: [1, 2, 3, 4, 5],
  };

  const selectedGraphics = {
    x: true,
    y0: true,
  };

  const range = [0, 3];

  it('checks with all valid data', function () {
    const actualColumns = getActualColumns(columns, selectedGraphics, range);

    const steps = calcSteps(actualColumns, width, height);
    const yMaxValue = calcYMaxValue(actualColumns);

    const actualResult = {
      actualColumns,
      steps,
      yMaxValue,
    };

    const expectedResult = {
      actualColumns: {x: [1, 2, 3], y0: [1, 2, 3]},
      steps: {xStep: 600, yStep: 166.66666666666666},
      yMaxValue: 3,
    };
    assert.deepEqual(actualResult, expectedResult);
  });

  it('checks without columns', function () {
    const actualColumns = getActualColumns({}, selectedGraphics, range);

    const steps = calcSteps(actualColumns, width, height);
    const yMaxValue = calcYMaxValue(actualColumns);

    const actualResult = {
      actualColumns,
      steps,
      yMaxValue,
    };

    const expectedResult = {
      actualColumns: {},
      steps: {},
      yMaxValue: 0,
    };
    assert.deepEqual(actualResult, expectedResult);
  });

  it('checks with invalid columns', function () {
    const actualColumns = getActualColumns({x: [-1, -2, -3], y0: [1, 2, 3]}, selectedGraphics, range);
    console.log(actualColumns);

    const steps = calcSteps(actualColumns, width, height);
    const yMaxValue = calcYMaxValue(actualColumns);

    const actualResult = {
      actualColumns,
      steps,
      yMaxValue,
    };

    const expectedResult = {
      actualColumns: {},
      steps: {},
      yMaxValue: 0,
    };
    assert.deepEqual(actualResult, expectedResult);
  });

  it('checks with invalid range', function () {
    const actualColumns = getActualColumns(columns, selectedGraphics, [-10, -2]);

    const steps = calcSteps(actualColumns, width, height);
    const yMaxValue = calcYMaxValue(actualColumns);

    const actualResult = {
      actualColumns,
      steps,
      yMaxValue,
    };

    const expectedResult = {
      actualColumns: {},
      steps: {},
      yMaxValue: 0,
    };
    assert.deepEqual(actualResult, expectedResult);
  });

  it('checks without selectedGraphics', function () {
    const actualColumns = getActualColumns(columns, {}, range);

    const steps = calcSteps(actualColumns, width, height);
    const yMaxValue = calcYMaxValue(actualColumns);

    const actualResult = {
      actualColumns,
      steps,
      yMaxValue,
    };

    const expectedResult = {
      actualColumns: {},
      steps: {},
      yMaxValue: 0,
    };
    assert.deepEqual(actualResult, expectedResult);
  });

  it('checks without range', function () {
    const actualColumns = getActualColumns(columns, selectedGraphics, []);

    const steps = calcSteps(actualColumns, width, height);
    const yMaxValue = calcYMaxValue(actualColumns);

    const actualResult = {
      actualColumns,
      steps,
      yMaxValue,
    };

    const expectedResult = {
      actualColumns: {},
      steps: {},
      yMaxValue: 0,
    };
    assert.deepEqual(actualResult, expectedResult);
  });

  it('checks without width and height', function () {
    const actualColumns = getActualColumns(columns, selectedGraphics, range);

    const steps = calcSteps(actualColumns, undefined, undefined);
    const yMaxValue = calcYMaxValue(actualColumns);

    const actualResult = {
      actualColumns,
      steps,
      yMaxValue,
    };

    const expectedResult = {
      actualColumns: {x: [1, 2, 3], y0: [1, 2, 3]},
      steps: undefined,
      yMaxValue: 3,
    };
    assert.deepEqual(actualResult, expectedResult);
  });
});
