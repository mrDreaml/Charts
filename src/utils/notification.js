import constants from '../constants/constants';

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

export const getNotificationRenderData = ({
  x, y, xStep, yStep, columns, height, width, colors, names,
}) => {
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
    isShow: true,
    pos: getPosition({
      x, y, width, height,
    }),
    notes,
    circles,
  };
};
