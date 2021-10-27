import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { MenuItem, MenuList } from '@mui/material';

const Header: React.FC = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar variant="dense">
          <MenuList sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', overflow: 'hidden' }}>
            <MenuItem>
              <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ flexDirection: 'column' }}>
                <AddCircleIcon sx={{ fontSize: 28 }} />
                <Typography variant="subtitle1" component="div" sx={{ flexGrow: 1, fontSize: 14 }}>
                  Add a playlist
                </Typography>
              </IconButton>
            </MenuItem>
            <MenuItem>
              <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ flexDirection: 'column' }}>
                <DeleteForeverIcon sx={{ fontSize: 30 }} />
                <Typography variant="subtitle1" component="div" sx={{ flexGrow: 1, fontSize: 14 }}>
                  Delete playlists
                </Typography>
              </IconButton>
            </MenuItem>
          </MenuList>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
