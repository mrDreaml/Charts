import { isValidRange } from '../calcNewRange';

const assert = require('assert');

describe('isValidRange', function () {
  const newRange = [10, 20];
  const selfRane = [0, 90];

  it('check with all valid data', function () {
    const actualResult = isValidRange(newRange, selfRane);
    const expectedResult = true;
    assert.equal(actualResult, expectedResult);
  });

  it('check on flip', function () {
    const newRangeTest = [0, 2];
    const actualResult = isValidRange(newRangeTest, selfRane);
    const expectedResult = false;
    assert.equal(actualResult, expectedResult);
  });

  it('check invalid new range', function () {
    const newRangeTest = [-10, 0];
    const actualResult = isValidRange(newRangeTest, selfRane);
    const expectedResult = false;
    assert.equal(actualResult, expectedResult);
  });

  it('check equal new range to selfRange', function () {
    const newRangeTest = [0, 90];
    const actualResult = isValidRange(newRangeTest, selfRane);
    const expectedResult = false;
    assert.equal(actualResult, expectedResult, 'if new range equal selfRange, should no update range');
  });
});
