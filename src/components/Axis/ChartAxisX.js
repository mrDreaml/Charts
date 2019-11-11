import React from 'react';
import { pure } from 'recompose';
import constants from '../../constants/constants';

import './style.scss';
import { calcTransformPos, getPointsQuantity, shouldShow } from './utils/base';

const CLASS_NAMES = {
  axisXContainer: 'axis-x-container',
  axisXValues: 'axis-x-values',
};

const ChartAxisX = ({
  inputData: { columns: { x: selfColumnsX }, allColumns: { x: allColumnsX } }, steps: { xStep }, range,
}) => {
  const arr = [];
  const pointsQuantity = getPointsQuantity(range[1] - range[0], constants.chartColumns);
  const shiftLeft = selfColumnsX[0] - allColumnsX[0];
  const containerAlign = 100;
  for (let i = 0; i < allColumnsX.length; i += 1) {
    const additionalStyle = shouldShow(i, pointsQuantity) ? {
      opacity: 1,
    } : {
      opacity: 0,
    };
    const xPos = calcTransformPos(i - shiftLeft, xStep, containerAlign / 2);
    arr.push(<span
      className={CLASS_NAMES.axisXValues}
      key={`${CLASS_NAMES.axisXValues}=${i}`}
      style={{
        width: containerAlign,
        textAlign: 'center',
        transform: `translate3d(${xPos}px, 0, 0)`,
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
