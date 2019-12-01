import { calcSteps } from '../containerBase';

const assert = require('assert');

describe('calcSteps', function () {
  const columns = {
    x: [1, 2, 3, 4, 5],
    y0: [1, 2, 3, 4, 5],
    y1: [1, 2, 3, 4, 5],
  };

  // Lab 3 added

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

  it('checks where no column x', function () {
    const width = 1200;
    const height = 700;
    const columnsTest = {
      y0: [1, 2, 3, 4, 5],
    };
    const actualResult = calcSteps(columnsTest, width, height);
    const expectedResult = {
      yStep: 140,
    };
    assert.deepEqual(actualResult, expectedResult, 'if no column x, xStep will not calculate');
  });

  it('checks where no column y', function () {
    const width = 1200;
    const height = 700;
    const columnsTest = {
      x: [1, 2, 3, 4, 5],
    };
    const actualResult = calcSteps(columnsTest, width, height);
    const expectedResult = {
      xStep: 300,
    };
    assert.deepEqual(actualResult, expectedResult, 'if no column y, yStep will not calculate');
  });

  it('checks where no column x, and several y values', function () {
    const width = 1200;
    const height = 700;
    const columnsTest = {
      y0: [1, 2, 3, 4, 10],
      y1: [1, 2, 3, 4, 5],
    };
    const actualResult = calcSteps(columnsTest, width, height);
    const expectedResult = {
      yStep: 70,
    };
    assert.deepEqual(actualResult, expectedResult);
  });

  // Lab 3 ^

  it('checks with empty columns', function () {
    const width = 1200;
    const height = 700;
    const columnsTest = {};
    const actualResult = calcSteps(columnsTest, width, height);
    const expectedResult = undefined;
    assert.deepEqual(actualResult, expectedResult, 'if no columns, should return undefined');
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
    assert.deepEqual(actualResult, expectedResult, 'height and width should be positive numbers');
  });
});
