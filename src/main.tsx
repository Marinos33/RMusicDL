import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { Provider } from 'react-redux';
import store from './redux/store';
import { ConfigProvider } from 'antd';
import { theme as myTheme } from './theme';
import { BridgeContextProvider } from './context/bridgeContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider theme={myTheme}>
        <BridgeContextProvider>
          <RouterProvider router={router} />
        </BridgeContextProvider>
      </ConfigProvider>
    </Provider>
  </React.StrictMode>,
);
