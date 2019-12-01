import {isValidInputDataStructure} from '../validateInputData';

const assert = require('assert');

describe('isValidInputDataStructure', function () {
  it('checks with all valid data', function () {
    const inputData = {
      columns: {
        x: [],
        y0: [],
      },
      colors: {
        y0: '',
      },
      names: {
        y0: '',
      },
      types: {
        x: 'x',
        y0: 'line',
      },
    };
    const actualResult = isValidInputDataStructure(inputData);
    const expectedResult = true;
    assert.equal(actualResult, expectedResult);
  });

  it('checks with lost params', function () {
    const inputData = {
      columns: {
        x: [],
        y0: [],
      },
      colors: {},
      names: {},
      types: {
        x: 'x',
      },
    };
    const actualResult = isValidInputDataStructure(inputData);
    const expectedResult = false;
    assert.equal(actualResult, expectedResult);
  });
});
