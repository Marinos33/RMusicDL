import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import Application from './App';
import { inDev } from '../utils/helpers';
import { ThemeProvider } from '@mui/material';
import { theme } from './theme';

// Say something
console.log('[ReactDL] : Renderer execution started');

// Application to Render
const app = (
  <StrictMode>
    <ThemeProvider theme={theme}>
      <Application />
    </ThemeProvider>
  </StrictMode>
);

// Render application in DOM
ReactDOM.render(app, document.getElementById('app'));

// Hot module replacement
if (inDev() && module.hot) module.hot.accept();
