import React, { PureComponent } from 'react';
import ChartAxisX from '../Axis/ChartAxisX';
import ChartAxisY from '../Axis/ChartAxisY';
import Notification from '../Notification/Notification';
import Chart from '../Chart/Chart';

import '../../styles/style.scss';
import './style.scss';
import { getNotificationRenderData } from '../../utils/notification';

const CLASS_NAMES = {
  yAxisAndSvgContainer: 'y-axis-and-svg--container',
  xAxisAndSvgContainer: 'x-axis-and-svg--container',
};


class ChartMainContainer extends PureComponent {
  chartSVGContainer = React.createRef();

  state = {};

  showNotification = ({ nativeEvent: { layerX, layerY } }) => {
    const { inputData, steps, containerBounding } = this.props;
    this.setState({
      notificationData: {
        ...getNotificationRenderData({
          x: layerX,
          y: layerY,
          ...inputData,
          ...steps,
          ...containerBounding,
        }),
        isShow: true,
      },
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
