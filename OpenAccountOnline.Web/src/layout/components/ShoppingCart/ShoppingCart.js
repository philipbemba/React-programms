// --- Imports --- //
import React, { Fragment, useState } from 'react';

// -- Material Ui Imports --- //
import { withStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';
import List from '@material-ui/core/List';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Slide from '@material-ui/core/Slide';
import Divider from '@material-ui/core/Divider';

// --- Custom Component --- //
import { ShoppingCartItem } from './Components';

// --- Store Imports --- //
import { connect } from 'react-redux';
import { selectors as catalogSelectors } from '../../../store/Catalog';
import { actions as shoppingCartActions } from '../../../store/ShoppingCart';
import { utils as appUtils } from '../../../store/Application';

import { useSnackbar } from 'notistack';

// --- Store Configurations --- //
const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    catalog: state.catalog,
    items: state.shoppingCart.items,
    share: catalogSelectors.getRequiredShare(
      state,
      appUtils.calculateAge(state.application.primary.date_of_birth)
    )
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    ...ownProps,
    removeProduct: id => dispatch(shoppingCartActions.removeProductItem(id)),
    removeService: (pid, sid) =>
      dispatch(shoppingCartActions.removeServiceItem(pid, sid))
  };
};

// --- Style Imports --- //
const styles = theme => ({
  icon: {
    color: theme.palette.primary.main
  },
  badge: {
    color: theme.palette.brick.main
  },
  navbarSpacer: {
    height: '100px'
  },
  scTitle: {
    flexGrow: 1
  }
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function ShoppingCart(props) {
  const { classes } = props;
  const [showCart, setShowCart] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const closeCart = () => {
    setShowCart(false);
  };

  const removeProduct = id => {
    enqueueSnackbar(`Account removed!`, {
      variant: 'error',
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'right'
      },
      autoHideDuration: 2000
    });

    props.removeProduct(id);
  };

  return (
    <React.Fragment>
      <IconButton color="primary" onClick={() => setShowCart(!showCart)}>
        <Badge badgeContent={props.items.length} color="secondary">
          <ShoppingCartIcon fontSize="large" />
        </Badge>
      </IconButton>
      <Dialog
        fullScreen
        open={showCart}
        onClose={closeCart}
        TransitionComponent={Transition}
      >
        <AppBar>
          <Toolbar>
            <Typography variant="h6" className={classes.scTitle}>
              Shopping Cart
            </Typography>
            <IconButton color="inherit" onClick={closeCart} aria-label="close">
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Box className={classes.navbarSpacer} />
        <List>
          {/* Add Required Product to cart as non removable */}
          <Fragment>
            <ShoppingCartItem required {...props.share} />
            <Divider />
          </Fragment>

          {/* Display products in cart*/}
          {props.items.map(p => {
            const product = props.catalog.products.find(pc => pc.id === p.id);
            return (
              <Fragment key={`product-group-${p.cartId}`}>
                <ShoppingCartItem
                  key={p.cartId}
                  {...product}
                  remove={() => {
                    removeProduct(p.cartId);
                  }}
                />
                {p.services.map(s => {
                  const service = props.catalog.services.find(
                    sc => sc.id === s.id
                  );
                  return (
                    <ShoppingCartItem
                      key={s.cartId}
                      service
                      {...service}
                      remove={() => props.removeService(p.cartId, s.cartId)}
                    />
                  );
                })}
                <Divider />
              </Fragment>
            );
          })}
        </List>
      </Dialog>
    </React.Fragment>
  );
}

// --- Exports --- //
const StatefulShoppingCart = connect(
  mapStateToProps,
  mapDispatchToProps
)(ShoppingCart);

// --- Exports --- //
export default withStyles(styles)(StatefulShoppingCart);
