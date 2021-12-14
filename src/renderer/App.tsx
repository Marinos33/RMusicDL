import React, { useEffect } from 'react';
import { hot } from 'react-hot-loader';
import { CssBaseline, ThemeProvider } from '@mui/material';
import Navigation from './Navigation';
import { createCustomTheme } from './theme';
import useLoadedResources from './hooks/useLoadedResources';
import { useDispatch } from 'react-redux';
import { setGeneralLoading } from './redux/ui/actionCreators';

const App: React.FC = () => {
  const isLoadingComplete = useLoadedResources();
  const dispatch = useDispatch();
  const theme = createCustomTheme({
    theme: 'BLUE'
  });

  useEffect(() => {
    dispatch(setGeneralLoading(isLoadingComplete));
  }, [isLoadingComplete]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navigation />
    </ThemeProvider>
  );
};

export default hot(module)(App);
