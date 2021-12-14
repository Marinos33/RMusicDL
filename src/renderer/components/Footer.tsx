import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Typography } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import { RootState } from '@src/renderer/redux/reducers/rootReducer';
import { useSelector } from 'react-redux';

const Footer: React.FC = () => {
  const isResourcesLoaded = useSelector<RootState, boolean>((state) => state.ui.isResourcesLoaded);

  const ProgressBar = React.useCallback(() => {
    if (!isResourcesLoaded) {
      return (
        <Box sx={{ width: '10%' }}>
          <Typography variant="subtitle2" color="text.secondary" noWrap align="left">
            Loading data
          </Typography>
          <LinearProgress color="success" sx={{ height: 10, borderRadius: 5 }} />
        </Box>
      );
    }
    return null;
  }, [isResourcesLoaded]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ top: 'auto', bottom: 0 }}>
        <Toolbar variant="dense">
          <Box display="flex" flexGrow={1}>
            <div></div>
          </Box>
          <ProgressBar />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Footer;
