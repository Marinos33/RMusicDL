import React, { useEffect } from 'react';
import { hot } from 'react-hot-loader';
import { CssBaseline, ThemeProvider } from '@mui/material';
import Navigation from './Navigation';
import { createCustomTheme } from './theme';
import useLoadedResources from './hooks/useLoadedResources';
import { useDispatch } from 'react-redux';
import { setGeneralLoading } from './redux/ui/actionCreators';
import useSettings from './hooks/useSettings';

const App: React.FC = () => {
  const isLoadingComplete = useLoadedResources();
  const dispatch = useDispatch();
  const { settings, saveSettings } = useSettings();

  const theme = createCustomTheme({
    theme: settings.theme
  });

  useEffect(() => {
    dispatch(setGeneralLoading(isLoadingComplete, 'Loading Data'));
  }, [isLoadingComplete]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navigation />
    </ThemeProvider>
  );
};

export default hot(module)(App);
