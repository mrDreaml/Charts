import React, { PureComponent } from 'react';
import ChartJS from '../ChartMainContainer/Hoc';
import ChartJSMap from '../ChartMapContainer/Hoc';
import ChartSelector from '../ChartSelector';
import constants from '../../constants/constants';

import './style.scss';

const CLASS_NAMES = {
  chartMapContainer: 'chart-map-container--section',
  chartMainContainer: 'chart-main-container--section',
};

class ChartJSContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      range: constants.range,
      selectedGraphics: [],
      width: window.innerWidth,
    };
    this.chartMainContainer = React.createRef();
    this.chartMapContainer = React.createRef();
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions);
    const { inputData } = this.props;
    this.setState({
      selectedGraphics: Object.keys(inputData.names).reduce((result, name) => {
        result[name] = true;
        return result;
      }, {}),
    });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  updateRange = (newRange) => {
    this.setState({
      range: newRange,
    });
  };

  updateDimensions = () => {
    this.setState({
      width: window.innerWidth,
    });
  };

  graphicSwitcher = (graphicName) => {
    const { selectedGraphics } = this.state;
    this.setState({
      selectedGraphics: {
        ...selectedGraphics,
        [graphicName]: !selectedGraphics[graphicName],
      },
    });
  };

  renderChartMain() {
    const { width, selectedGraphics, range } = this.state;
    if (this.chartMainContainer && this.chartMainContainer.current) {
      return (
        <ChartJS
          {...this.props}
          {...this.state}
          enable={{ notification: true, axisX: true, axisY: true }}
          selectedGraphics={selectedGraphics}
          container={this.chartMainContainer.current}
          range={range}
          updateRange={this.updateRange}
          width={width}
        />
      );
    }
    return null;
  }

  renderChartMap() {
    const { inputData: { columns: { x }} } = this.props;
    const { width, selectedGraphics, range } = this.state;
    if (this.chartMapContainer && this.chartMapContainer.current) {
      return (
        <ChartJSMap
          {...this.props}
          {...this.state}
          enable={{ notification: true, axisX: true, axisY: true }}
          selectedGraphics={selectedGraphics}
          container={this.chartMapContainer.current}
          range={range}
          selfRange={[0, x.length]}
          updateRange={this.updateRange}
          width={width}
        />
      );
    }
    return null;
  }

  render() {
    const { selectedGraphics } = this.state;
    return (
      <>
        <section ref={this.chartMainContainer} className={CLASS_NAMES.chartMainContainer}>
          {this.renderChartMain()}
        </section>
        <section ref={this.chartMapContainer} className={CLASS_NAMES.chartMapContainer}>
          {this.renderChartMap()}
        </section>
        <ChartSelector {...this.props} graphicSwitcher={this.graphicSwitcher} selectedGraphics={selectedGraphics} />
      </>
    );
  }
}

export default ChartJSContainer;
