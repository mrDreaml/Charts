import { compose, withProps } from 'recompose';
import ChartMainContainer from './ChartMainContainer';
import { calcSteps, calcYMaxValue, getActualColumns } from '../../utils/containerBase';


export default compose(
  withProps((props) => {
    const {
      inputData, range, selectedGraphics, container,
    } = props;

    const { width, height } = container.getBoundingClientRect();
    const actualColumns = getActualColumns(inputData.columns, selectedGraphics, range);

    return {
      ...props,
      steps: calcSteps(actualColumns, width, height),
      inputData: {
        ...inputData,
        columns: actualColumns,
        allColumns: inputData.columns,
      },
      containerBounding: {
        width,
        height,
      },
      yMaxValue: calcYMaxValue(actualColumns),
    };
  }),
)(ChartMainContainer);
