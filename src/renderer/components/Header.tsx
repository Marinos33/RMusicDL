import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Icon, MenuItem, MenuList, Tooltip, useTheme, Box } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';

const Header: React.FC = () => {
  const theme = useTheme();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar variant="dense">
          <Box flexGrow={1}>
            <Tooltip title="Add a playlist">
              <AddCircleIcon sx={{ fontSize: 28, color: theme.palette.icon.primary }} />
            </Tooltip>
            <Tooltip title="Remove selected playlists">
              <DeleteForeverIcon sx={{ fontSize: 30, color: theme.palette.icon.primary, ml: 2 }} />
            </Tooltip>
          </Box>
          <Box>
            <Tooltip title="Settings">
              <SettingsIcon sx={{ fontSize: 30, color: theme.palette.icon.primary }} />
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
