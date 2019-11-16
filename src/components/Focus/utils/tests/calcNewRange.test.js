import { calcNewRange } from '../calcNewRange';

const assert = require('assert');

describe('calcNewRange', function () {
  const x = 310;
  const data = 0;
  const xStep = 300;
  const selfRange = [0, 90];
  const range = [0, 5];
  const focusBasis = 10;

  it('check with all valid data', function () {
    const actualResult = calcNewRange({
      x, data, xStep, selfRange, range, focusBasis,
    });
    const expectedResult = [1, 5];
    assert.deepEqual(actualResult, expectedResult);
  });

  it('check with all valid data, left + right border shift', function () {
    const dataTest = [0, 1];
    const rangeTest = [60, 90];
    const focusBasisTest = 0;
    const actualResult = calcNewRange({
      x, data: dataTest, xStep, selfRange, range: rangeTest, focusBasis: focusBasisTest,
    });
    const expectedResult = [1, 31];
    assert.deepEqual(actualResult, expectedResult);
  });

  it('check with low range, check on flip', function () {
    const rangeTest = [0, 2];
    const actualResult = calcNewRange({
      x, data, xStep, selfRange, range: rangeTest, focusBasis,
    });
    const expectedResult = undefined;
    assert.deepEqual(actualResult, expectedResult, 'range diff should be > min flip size');
  });

  it('check with low selfRange', function () {
    const selfRangeTest = [0, 2];
    const actualResult = calcNewRange({
      x, data, xStep, selfRange: selfRangeTest, range, focusBasis,
    });
    const expectedResult = undefined;
    assert.deepEqual(actualResult, expectedResult, 'self range should be > range');
  });

  it('check on invalid focusBasis', function () {
    const focusBasisTest = -10;
    const actualResult = calcNewRange({
      x, data, xStep, selfRange, range, focusBasis: focusBasisTest,
    });
    const expectedResult = undefined;
    assert.deepEqual(actualResult, expectedResult, 'focus basis, should be positive');
  });
});
