import React, { PureComponent } from 'react';
import ChartLines from '../ChartLines/ChartLines';

import constants from '../../constants/constants';

import '../../styles/style.scss';
import './style.scss';

class Chart extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isSvgStretched: false,
    };
  }


  componentDidMount() {
    setTimeout(() => this.setState({
      isSvgStretched: true,
    }), 0);
  }

  render() {
    const { theme, svgRef } = this.props;
    const { isSvgStretched } = this.state;
    return (
      <svg
        className={`${constants.graphicClassName}--${theme}`}
        ref={svgRef}
      >
        {isSvgStretched
            && <ChartLines {...this.props} />}
      </svg>
    );
  }
}

export default Chart;
