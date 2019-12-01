import * as R from 'ramda';
import constants from '../constants/constants';
import {isValidColumns, isValidPositiveNumber} from './validateInputData';

const isValidRange = R.both(R.all(n => n >= 0), ([r0, r1]) => r1 > r0);

export const getActualColumns = (columns, selectedGraphics, range) => ((isValidColumns(columns) && isValidRange(range))
    ? Object.entries(columns).reduce((acc, [key, values]) => {
      if (selectedGraphics[key]) {
        acc[key] = values.slice(...range);
      }
      return acc;
    }, {})
    : {});

export const calcSteps = (columns, width, height) => (isValidPositiveNumber(width) && isValidPositiveNumber(height)
    ? Object.entries(columns).reduce((acc, [key, value]) => {
      if (key === constants.colNameX) {
        acc[`${constants.colNameX}Step`] = width / (value.length - 1);
        return acc;
      }
      const yStepName = [`${constants.colNameY}Step`];
      if (acc[yStepName]) {
        acc[yStepName] = Math.min(acc[yStepName], height / Math.max(...value));
      } else {
        acc[yStepName] = height / Math.max(...value);
      }
      return acc;
    }, {})
    : {});

export const calcYMaxValue = columns => Object.entries(columns).reduce((acc, [key, values]) => {
  if (key !== constants.colNameX) {
    return Math.max(acc, Math.max(...values));
  }
  return acc;
}, 0);
