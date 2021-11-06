import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Portal } from '@mui/core';

type PropsType = {
  open: boolean;
  title: string;
  onClose: () => void;
  onSubmit?: () => void;
  component: React.ReactNode;
  loading?: boolean;
};

const CustomDialog: React.FC<PropsType> = ({ open, title, onClose, onSubmit, component, loading }) => {
  return (
    <Portal>
      <Dialog open={open} fullWidth>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>{component}</DialogContent>
        <DialogActions>
          {onSubmit && <Button onClick={onClose}>Cancel</Button>}
          {onSubmit && (
            <Button onClick={onSubmit} autoFocus variant="contained" disabled={loading}>
              Submit
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Portal>
  );
};

export default CustomDialog;
