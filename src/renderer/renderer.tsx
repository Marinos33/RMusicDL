import React from 'react';
import ReactDOM from 'react-dom';
import Application from './Application';
import { inDev } from '../utils/helpers';

// Say something
console.log('[ReactDL] : Renderer execution started');

// Application to Render
const app = <Application title="ReactDL" version="0.1.0" />;

// Render application in DOM
ReactDOM.render(app, document.getElementById('app'));

// Hot module replacement
if (inDev() && module.hot) module.hot.accept();
