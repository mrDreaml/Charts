import React from 'react';
import uuid from 'uuid';
import constants from '../../constants/constants';

import './style.scss';

const CLASS_NAMES = {
  path: 'chart--path',
};

export default ({
  selectedGraphics, inputData: { colors, columns }, steps: { yStep, xStep }, containerBounding: { height },
}) => {
  const dPaths = Object.entries(columns).reduce((path, [colName, colValue]) => {
    if (colValue !== null && colName !== constants.colNameX && selectedGraphics[colName]) {
      path[colName] = (columns[colName].reduce((d, yValue, xValue) => {
        const yCoordinate = Math.round(height - yValue * yStep);
        const xCoordinate = Math.round(xValue * xStep);
        if (xValue === 0) {
          return `M${xCoordinate} ${yCoordinate}`;
        }
        return d.concat(` L${xCoordinate} ${yCoordinate}`);
      }, ''));
    }
    return path;
  }, {});
  return (
    Object.entries(dPaths).map(([colName, dPath]) => <path d={dPath} key={uuid()} stroke={colors[colName]} className={CLASS_NAMES.path} />)
  );
};
