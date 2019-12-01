import _isNumber from 'lodash/isNumber';
import _isNaN from 'lodash/isNaN';
import _isString from 'lodash/isString';
import * as R from 'ramda';

const and = (...args) => param => args.reduce((acc, v) => acc && v(param), true);
export const isValidPositiveNumber = value => _isNumber(value)
    && value !== Infinity
    && !_isNaN(value)
    && value >= 0;

const isListOfPositiveNumbers = R.both(Array.isArray, R.all(isValidPositiveNumber));

const isHexColor = color => /^#([0-9a-f]{6}|[0-9a-f]{3})$/i.test(color);
const isListOfUniq = list => R.uniq(list).length === list.length;
const isElementUniq = el => list => list.reduce((acc, value) => (value === el ? acc + 1 : acc), 0) === 1;

const logOnError = msg => (result) => {
  if (!result) {
    console.warn(msg);
  }
  return result;
};

const INVALID_INPUT_DATA_ERROR_MSG = 'invalid input data';

export const isValidColumns = R.compose(
    logOnError(INVALID_INPUT_DATA_ERROR_MSG.concat(', Please check columns')),
    isListOfPositiveNumbers,
    R.flatten,
    R.values,
);

export const isValidColors = R.compose(
    logOnError(INVALID_INPUT_DATA_ERROR_MSG.concat(', Please check colors')),
    R.all(R.both(_isString, isHexColor)),
    R.flatten,
    R.values,
);

export const isValidNames = R.compose(
    logOnError(INVALID_INPUT_DATA_ERROR_MSG.concat(', Please check names')),
    R.both(isListOfUniq, R.all(R.compose(R.both(R.lt(1), R.gt(15)), R.length))),
    R.flatten,
    R.values,
);

export const isValidTypes = R.compose(
    logOnError(INVALID_INPUT_DATA_ERROR_MSG.concat(', Please check types')),
    R.both(R.all(R.either(R.equals('line'), R.equals('x'))), isElementUniq('x')),
    R.flatten,
    R.values,
);

export const isValidInputDataStructure = R.compose(
    logOnError(INVALID_INPUT_DATA_ERROR_MSG.concat(', Please check data structure')),
    R.both(
        R.compose(
            R.all(key => ['columns', 'colors', 'names', 'types'].includes(key)),
            R.keys,
        ),
        R.compose(
            keyLengths => _isNumber(keyLengths.reduce((acc, value) => (value === acc ? acc : false))),
            R.map(R.compose(R.length, R.keys)),
            R.values,
            R.pick(['columns', 'types']),
        ),
    ),
);

export const isValidInputData = and(
    isValidInputDataStructure,
    R.compose(isValidTypes, R.prop('types')),
    R.compose(isValidNames, R.prop('names')),
    R.compose(isValidColors, R.prop('colors')),
    R.compose(isValidColumns, R.prop('columns')),
);
