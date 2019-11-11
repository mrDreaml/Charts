import { compose, withProps } from 'recompose';
import ChartGraphic from './ChartMainContainer';
import constants from '../../constants/constants';

const STEP = 'Step';

export default compose(
  withProps((props) => {
    const {
      inputData, range, selectedGraphics, container,
    } = props;

    const { width, height } = container.getBoundingClientRect();
    const actualColumns = Object.entries(inputData.columns).reduce((acc, [key, values]) => {
      if (selectedGraphics[key]) {
        acc[key] = values.slice(...range);
      }
      return acc;
    }, {});

    const steps = Object.entries(actualColumns).reduce((acc, [key, value]) => {
      if (key === constants.colNameX) {
        acc[`${constants.colNameX}${STEP}`] = width / (value.length - 1);
        return acc;
      }
      const yStepName = [`${constants.colNameY}${STEP}`];
      if (acc[yStepName]) {
        acc[yStepName] = Math.min(acc[yStepName], height / Math.max(...value));
      } else {
        acc[yStepName] = height / Math.max(...value);
      }
      return acc;
    }, {});

    const yMaxValue = Object.entries(actualColumns).reduce((acc, [key, values]) => {
      if (key !== constants.colNameX) {
        return Math.max(acc, Math.max(...values));
      }
      return acc;
    }, 0);

    return {
      ...props,
      steps,
      inputData: {
        ...inputData,
        columns: actualColumns,
        allColumns: inputData.columns,
      },
      containerBounding: {
        width,
        height,
      },
      yMaxValue,
    };
  }),
)(ChartGraphic);
