import React from 'react';
import { pure } from 'recompose';
import _round from 'lodash/round';
import constants from '../../constants/constants';

import './style.scss';

const CLASS_NAMES = {
  form: 'notification-form',
  note: {
    property: 'property',
    value: 'value',
  },
  circle: 'circle',
};

const circlesRender = ({ circles }) => {
  const xPos = circles[constants.colNameX];
  return circles.data.map(({ color, value }) => (
    <div
        style={{
        transform: `translate3d(${xPos - 5}px, ${value - 5}px, 0)`,
        borderColor: color,
      }}
        className={CLASS_NAMES.circle}
        key={`${CLASS_NAMES.circle}=${value} ${color}`}
    />
  ));
};

const Notification = ({
  isShow, pos, notes, circles,
}) => {
  if (!pos || !notes || !circles) {
    return null;
  }
  if (!isShow) {
    return null;
  }

  const [x, y] = pos;
  return (
    <>
      <div
        className={CLASS_NAMES.form}
        style={{
          transform: `translate3d(${x}px, ${y}px, 0)`,
        }}
      >
        { notes.map(({ property, value }) => (
            <div className={CLASS_NAMES.note} key={`${CLASS_NAMES.note}=${property}:${value}`}>
            <span className={CLASS_NAMES.note.property}>{`${property}:`}</span>
            <span className={CLASS_NAMES.note.value}>{_round(value, constants.defaultRounding)}</span>
          </div>
        )) }
      </div>
      {circlesRender({ circles, x })}
    </>
  );
};
export default pure(Notification);
