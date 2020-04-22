// --- Imports --- //
import React from 'react';
import { withRouter } from 'react-router';

// -- Material Ui Imports --- //
import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';

import { SnackbarProvider } from 'notistack';

// --- Components Imports --- //
import {
  Navigation as NavBar,
  Logo,
  ShoppingCart,
  ApplicationStepper,
  MobileApplicatoinStepper
} from './components';
import { makeStyles } from '@material-ui/styles';

// --- Assets Imports --- //
import background from '../assets/body-bg.jpg';

// --- Store Imports --- //
import { connect } from 'react-redux';

// --- Store Configurations --- //
const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    stages: state.progress.stages,
    active: state.progress.active
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    ...ownProps
  };
};

// --- Styling --- //
const useStyle = makeStyles(theme => ({
  navbarSpacer: {
    height: '112px',
    [theme.breakpoints.down('lg')]: {
      height: '96px'
    }
  },
  snackbar: {
    position: 'absolute',
    top: '132px',
    [theme.breakpoints.down('lg')]: {
      top: '116px'
    },
    zIndex: 1
  },
  layout: {
    paddingBottom: 16,
    minHeight: '100vh',
    height: '100%',
    backgroundColor: '#f1f2ef',
    backgroundImage: `url(${background})`
  }
}));

function Layout(props) {
  const { children } = props;
  const classes = useStyle();

  // Do not render layout on success page
  if (props.location.pathname === '/success') {
    return children;
  }

  return (
    <div className={classes.layout}>
      <SnackbarProvider classes={{ root: classes.snackbar }} maxSnack={1}>
        <NavBar>
          <Toolbar>
            <Logo />
            <ShoppingCart />
          </Toolbar>
        </NavBar>
        <div className={classes.navbarSpacer} />
        <Container>
          <ApplicationStepper stages={props.stages} active={props.active} />
          <MobileApplicatoinStepper
            stages={props.stages}
            active={props.active}
          />
          {children}
        </Container>
      </SnackbarProvider>
    </div>
  );
}

const StatefulLayout = connect(
  mapStateToProps,
  mapDispatchToProps
)(Layout);

// --- Exports --- //
export default withRouter(StatefulLayout);
