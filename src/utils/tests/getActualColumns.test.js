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

  // lab 3
  it('checks with all valid data', function () {
    const actualResult = getActualColumns(columns, selectedGraphics, range);
    const expectedResult = {
      x: [1, 2],
      y0: [1, 2],
    };
    assert.deepEqual(actualResult, expectedResult);
  });

  it('checks with all disabled selectedGraphics', function () {
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
      y0: [1, 2],
    };
    assert.deepEqual(actualResult, expectedResult);
  });

  it('checks, when only x selected', function () {
    const selectedGraphicsTest = {
      x: true,
      y0: false,
      y1: false,
    };
    const actualResult = getActualColumns(columns, selectedGraphicsTest, range);
    const expectedResult = {
      x: [1, 2],
    };
    assert.deepEqual(actualResult, expectedResult);
  });

  it('checks, when only y selected, one element on columns', function () {
    const selectedGraphicsTest = {
      x: false,
      y0: true,
    };
    const columnsTest = {
      y0: [1],
    };
    const actualResult = getActualColumns(columnsTest, selectedGraphicsTest, range);
    const expectedResult = {
      y0: [1],
    };
    assert.deepEqual(actualResult, expectedResult);
  });

  // lab 3 ^

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
    assert.deepEqual(actualResult, expectedResult, 'range can not contain negative values and range[1] > range[0]');
  });

  it('checks with empty selectedGraphics object', function () {
    const selectedGraphicsTest = {};
    const actualResult = getActualColumns(columns, selectedGraphicsTest, range);
    const expectedResult = undefined;
    assert.deepEqual(actualResult, expectedResult, 'if no selected graphics should return undefined');
  });
});
