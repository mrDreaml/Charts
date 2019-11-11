import React, { PureComponent } from 'react';
import ChartAxisX from '../Axis/ChartAxisX';
import ChartAxisY from '../Axis/ChartAxisY';
import Notification from '../notification/Notification';
import Chart from '../Chart/Chart';

import '../../styles/style.scss';
import './style.scss';
import constants from '../../constants/constants';

const CLASS_NAMES = {
  yAxisAndSvgContainer: 'y-axis-and-svg--container',
  xAxisAndSvgContainer: 'x-axis-and-svg--container',
};

const NOTIFICATION_MAX_X_POS = 200;
const NOTIFICATION_MAX_Y_POS = 150;

class ChartMainContainer extends PureComponent {
  chartSVGContainer = React.createRef();

  state = {};

  showNotification = ({ nativeEvent: { layerX: x, layerY: y}}) => {
    const {
      inputData: { columns, names, colors }, steps: { xStep, yStep }, containerBounding: {
        width,
        height,
      },
    } = this.props;
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

    const notificationData = {
      isShow: true,
      pos: [width - x < NOTIFICATION_MAX_X_POS
        ? width - NOTIFICATION_MAX_X_POS
        : x,
      height - y < NOTIFICATION_MAX_Y_POS
        ? height - NOTIFICATION_MAX_Y_POS
        : y],
      notes,
      circles,
    };
    this.setState({
      notificationData,
    });
  };

  removeNotification = () => {
    this.setState({
      notificationData: {
        isShow: false,
      },
    });
  };

  render() {
    const { notificationData } = this.state;
    return (
      <>
        <div className={CLASS_NAMES.yAxisAndSvgContainer}>
          <ChartAxisY {...this.props} />
          <div className={CLASS_NAMES.xAxisAndSvgContainer}>
            <div
              style={{
                height: '100%',
                position: 'relative',
                overflow: 'hidden',
              }}
              onMouseMove={this.showNotification}
              onMouseOut={this.removeNotification}
            >
              <Notification {...notificationData} />
              <Chart
                {...this.props}
                svgRef={this.chartSVGContainer}
              />
            </div>
            <ChartAxisX {...this.props} />
          </div>
        </div>
      </>
    );
  }
}

export default ChartMainContainer;
