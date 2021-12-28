import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import Application from './App';
import store from './redux/store';
import { Provider as StoreProvider } from 'react-redux';
import { SettingsProvider } from './contexts/SettingsContext';

// Say somethings
console.log(window.electronAPI.isDev);
window.electronAPI.isDev ?? console.log('[ReactDL] : Renderer execution started');

// Application to Render
const app = (
  <StrictMode>
    <StoreProvider store={store}>
      <SettingsProvider>
        <Application />
      </SettingsProvider>
    </StoreProvider>
  </StrictMode>
);

// Render application in DOM
ReactDOM.render(app, document.getElementById('app'));

// Hot module replacement
if (window.electronAPI.isDev && module.hot) module.hot.accept();
