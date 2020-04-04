import React from 'react';
import ReactDOM from 'react-dom';
import ChartJS from './components/Main';
import DATA from './data/testData';

const APP_NAME = '__UNIQ_NAME_CHARTS__';
//const DATA = '__UNIQ_DATA_CHARTS__';
const div = document.createElement('div');
div.setAttribute('id', APP_NAME);
document.body.appendChild(div);

ReactDOM.render(
  <ChartJS inputData={DATA} />,
  document.getElementById(APP_NAME),
);

module.hot.accept();
