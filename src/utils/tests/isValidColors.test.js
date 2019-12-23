import {isValidColors} from '../validateInputData';

const assert = require('assert');

describe('isValidColors', function () {
  it('checks with all valid data', function () {
    const colors = {
      y0: '#3DC23F',
      y1: '#F34C44',
      y2: '#0044FF',
    };
    const actualResult = isValidColors(colors);
    const expectedResult = true;
    assert.equal(actualResult, expectedResult);
  });

  it('checks on empty data', function () {
    const colors = {
      y0: '',
      y1: '',
      y2: '',
    };
    const actualResult = isValidColors(colors);
    const expectedResult = false;
    assert.equal(actualResult, expectedResult);
  });

  it('checks on format type', function () {
    const colors = {
      y0: null,
      y1: '#F00',
      y2: '#f90',
    };
    const actualResult = isValidColors(colors);
    const expectedResult = false;
    assert.equal(actualResult, expectedResult);
  });

  it('empty', function () {
    const colors = {};
    const actualResult = isValidColors(colors);
    const expectedResult = true;
    assert.equal(actualResult, expectedResult);
  });
});
