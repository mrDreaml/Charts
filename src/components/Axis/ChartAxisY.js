import React from 'react';
import { pure } from 'recompose';
import constants from '../../constants/constants';

import './style.scss';

const CLASS_NAMES = {
  axisYContainer: 'axis-y-container',
  axisYValues: 'axis-y-values',
};

const ChartAxisY = ({
  steps: { yStep }, yMaxValue,
}) => {
  const arr = [];
  const pointsQuantity = Math.round(yMaxValue / constants.chartRows) || 1;
  for (let value = 0; value < yMaxValue; value += 1) {
    const key = `${value}yAxisValues`;
    if (Math.round(value % pointsQuantity) === 0) {
      arr.push(<span
        className={CLASS_NAMES.axisYValues}
        style={{
          textAlign: 'center',
          transform: `translate3d(0, ${-value * yStep}px, 0)`,
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
