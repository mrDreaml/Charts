import React from 'react';
import { pure } from 'recompose';
import constants from '../../constants/constants';

import './style.scss';

const CLASS_NAMES = {
  axisXContainer: 'axis-x-container',
  axisXValues: 'axis-x-values',
};

const ChartAxisX = ({
  inputData: { columns: { x: selfColumnsX }, allColumns: { x: allColumnsX } }, steps: { xStep }, range,
}) => {
  const arr = [];
  let datesPointsQuantity = Math.round((range[1] - range[0]) / constants.chartColumns);
  datesPointsQuantity = datesPointsQuantity === 0 ? 1 : datesPointsQuantity;
  const shiftLeft = selfColumnsX[0] - allColumnsX[0];
  const containerAlign = 100;
  for (let i = 0; i < allColumnsX.length; i += 1) {
    const additionalStyle = i % datesPointsQuantity === 0 ? {
      opacity: 1,
    } : {
      opacity: 0,
    };
    arr.push(<span
      className={CLASS_NAMES.axisXValues}
      style={{
        width: containerAlign,
        textAlign: 'center',
        transform: `translate3d(${Math.round((i - shiftLeft) * xStep) - containerAlign / 2}px, 0, 0)`,
        ...additionalStyle,
      }}
    >
      {allColumnsX[i]}
    </span>);
  }
  return (
    <div className={CLASS_NAMES.axisXContainer}>
      {arr}
    </div>
  );
};

export default pure(ChartAxisX);
