import React, { PureComponent } from 'react';
import { debounce } from 'throttle-debounce';

import './style.scss';
import { getOffset } from '../../utils/getOffset';
import { calcFocusBasis, calcNewRange } from './utils/calcNewRange';

const CLASS_NAMES = {
  focusContainer: 'focus--container',
  focusBorder: {
    left: 'focus-border focus-border--left',
    right: 'focus-border focus-border--right',
  },
  focusNotSelected: 'focus-not-selected',
};

class Focus extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      range: props.range,
    };
  }

  calcAndUpdateRange = (event, data) => {
    let offset;
    if (event.type === 'touchmove') {
      offset = getOffset(event.touches[0]);
    }
    const { x } = offset || getOffset(event);
    const { updateRange, steps: { xStep }, selfRange } = this.props;
    const { range } = this.state;
    if (!this.focusBasis) {
      this.focusBasis = calcFocusBasis(x, range, xStep);
    }
    const newRange = calcNewRange({
      x, data, updateRange, xStep, selfRange, range, focusBasis: this.focusBasis,
    });
    if (newRange) {
      if (this.debounceUpdateRange) {
        this.debounceUpdateRange(newRange);
      } else {
        this.debounceUpdateRange = debounce(10, _data => updateRange(_data));
        this.debounceUpdateRange(newRange);
      }

      this.setState({
        range: newRange,
      });
    }
  };

  rangeDrag = (event, data) => {
    const { container } = this.props;
    this.listener = mouseEvent => this.calcAndUpdateRange(mouseEvent, data);
    container.addEventListener('mousemove', this.listener, false);
    container.addEventListener('touchmove', this.listener, false);
  };

  stopDrag = () => {
    const { container } = this.props;
    container.removeEventListener('mousemove', this.listener, false);
    container.removeEventListener('touchmove', this.listener, false);
    this.debounceUpdateRange = undefined;
    this.listener = undefined;
    this.focusBasis = undefined;
  };

  renderPullBorder = (id) => {
    const { steps: { xStep } } = this.props;
    const { range } = this.state;
    let x;
    if (id === 0) {
      x = range[0] * xStep;
    } else {
      x = range[0] * xStep + (range[1] - range[0]) * xStep;
    }
    const borderWidth = 20;
    return (
      <div
        onMouseDown={e => this.rangeDrag(e, id)}
        onTouchStart={e => this.rangeDrag(e, id)}
        onTouchEnd={this.stopDrag}
        className={id === 0 ? CLASS_NAMES.focusBorder.left : CLASS_NAMES.focusBorder.right}
        style={{
          width: `${borderWidth}px`,
          transform: `translate3d(${x - (id === 1 ? borderWidth : 0)}px, 0, 0)`,
        }}
      />
    );
  };

  renderPullFocus = () => {
    const { steps: { xStep }, containerBounding: { width: chartWidth } } = this.props;
    const { range } = this.state;
    const leftWidth = range[0] * xStep;
    const selectedWidth = (range[1] - range[0]) * xStep;
    const width = selectedWidth;
    const notSelectedRightWidth = chartWidth - leftWidth - selectedWidth;
    return (
      <>
        <div
          onMouseDown={e => this.rangeDrag(e, [0, 1])}
          onTouchStart={e => this.rangeDrag(e, [0, 1])}
          onTouchEnd={this.stopDrag}
          style={{
            width,
            transform: `translate3d(${leftWidth}px, 0, 0)`,
          }}
        />
        <div
          className={CLASS_NAMES.focusNotSelected}
          style={{
            width: leftWidth + 5,
            transform: 'translate3d(0, 0, 0)',
          }}
        />
        <div
          className={CLASS_NAMES.focusNotSelected}
          style={{
            width: notSelectedRightWidth,
            transform: `translate3d(${chartWidth - notSelectedRightWidth}px, 0, 0)`,
          }}
        />
      </>
    );
  };

  render() {
    return (
      <div className={CLASS_NAMES.focusContainer} onMouseLeave={this.stopDrag} onMouseUp={this.stopDrag}>
        {this.renderPullFocus()}
        {this.renderPullBorder(0)}
        {this.renderPullBorder(1)}
      </div>
    );
  }
}

export default Focus;
