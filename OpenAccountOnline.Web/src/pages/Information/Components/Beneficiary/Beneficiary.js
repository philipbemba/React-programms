// --- Import --- //
import React, { Fragment, useState } from 'react';

// --- Material Ui Imports --- //
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
// --- Custom Components --- //
import { DatePicker, TextField } from '../../../../components';

function Beneficiary(props) {
  const { setFieldValue, displayName, onRemove, ...formFields } = props;

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
    onRemove();
  };

  return (
    <Fragment>
      <Grid container spacing={4}>
        <Grid item lg={4} md={4} sm={12} xs={12}>
          <TextField id="name" name="name" label="Name" {...formFields} />
        </Grid>
        <Grid item lg={4} md={4} sm={12} xs={12}>
          <DatePicker
            id="date_of_birth"
            name="date_of_birth"
            label="Date of Birth"
            maxDate
            {...formFields}
            setFieldValue={setFieldValue}
          />
        </Grid>
        <Grid item lg={3} md={3} sm={11} xs={11}>
          <TextField
            id="relationship"
            name="relationship"
            label="Relationship"
            {...formFields}
          />
        </Grid>
        <Grid item lg={1} md={1} sm={1} xs={1}>
          <IconButton onClick={openDialog}>
            <DeleteIcon />
          </IconButton>
        </Grid>
      </Grid>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={show}
        onClose={closeDialog}
        aria-labelledby={`${props.id}-dialog-title`}
      >
        <DialogTitle id={`${props.id}-dialog-title`}>
          Remove {displayName}?
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {displayName} and all related information will be removed from your
            new membership application.
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
    </Fragment>
  );
}

// --- Exports --- //
export default Beneficiary;
