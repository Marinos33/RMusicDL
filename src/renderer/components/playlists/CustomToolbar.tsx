import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Tooltip, useTheme, Box, IconButton, Divider } from '@mui/material';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/reducers/rootReducer';
import { fetchPlaylists, removePlaylist } from '../../redux/playlist/actionCreators';
import { setGeneralLoading } from '../../redux/ui/actionCreators';
import DialogFormAdd from './form/DialogFormAdd';
import { GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton } from '@mui/x-data-grid';

const CustomToolbar = () => {
  const [visibleAddDialog, setVisibleAddDialog] = useState<boolean>(false);
  const theme = useTheme();
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
    <Box>
      <Toolbar variant="dense">
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
      </Toolbar>
      <GridToolbarContainer>
        <Box>
          <GridToolbarColumnsButton />
          <GridToolbarFilterButton />
        </Box>
      </GridToolbarContainer>
      <Divider sx={{ border: 1, borderColor: theme.palette.divider }} />
      <DialogFormAdd open={visibleAddDialog} onClose={hideAddDialog} />
    </Box>
  );
};

export default CustomToolbar;
