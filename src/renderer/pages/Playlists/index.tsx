import React from 'react';
import { hot } from 'react-hot-loader';
import { default as PlaylistsGrid } from '@src/renderer/components/playlists/DataTable';
import { Box, Container } from '@mui/material';
import Header from '@src/renderer/components/Header';
import Footer from '@src/renderer/components/Footer';
import SideBar from '@src/renderer/components/playlists/SideBar';

const PlaylistsPage: React.FC = () => {
  return (
    <Box>
      {/*<Header />*/}

      {/*<SideBar />*/}
      <PlaylistsGrid />
      <Footer />
    </Box>
  );
};

export default hot(module)(PlaylistsPage);
