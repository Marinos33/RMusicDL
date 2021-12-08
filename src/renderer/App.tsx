import React from 'react';
import { hot } from 'react-hot-loader';
import { CssBaseline, ThemeProvider } from '@mui/material';
import Navigation from './Navigation';
import { createCustomTheme } from './theme';
import store from './redux/store';
import { Provider as StoreProvider } from 'react-redux';

const App: React.FC = () => {
  const theme = createCustomTheme({
    theme: 'BLUE'
  });

  return (
    <StoreProvider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navigation />
      </ThemeProvider>
    </StoreProvider>
  );
};

export default hot(module)(App);
