import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import * as React from 'react';
import Draggable from 'react-draggable';

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

export default function ConfirmDialog({
  handleClose,
  open,
  handleComfirm,
  message,
}) {
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          Comfirm
        </DialogTitle>
        <DialogContent>
          <DialogContentText>{message}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            No
          </Button>
          <Button onClick={handleComfirm}>Yes</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
