// --- Imports --- //
import React from 'react';

// --- Material Ui Imports --- //
import Toolbar from '@material-ui/core/Toolbar';
import MobileStepper from '@material-ui/core/MobileStepper';
import makeStyles from '@material-ui/core/styles/makeStyles';

// --- Styles --- //

const useStyles = makeStyles(theme => ({
  root: {
    color: theme.palette.white.main,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'none',
    marginBottom: 0,
    [theme.breakpoints.down('sm')]: {
      display: 'flex'
    }
  },
  mobileStepper: {
    maxWidth: 400,
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    '& .MuiMobileStepper-dots': {
      width: '100%',
      justifyContent: 'space-evenly'
    },
    '& .MuiMobileStepper-dot': {
      width: 16,
      height: 16,
      margin: '0px 4px'
    }
  }
}));

function MobileApplicationStepper(props) {
  const classes = useStyles();
  return (
    <Toolbar className={classes.root}>
      <MobileStepper
        variant="dots"
        position="static"
        steps={5}
        activeStep={Object.keys(props.stages).indexOf(props.active)}
        className={classes.mobileStepper}
      />
    </Toolbar>
  );
}

export default MobileApplicationStepper;
