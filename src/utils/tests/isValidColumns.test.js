import {isValidColumns} from '../validateInputData';

const assert = require('assert');

describe('isValidColumns', function () {
  it('checks with all valid data', function () {
    const columns = {
      x: [1, 2, 3, 4, 5],
      y0: [1, 2, 3, 4, 5],
      y1: [1, 2, 3, 4, 5],
    };
    const actualResult = isValidColumns(columns);
    const expectedResult = true;
    assert.equal(actualResult, expectedResult);
  });

  it('checks with non positive numbers', function () {
    const columns = {
      x: [1, 2, 3, -4, 5],
      y0: [1, 2, 3, -4, 5],
      y1: [1, 2, 3, -4, 5],
    };
    const actualResult = isValidColumns(columns);
    const expectedResult = false;
    assert.equal(actualResult, expectedResult);
  });

  it('checks with not valid numbers, like infinity or NaN', function () {
    const columns = {
      x: [NaN, Infinity, 1, 2],
      y0: [NaN, Infinity, 1, 2],
      y1: [1, 2, 3, 4, 5],
    };
    const actualResult = isValidColumns(columns);
    const expectedResult = false;
    assert.equal(actualResult, expectedResult);
  });

  it('empty', function () {
    const columns = {};
    const actualResult = isValidColumns(columns);
    const expectedResult = true;
    assert.equal(actualResult, expectedResult);
  });
});
