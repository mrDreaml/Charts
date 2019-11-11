import React from 'react';
import { pure } from 'recompose';
import constants from '../../constants/constants';

import './style.scss';
import {calcTransformPos, getPointsQuantity, shouldShow} from './utils/base';

const CLASS_NAMES = {
  axisYContainer: 'axis-y-container',
  axisYValues: 'axis-y-values',
};

const ChartAxisY = ({
  steps: { yStep }, yMaxValue,
}) => {
  const arr = [];
  const pointsQuantity = getPointsQuantity(yMaxValue, constants.chartRows);
  for (let value = 0; value < yMaxValue; value += 1) {
    const key = `${value}yAxisValues`;
    if (shouldShow(value, pointsQuantity)) {
      const yPos = calcTransformPos(-value, yStep);
      arr.push(<span
        className={CLASS_NAMES.axisYValues}
        style={{
          textAlign: 'center',
          transform: `translate3d(0, ${yPos}px, 0)`,
        }}
        key={`${key}axisY`}
      >
        {value}
      </span>);
    }
  }
  return (
    <div className={CLASS_NAMES.axisYContainer}>
      {arr}
    </div>
  );
};

export default pure(ChartAxisY);
