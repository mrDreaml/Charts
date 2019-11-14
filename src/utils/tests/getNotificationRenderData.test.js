import { getNotificationRenderData } from '../notification';

const assert = require('assert');

describe('getNotificationRenderData', function () {
  const x = 100;
  const y = 100;
  const xStep = 300;
  const yStep = 140;
  const width = 1200;
  const height = 700;

  const columns = {
    x: [1, 2, 3, 4, 5],
    y0: [1, 2, 3, 4, 5],
    y1: [1, 2, 3, 4, 5],
  };

  const names = {
    x: 'Axis x',
    y0: 'Axis y0',
    y1: 'Axis y1',
  };

  const colors = {
    y0: '#0F0',
    y1: '#00F',
  };

  it('checks with all valid data', function () {
    const actualResult = getNotificationRenderData({
      x, y, xStep, yStep, columns, height, width, colors, names,
    });
    const expectedResult = {
      pos: [100, 100],
      notes: [{ property: ['Axis x'], value: 1 }, { property: ['Axis y0'], value: 1 }, { property: ['Axis y1'], value: 1 }],
      circles: { data: [{ value: 560, color: '#0F0' }, { value: 560, color: '#00F' }], x: 0 },
    };

    assert.deepEqual(actualResult, expectedResult);
  });

  it('checks on collision', function () {
    const xTest = 1200;
    const yTest = 700;
    const actualResult = getNotificationRenderData({
      x: xTest, y: yTest, xStep, yStep, columns, height, width, colors, names,
    });
    const expectedResult = {
      pos: [1000, 550],
      notes: [{ property: ['Axis x'], value: 5 }, { property: ['Axis y0'], value: 5 }, { property: ['Axis y1'], value: 5 }],
      circles: { data: [{ value: 0, color: '#0F0' }, { value: 0, color: '#00F' }], x: 1200 },
    };

    assert.deepEqual(actualResult, expectedResult, 'collision error');
  });

  it('checks on huge x and y', function () {
    const xTest = 2000;
    const yTest = 1000;
    const actualResult = getNotificationRenderData({
      x: xTest, y: yTest, xStep, yStep, columns, height, width, colors, names,
    });
    const expectedResult = undefined;

    assert.deepEqual(actualResult, expectedResult, 'should not calculate if x or y more then width and height respectively');
  });

  it('checks on negative steps', function () {
    const xStepTest = -10;
    const yStepTest = -10;
    const actualResult = getNotificationRenderData({
      x, y, xStep: xStepTest, yStep: yStepTest, columns, height, width, colors, names,
    });
    const expectedResult = undefined;

    assert.deepEqual(actualResult, expectedResult, 'should not calculate if steps x or y is negative value');
  });

  it('checks on empty columns data', function () {
    const columnsTest = {};
    const actualResult = getNotificationRenderData({
      x, y, xStep, yStep, columns: columnsTest, height, width, colors, names,
    });
    const expectedResult = undefined;

    assert.deepEqual(actualResult, expectedResult, 'should not calculate if columns - empty object');
  });

  it('checks on negative height or width', function () {
    const widthTest = -1;
    const heightTest = -1;
    const actualResult = getNotificationRenderData({
      x, y, xStep, yStep, columns, height: heightTest, width: widthTest, colors, names,
    });
    const expectedResult = undefined;

    assert.deepEqual(actualResult, expectedResult, 'should not calculate if width or height is negative values');
  });

  it('checks on zero height or width', function () {
    const widthTest = 0;
    const heightTest = 0;
    const actualResult = getNotificationRenderData({
      x, y, xStep, yStep, columns, height: heightTest, width: widthTest, colors, names,
    });
    const expectedResult = undefined;

    assert.deepEqual(actualResult, expectedResult, 'should not calculate if width or height is 0 values');
  });
});
