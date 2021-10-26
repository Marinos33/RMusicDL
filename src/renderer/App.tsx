import React from 'react';
import { hot } from 'react-hot-loader';
import { CssBaseline } from '@mui/material';
import Playlists from './pages/Playlists';
import Navigation from './Navigation';

const App: React.FC = () => {
  return (
    <>
      <CssBaseline />
      <Navigation />
    </>
  );
};

export default hot(module)(App);
