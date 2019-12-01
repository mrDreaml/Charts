import {isValidTypes} from '../validateInputData';

const assert = require('assert');

describe('isValidTypes', function () {
  it('checks with all valid data', function () {
    const types = {
      y0: 'line', y1: 'line', y2: 'line', x: 'x',
    };
    const actualResult = isValidTypes(types);
    const expectedResult = true;
    assert.equal(actualResult, expectedResult);
  });

  it('only 1 type can be with name x', function () {
    const types = {
      y0: 'line', y1: 'line', y2: 'x', x: 'x',
    };
    const actualResult = isValidTypes(types);
    const expectedResult = false;
    assert.equal(actualResult, expectedResult);
  });
});
