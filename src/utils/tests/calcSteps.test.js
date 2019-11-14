import { calcSteps } from '../containerBase';

const assert = require('assert');

describe('calcSteps', function () {
  const columns = {
    x: [1, 2, 3, 4, 5],
    y0: [1, 2, 3, 4, 5],
    y1: [1, 2, 3, 4, 5],
  };

  it('checks with all valid data', function () {
    const width = 1200;
    const height = 700;
    const actualResult = calcSteps(columns, width, height);
    const expectedResult = {
      xStep: 300,
      yStep: 140,
    };
    assert.deepEqual(actualResult, expectedResult);
  });

  it('checks with empty columns', function () {
    const width = 1200;
    const height = 700;
    const columnsTest = {};
    const actualResult = calcSteps(columnsTest, width, height);
    const expectedResult = undefined;
    assert.deepEqual(actualResult, expectedResult);
  });

  it('checks with width = 0 and height = 0', function () {
    const width = 0;
    const height = 0;
    const actualResult = calcSteps(columns, width, height);
    const expectedResult = {
      xStep: 0,
      yStep: 0,
    };
    assert.deepEqual(actualResult, expectedResult);
  });

  it('checks with width < 0 and height < 0', function () {
    const width = -100;
    const height = -100;
    const actualResult = calcSteps(columns, width, height);
    const expectedResult = undefined;
    assert.deepEqual(actualResult, expectedResult);
  });
});
