import React from 'react';
import constants from '../../constants/constants';

const ChartSelector = ({
  graphicSwitcher, selectedGraphics, theme, inputData: { colors, names },
}) => (
  <div className={`${'chart-select--container--'}${theme}`}>
    {Object.keys(selectedGraphics).map((buttonName) => {
      if (buttonName !== constants.colNameX) {
        const style = {
          background: colors[buttonName],
        };
        const selectStatus = selectedGraphics[buttonName] ? 'select' : 'non-select';
        return (
          <button onClick={() => graphicSwitcher(buttonName)} key={buttonName} className="chart-select-button" type="button">
            <div style={style} className={`chart--circle-color chart--circle-color-${selectStatus}`} />
            <span>{names[buttonName]}</span>
          </button>
        );
      }
      return null;
    })}
  </div>
);

export default ChartSelector;
