import { compose, withProps } from 'recompose';
import ChartGraphicMap from './ChartGraphicMap';
import constants from '../../../constants/constants';

const STEP = 'Step';

export default compose(
  withProps((props) => {
    const {
      inputData, selfRange, selectedGraphics, container,
    } = props;

    const { width, height } = container.getBoundingClientRect();
    const actualColumns = Object.entries(inputData.columns).reduce((acc, [key, values]) => {
      if (selectedGraphics[key]) {
        acc[key] = values.slice(...selfRange);
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

    return {
      ...props,
      steps,
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
)(ChartGraphicMap);
