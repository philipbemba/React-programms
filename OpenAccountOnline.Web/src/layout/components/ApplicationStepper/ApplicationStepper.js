// --- Imports --- //
import React from 'react';

// --- Material Ui Imports --- //
import Toolbar from '@material-ui/core/Toolbar';
import Stepper from '@material-ui/core/Stepper';
import StepLabel from '@material-ui/core/StepLabel';
import Step from '@material-ui/core/Step';
import makeStyles from '@material-ui/core/styles/makeStyles';

// --- Custom Components Imports --- //
import { StepIcon, StepConnector } from './Components';

// --- Store imports --- //
import { types as progressTypes } from '../../../store/Progress';

// --- Styles --- //

const useStyles = makeStyles(theme => ({
  root: {
    // marginBottom: theme.spacing(2),
    marginBottom: 0,
    color: theme.palette.white.main,
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  stepper: {
    width: '100%',
    backgroundColor: 'transparent'
  }
}));

function ApplicationStepper(props) {
  const classes = useStyles();
  return (
    <Toolbar className={classes.root}>
      <Stepper
        connector={<StepConnector />}
        alternativeLabel
        className={classes.stepper}
      >
        <Step
          active={progressTypes.ELIGIBILITY === props.active}
          completed={props.stages[progressTypes.ELIGIBILITY].completed}
        >
          <StepLabel StepIconComponent={StepIcon}>Eligibility</StepLabel>
        </Step>
        <Step
          active={progressTypes.PERSONAL === props.active}
          completed={props.stages[progressTypes.PERSONAL].completed}
        >
          <StepLabel StepIconComponent={StepIcon}>Personal</StepLabel>
        </Step>
        <Step
          active={progressTypes.PRODUCTS === props.active}
          completed={props.stages[progressTypes.PRODUCTS].completed}
        >
          <StepLabel StepIconComponent={StepIcon}>Products</StepLabel>
        </Step>
        <Step
          active={progressTypes.FUNDING === props.active}
          completed={props.stages[progressTypes.FUNDING].completed}
        >
          <StepLabel StepIconComponent={StepIcon}>Funding</StepLabel>
        </Step>
        <Step
          active={progressTypes.CONFIRMATION === props.active}
          completed={props.stages[progressTypes.CONFIRMATION].completed}
        >
          <StepLabel StepIconComponent={StepIcon}>Confirmation</StepLabel>
        </Step>
      </Stepper>
    </Toolbar>
  );
}

export default ApplicationStepper;
