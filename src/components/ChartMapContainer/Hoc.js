import { compose, withProps } from 'recompose';
import ChartMapContainer from './ChartMapContainer';
import { calcSteps, getActualColumns } from '../../utils/containerBase';

export default compose(
  withProps((props) => {
    const {
      inputData, selfRange, selectedGraphics, container,
    } = props;

    const { width, height } = container.getBoundingClientRect();
    const actualColumns = getActualColumns(inputData.columns, selectedGraphics, selfRange);

    return {
      ...props,
      steps: calcSteps(actualColumns, width, height),
      inputData: {
        ...inputData,
        columns: actualColumns,
      },
      containerBounding: {
        width,
        height,
      },
    };
  }),
)(ChartMapContainer);
