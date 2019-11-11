import React, { PureComponent } from 'react';
import Chart from '../Chart/Chart';
import Focus from '../Focus/Focus';

import '../../styles/style.scss';
// import './style.scss';


class ChartMainContainer extends PureComponent {
  chartSVGContainer = React.createRef();

  render() {
    return (
      <>
        <Focus {...this.props} />
        <Chart
          {...this.props}
          svgRef={this.chartSVGContainer}
        />
      </>
    );
  }
}

export default ChartMainContainer;
