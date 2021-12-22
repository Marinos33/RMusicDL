import React from 'react';
import { hot } from 'react-hot-loader';
import { default as PlaylistsGrid } from '@src/renderer/components/playlists/DataTable';
import { Box } from '@mui/material';
import SideBar from '@src/renderer/components/playlists/SideBar';
import { RootState } from '@src/renderer/redux/reducers/rootReducer';
import { useSelector } from 'react-redux';

const PlaylistsPage: React.FC = () => {
  const collapsed = useSelector<RootState, boolean>((state) => state.ui.IsSideBarCollapsed);

  return (
    <Box sx={{ ml: collapsed ? 8.1 : 30 }}>
      <SideBar />
      <PlaylistsGrid />
    </Box>
  );
};

export default hot(module)(PlaylistsPage);
