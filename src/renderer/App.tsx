import React from 'react';
import { hot } from 'react-hot-loader';
import { CssBaseline, ThemeProvider } from '@mui/material';
import Navigation from './Navigation';
import { createCustomTheme } from './theme';

const App: React.FC = () => {
  const theme = createCustomTheme({
    theme: 'LIGHT'
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navigation />
    </ThemeProvider>
  );
};

export default hot(module)(App);
