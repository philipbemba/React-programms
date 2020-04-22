// --- Import --- //
import React, { Fragment, useState } from 'react';

// --- Material Ui Import --- //
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

// --- styles --- //
const useStyles = makeStyles(theme => ({
  expansionPanel: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4)
  },
  expansionPanelDetails: {
    flexDirection: 'column'
  }
}));

function Joint(props) {
  const classes = useStyles();
  /**
   * Remove Confirmation Dialog state
   */
  const [show, setShow] = useState(false);

  /**
   * Closes Remove Confirmation by setting dialog state to false
   */
  const closeDialog = () => {
    setShow(false);
  };

  /**
   * Opens Remove Confirmation by setting dialog state to true
   */
  const openDialog = () => {
    setShow(true);
  };

  /**
   * Closes Remove Confirmation Dialog and triggers remove joint callback
   */
  const confirmDelete = () => {
    setShow(false);
    props.onRemove();
  };

  // set isRemovable flag if remove depending on remove prop
  const isRemovable = Boolean(props.removable);

  return (
    <Fragment>
      <ExpansionPanel className={classes.expansionPanel} defaultExpanded={true}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon color="primary" />}
          aria-controls={`${props.id}-panel-content`}
          id={`${props.id}-panel-header`}
        >
          <Typography color="primary">{props.displayName}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.expansionPanelDetails}>
          {props.children}
          {isRemovable ? (
            <Box display="flex" justifyContent="center" alignContent="center">
              <Button variant="outlined" onClick={openDialog}>
                <DeleteIcon /> Remove Joint
              </Button>
            </Box>
          ) : (
            ''
          )}
        </ExpansionPanelDetails>
      </ExpansionPanel>

      {/* Delete Confirmation Dialog */}
      {isRemovable ? (
        <Dialog
          open={show}
          onClose={closeDialog}
          aria-labelledby={`${props.id}-dialog-title`}
        >
          <DialogTitle id={`${props.id}-dialog-title`}>
            Remove {props.displayName}?
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              {props.displayName} and all related information will be removed
              from your new membership application.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={confirmDelete} color="primary">
              Remove
            </Button>
          </DialogActions>
        </Dialog>
      ) : (
        ''
      )}
    </Fragment>
  );
}

export default Joint;
