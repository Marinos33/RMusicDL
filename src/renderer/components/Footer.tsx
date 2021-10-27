import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { MenuItem, MenuList } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import LinearProgress from '@mui/material/LinearProgress';

const Footer: React.FC = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ top: 'auto', bottom: 0, justifyContent: 'flex-end' }}>
        <Toolbar variant="dense">
          <Box sx={{ width: '100%' }}>
            <LinearProgress />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Footer;
