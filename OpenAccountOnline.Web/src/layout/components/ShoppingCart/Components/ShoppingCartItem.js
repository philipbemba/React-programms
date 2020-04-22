// --- Import --- //
import React from 'react';

// --- Material Ui Imports --- //
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import withStyles from '@material-ui/core/styles/withStyles';
import makeStyles from '@material-ui/core/styles/makeStyles';
import useTheme from '@material-ui/core/styles/useTheme';
import useMediaQuery from '@material-ui/core/useMediaQuery';

// --- Defining Styles --- //
const listItemStyles = theme => ({
  secondaryAction: {
    paddingRight: '60px',
    [theme.breakpoints.up('sm')]: {
      paddingRight: '128px'
    }
  }
});

// --- Defining custom list item to resolve display issues --- //
const ShoppingCartListItem = withStyles(listItemStyles)(ListItem);

// --- Defining ShoppingCartListItems Styles --- //
const useStyles = makeStyles(theme => ({
  root: {
    paddingRight: '128px',
    paddingLeft: props => (Boolean(props.service) ? theme.spacing(4) : '')
  }
}));

function ShoppingCartItem(props) {
  const classes = useStyles(props);
  const theme = useTheme();
  const isSmall = !useMediaQuery(theme.breakpoints.up('sm'));
  return (
    <ShoppingCartListItem
      key={`offer_title_${props.cartId}`}
      className={classes.root}
    >
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
      {props.remove ? (
        <ListItemSecondaryAction>
          {isSmall ? (
            <IconButton
              edge="end"
              aria-label="remove"
              color="primary"
              onClick={() => {
                props.remove(props.cartId);
              }}
            >
              <DeleteIcon />
            </IconButton>
          ) : (
            <Button
              edge="end"
              aria-label="remove"
              color="primary"
              variant="contained"
              onClick={() => {
                props.remove(props.cartId);
              }}
            >
              Remove
            </Button>
          )}
        </ListItemSecondaryAction>
      ) : (
        ''
      )}
    </ShoppingCartListItem>
  );
}

export default ShoppingCartItem;
