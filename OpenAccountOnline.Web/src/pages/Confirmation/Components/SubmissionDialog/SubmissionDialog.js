// --- Imports --- //
import React from 'react';

// --- Material Ui Imports --- //
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

function SubmissionDialog(props) {
  return (
    <Dialog
      open={props.open}
      scroll="paper"
      aria-labelledby="max-width-dialog-title"
    >
      <DialogContent align="center">
        <Box my={2}>
          <CircularProgress size={80} thickness={5} />
        </Box>
        <DialogContentText>
          <Typography variant="overline">Creating account</Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions />
    </Dialog>
  );
}

// --- Exports --- //
export default SubmissionDialog;
