import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Tooltip, useTheme, Box, IconButton } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import CustomDialog from './common/CustomDialog';
import { useState } from 'react';
import AddForm from './playlists/form/AddForm';
import { FormikProps } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/reducers/rootReducer';
import { fetchPlaylists, removePlaylist } from '../redux/playlist/actionCreators';
import { setGeneralLoading } from '../redux/ui/actionCreators';

const Header: React.FC = () => {
  const [visibleAddDialog, setVisibleAddDialog] = useState<boolean>(false);
  const theme = useTheme();
  const formRef = React.useRef<FormikProps<any>>(null);
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
          <Box>
            <Tooltip title="Settings">
              <IconButton>
                <SettingsIcon sx={{ fontSize: 30, color: theme.palette.icon.primary }} />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>
      <CustomDialog
        open={visibleAddDialog}
        title={'Add a playlist'}
        onClose={hideAddDialog}
        onSubmit={() => {
          formRef.current?.handleSubmit();
        }}
        component={<AddForm innerRef={formRef} />}
      />
    </Box>
  );
};

export default Header;
