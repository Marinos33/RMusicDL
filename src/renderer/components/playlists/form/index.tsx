import React, { useMemo } from 'react';
import { Dialog, DialogContent, DialogTitle, Portal } from '@mui/material';
import AddForm from './DialogFormAdd/AddForm';

type PropsType = {
  open: boolean;
  onClose: () => void;
};

const DialogFormAdd: React.FC<PropsType> = ({ open, onClose }) => {
  return useMemo(
    () => (
      <Portal>
        <Dialog open={open} fullWidth>
          <DialogTitle>Add a playlist</DialogTitle>
          <DialogContent>
            <AddForm onClose={onClose} />
          </DialogContent>
        </Dialog>
      </Portal>
    ),
    [open]
  );
};

export default DialogFormAdd;
