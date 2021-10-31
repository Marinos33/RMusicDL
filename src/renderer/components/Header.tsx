import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Icon, MenuItem, MenuList, Tooltip, useTheme } from '@mui/material';

const Header: React.FC = () => {
  const theme = useTheme();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar variant="dense">
          <MenuList sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', overflow: 'hidden' }}>
            <MenuItem>
              <Tooltip title="Add a playlist">
                <AddCircleIcon sx={{ fontSize: 28, color: theme.palette.icon.primary }} />
              </Tooltip>
            </MenuItem>
            <MenuItem>
              <Tooltip title="Remove selected playlists">
                <DeleteForeverIcon sx={{ fontSize: 30, color: theme.palette.icon.primary }} />
              </Tooltip>
            </MenuItem>
          </MenuList>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
