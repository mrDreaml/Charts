import { calcYMaxValue } from '../containerBase';

const assert = require('assert');

describe('calcYMaxValue', function () {
  it('checks with all valid data', function () {
    const columnsTest = {
      x: [1, 2, 3, 4, 5],
      y0: [1, 2, 3, 4, 5],
      y1: [1, 2, 3, 4, 5],
    };

    const actualResult = calcYMaxValue(columnsTest);
    const expectedResult = 5;
    assert.deepEqual(actualResult, expectedResult);
  });

  it('checks without x column', function () {
    const columnsTest = {
      y0: [1, 2, 3, 4, 5],
      y1: [1, 2, 3, 4, 5],
    };

    const actualResult = calcYMaxValue(columnsTest);
    const expectedResult = 5;
    assert.deepEqual(actualResult, expectedResult);
  });

  it('checks with empty data', function () {
    const columnsTest = {};

    const actualResult = calcYMaxValue(columnsTest);
    const expectedResult = undefined;
    assert.deepEqual(actualResult, expectedResult);
  });

  it('checks with non positive value', function () {
    const columnsTest = {
      y0: [-1, -2, -3, -4],
    };

    const actualResult = calcYMaxValue(columnsTest);
    const expectedResult = undefined;
    assert.deepEqual(actualResult, expectedResult, 'values should be positive');
  });
});
