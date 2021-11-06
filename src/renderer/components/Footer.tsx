import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { useTheme } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';

const Footer: React.FC = () => {
  const theme = useTheme();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ top: 'auto', bottom: 0 }}>
        <Toolbar variant="dense">
          <Box display="flex" flexGrow={1}>
            <div></div>
          </Box>
          <Box sx={{ width: '10%' }}>
            <LinearProgress color="success" sx={{ height: 10, borderRadius: 5 }} />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Footer;
