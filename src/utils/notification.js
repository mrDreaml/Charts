import * as R from 'ramda';
import constants from '../constants/constants';
import {and, isValidPositiveNumber} from './validateInputData';

const NOTIFICATION_MAX_X_POS = 200;
const NOTIFICATION_MAX_Y_POS = 150;

const getPosition = ({
                       x, y, width, height,
}) => (
    [width - x < NOTIFICATION_MAX_X_POS
        ? width - NOTIFICATION_MAX_X_POS
        : x,
      height - y < NOTIFICATION_MAX_Y_POS
          ? height - NOTIFICATION_MAX_Y_POS
          : y]
);

const isValidProps = and(
    R.compose(R.both(v => v > 0, isValidPositiveNumber), R.prop('width')),
    R.compose(R.both(v => v > 0, isValidPositiveNumber), R.prop('height')),
    R.compose(R.both(v => v > 0, isValidPositiveNumber), R.prop('xStep')),
    R.compose(R.both(v => v > 0, isValidPositiveNumber), R.prop('yStep')),
    R.compose(R.not, R.isEmpty, R.prop('columns')),
);

export const getNotificationRenderData = (props) => {
  if (isValidProps(props)) {
    const {
      x, y, xStep, yStep, columns, height, width, colors, names,
    } = props;
    const index = Math.round(x / xStep);
    const notes = Object.entries(columns).map(([key, values]) => ({
      property: [names[key]],
      value: values[index],
    }));
    const circles = Object.entries(columns).reduce((acc, [key, values]) => {
      if (key === constants.colNameX) {
        acc[key] = index * xStep;
      } else {
        acc.data.push({
          value: height - values[index] * yStep,
          color: colors[key],
        });
      }
      return acc;
    }, {
      data: [],
    });

    return {
      pos: getPosition({
        x, y, width, height,
      }),
      notes,
      circles,
    };
  }
  return undefined;
};
