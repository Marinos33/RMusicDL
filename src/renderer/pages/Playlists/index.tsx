import React from 'react';
import { hot } from 'react-hot-loader';
import { default as PlaylistsGrid } from '@src/renderer/components/playlists/DataTable';
import { Box } from '@mui/material';
import SideBar from '@src/renderer/components/playlists/SideBar';

const PlaylistsPage: React.FC = () => {
  return (
    <Box>
      <SideBar />
      <PlaylistsGrid />
    </Box>
  );
};

export default hot(module)(PlaylistsPage);
