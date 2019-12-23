import React from 'react';
import ChartJS from './components/Main/Index';
import inputData from './data/testData';

import constants from './constants/constants';

import './styles/pageStyle.scss';

console.log(inputData);
const app = () => <ChartJS inputData={inputData} theme={constants.themes.light}/>;

export default app;
