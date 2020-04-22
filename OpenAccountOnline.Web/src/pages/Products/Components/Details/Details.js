// --- Imports --- //
import React from 'react';
import PropTypes from 'prop-types';

// --- Material Ui --- //
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

import useTheme from '@material-ui/core/styles/useTheme';
import useMediaQuery from '@material-ui/core/useMediaQuery';

function ProductDetails(props) {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <Dialog
      open={props.show}
      onClose={props.onClose}
      aria-labelledby="form-dialog-title"
      fullScreen={isSmall}
    >
      <DialogTitle id="form-dialog-title">{props.name}</DialogTitle>
      <DialogContent>
        <DialogContentText>{props.description}</DialogContentText>
        {props.children}
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={props.onConfirm} color="primary" variant="contained">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// --- Prop Definitation --- //
ProductDetails.propTypes = {
  /**
   * if `true` displays product detials
   */
  show: PropTypes.bool.isRequired,

  /**
   * On Click event for confirmation button
   */
  onConfirm: PropTypes.func.isRequired,

  /**
   * On Close clcik event
   */
  onClose: PropTypes.func.isRequired,

  /**
   * Name of the product
   */
  name: PropTypes.string.isRequired,

  /**
   * Description of product
   */
  description: PropTypes.string.isRequired
};

// --- Prop defaults --- //
ProductDetails.defaults = {
  show: false
};

// --- Exports --- //
export default ProductDetails;
