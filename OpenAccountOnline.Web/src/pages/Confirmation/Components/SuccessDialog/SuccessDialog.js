// --- Imports --- //
import React from 'react';

// --- Material Ui Imports --- //
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';
import PhoneIcon from '@material-ui/icons/Phone';

// --- Styling --- //
const useStyles = makeStyles(theme => ({
  phoneIcon: {
    marginRight: '.5em'
  }
}));

function SuccessDialog(props) {
  const classes = useStyles();
  return (
    <Dialog
      fullWidth
      maxWidth="lg"
      open={props.open}
      onClose={props.onClose}
      scroll="paper"
      aria-labelledby="max-width-dialog-title"
    >
      <DialogTitle id="max-width-dialog-title" align="center">
        Welcome to Northwest Community Credit Union
      </DialogTitle>
      <DialogContent align="center">
        <Typography variant="h4">{props.member_number}</Typography>
        <Typography variant="overline" gutterBottom>
          Member Number
        </Typography>
        <Typography paragraph>
          Please check your email for additional information regarding your new
          account.
        </Typography>
        <Typography paragraph>
          Contact Northwest Community Credit Union if you have any questions.
        </Typography>
        <Box display="flex" alignContent="baseline" justifyContent="center">
          <PhoneIcon fontSize="small" className={classes.phoneIcon} />
          <Typography> (800) 452-9515</Typography>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

// --- Exports --- //
export default SuccessDialog;
