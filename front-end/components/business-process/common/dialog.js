import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
export default function AlertDialog(props) {

  return (
      <Dialog
        open={props.openDialog}
        onClose={props.handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Log Details
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            WIP
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleCloseDialog} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
  );
}
