import { getActualColumns } from '../containerBase';

const assert = require('assert');

describe('getActualColumns', function () {
  const columns = {
    x: [1, 2, 3, 4, 5],
    y0: [1, 2, 3, 4, 5],
    y1: [1, 2, 3, 4, 5],
  };

  const selectedGraphics = {
    x: true,
    y0: true,
    y1: false,
  };

  const range = [0, 2];

  it('checks with all valid data', function () {
    const actualResult = getActualColumns(columns, selectedGraphics, range);
    const expectedResult = {
      x: [1, 2],
      y0: [1, 2],
    };
    assert.deepEqual(actualResult, expectedResult);
  });

  it('checks with all disbled selectedGraphics', function () {
    const selectedGraphicsTest = {
      x: false,
      y0: false,
      y1: false,
    };
    const actualResult = getActualColumns(columns, selectedGraphicsTest, range);
    const expectedResult = {};
    assert.deepEqual(actualResult, expectedResult);
  });

  it('checks with none selected x graphic', function () {
    const selectedGraphicsTest = {
      x: false,
      y0: true,
      y1: false,
    };
    const actualResult = getActualColumns(columns, selectedGraphicsTest, range);
    const expectedResult = {
      x: [1, 2],
      y0: [1, 2],
    };
    assert.deepEqual(actualResult, expectedResult);
  });

  it('checks with zero range[0, 0]', function () {
    const rangeTest = [0, 0];
    const actualResult = getActualColumns(columns, selectedGraphics, rangeTest);
    const expectedResult = {
      x: [],
      y0: [],
    };
    assert.deepEqual(actualResult, expectedResult);
  });

  it('checks with range > then columns quantity', function () {
    const rangeTest = [0, 10];
    const actualResult = getActualColumns(columns, selectedGraphics, rangeTest);
    const expectedResult = {
      x: [1, 2, 3, 4, 5],
      y0: [1, 2, 3, 4, 5],
    };
    assert.deepEqual(actualResult, expectedResult);
  });

  it('checks with invalid range', function () {
    const rangeTest = [0, -1];
    const actualResult = getActualColumns(columns, selectedGraphics, rangeTest);
    const expectedResult = undefined;
    assert.deepEqual(actualResult, expectedResult);
  });

  it('checks with empty selectedGraphics object', function () {
    const selectedGraphicsTest = {};
    const actualResult = getActualColumns(columns, selectedGraphicsTest, range);
    const expectedResult = undefined;
    assert.deepEqual(actualResult, expectedResult);
  });
});
