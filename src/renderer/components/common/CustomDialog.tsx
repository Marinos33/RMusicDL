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
  onSubmit?: () => void | (() => Promise<void>);
  component: React.ReactNode;
};

const CustomDialog: React.FC<PropsType> = ({ open, title, onClose, onSubmit, component }) => {
  return (
    <Portal>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>{component}</DialogContent>
        <DialogActions>
          {onSubmit && <Button onClick={onClose}>Cancel</Button>}
          {onSubmit && (
            <Button onClick={onSubmit} autoFocus>
              Submit
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Portal>
  );
};

export default CustomDialog;
