import {isValidNames} from '../validateInputData';

const assert = require('assert');

describe('isValidNames', function () {
  it('checks with all valid data', function () {
    const names = {
      y0: 'gross cost', y1: 'actual fee', y2: 'market',
    };
    const actualResult = isValidNames(names);
    const expectedResult = true;
    assert.equal(actualResult, expectedResult);
  });

  it('checks on equals names', function () {
    const names = {
      y0: 'gross cost', y1: 'gross cost', y2: 'market', x: 'days',
    };
    const actualResult = isValidNames(names);
    const expectedResult = false;
    assert.equal(actualResult, expectedResult);
  });

  it('checks on length', function () {
    const names = {
      y0: '123456789123456789123456789', y1: 'gross cost', y2: 'market', x: 'days',
    };
    const actualResult = isValidNames(names);
    const expectedResult = false;
    assert.equal(actualResult, expectedResult);
  });

  it('empty', function () {
    const names = {};
    const actualResult = isValidNames(names);
    const expectedResult = true;
    assert.equal(actualResult, expectedResult);
  });
});
