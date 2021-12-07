import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Tooltip, useTheme, Box } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import CustomDialog from './common/CustomDialog';
import { useState } from 'react';
import AddForm from './playlists/form/AddForm';
import { FormikProps } from 'formik';

const Header: React.FC = () => {
  const [visibleAddDialog, setVisibleAddDialog] = useState<boolean>(false);
  const theme = useTheme();
  const formRef = React.useRef<FormikProps<any>>(null);

  const showAddDialog = () => setVisibleAddDialog(true);
  const hideAddDialog = () => setVisibleAddDialog(false);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar variant="dense">
          <Box flexGrow={1}>
            <Tooltip title="Add a playlist">
              <AddCircleIcon sx={{ fontSize: 28, color: theme.palette.icon.primary }} onClick={showAddDialog} />
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
