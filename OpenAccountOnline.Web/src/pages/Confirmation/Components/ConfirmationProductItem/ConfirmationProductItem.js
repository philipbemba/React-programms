// --- Imports --- //
import React from 'react';

// --- Material Ui Imports ---//
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';

// --- Defining ConfirmationItem Styles --- //
const useStyles = makeStyles(theme => ({
  root: {
    paddingRight: '128px',
    paddingLeft: props => (Boolean(props.service) ? theme.spacing(4) : '')
  }
}));

function ConfirmationProductItem(props) {
  const classes = useStyles(props);
  return (
    <ListItem key={`offer_title_${props.cartId}`} className={classes.root}>
      <ListItemText
        primary={
          <React.Fragment>
            <Typography>{props.name}</Typography>
            <Typography variant="overline" component="p">
              {Boolean(props.required)
                ? 'Required for all new memberships'
                : ''}
            </Typography>
          </React.Fragment>
        }
        secondary={props.description}
      />
    </ListItem>
  );
}

// --- Exports --- //
export default ConfirmationProductItem;
