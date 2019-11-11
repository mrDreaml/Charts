import React from 'react';
import uuid from 'uuid';
import constants from '../../constants/constants';

import './style.scss';
import { calcPath } from './utils/base';

const CLASS_NAMES = {
  path: 'chart--path',
};

export default ({
  selectedGraphics, inputData: { colors, columns }, steps: { yStep, xStep }, containerBounding: { height },
}) => {
  const dPaths = Object.entries(columns).reduce((path, [colName, colValue]) => {
    if (colValue !== null && colName !== constants.colNameX && selectedGraphics[colName]) {
      path[colName] = calcPath(columns[colName], height, yStep, xStep);
    }
    return path;
  }, {});
  return (
    Object.entries(dPaths).map(([colName, dPath]) => (
      <path
        d={dPath}
        key={uuid()}
        stroke={colors[colName]}
        className={CLASS_NAMES.path}
      />
    ))
  );
};
