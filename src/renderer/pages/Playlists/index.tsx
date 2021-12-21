import React from 'react';
import { hot } from 'react-hot-loader';
import { default as PlaylistsGrid } from '@src/renderer/components/playlists/DataTable';
import { Box } from '@mui/material';
import Header from '@src/renderer/components/playlists/CustomToolbar';
import Footer from '@src/renderer/components/playlists/GridFooter';
import SideBar from '@src/renderer/components/playlists/SideBar';

const PlaylistsPage: React.FC = () => {
  return (
    <Box sx={{ ml: 8 }}>
      <SideBar />
      <PlaylistsGrid />
    </Box>
  );
};

export default hot(module)(PlaylistsPage);
