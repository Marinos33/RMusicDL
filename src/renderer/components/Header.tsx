import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Tooltip, useTheme, Box, IconButton } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/reducers/rootReducer';
import { fetchPlaylists, removePlaylist } from '../redux/playlist/actionCreators';
import { setGeneralLoading } from '../redux/ui/actionCreators';
import DialogFormAdd from './playlists/form/DialogFormAdd';
import { useHistory } from 'react-router-dom';

const Header: React.FC = () => {
  const [visibleAddDialog, setVisibleAddDialog] = useState<boolean>(false);
  const theme = useTheme();
  const history = useHistory();
  const selectedPlaylistsId = useSelector<RootState, number[]>((state) => state.playlist.selectedPlaylistsId);
  const dispatch = useDispatch();

  const showAddDialog = () => setVisibleAddDialog(true);
  const hideAddDialog = () => setVisibleAddDialog(false);
  const removePlaylists = async () => {
    dispatch(setGeneralLoading(false, 'Removing playlists'));
    await Promise.all(
      selectedPlaylistsId.map(async (id) => {
        dispatch(removePlaylist(id));
      })
    );
    dispatch(setGeneralLoading(true));
    dispatch(fetchPlaylists());
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar variant="dense">
          <Box flexGrow={1}>
            <Tooltip title="Add a playlist">
              <IconButton onClick={showAddDialog}>
                <AddCircleIcon sx={{ fontSize: 28, color: theme.palette.icon.primary }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Remove selected playlists">
              <IconButton onClick={removePlaylists} sx={{ ml: 2 }}>
                <DeleteForeverIcon sx={{ fontSize: 30, color: theme.palette.icon.primary }} />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>
      <DialogFormAdd open={visibleAddDialog} onClose={hideAddDialog} />
    </Box>
  );
};

export default Header;
