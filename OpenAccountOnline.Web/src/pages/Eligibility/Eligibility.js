// --- Imports --- //
import React, { useEffect } from 'react';
import { Formik, Form } from 'formik';

// --- Redux Imports --- //
import { connect } from 'react-redux';

// --- Material Ui Imports --- //
import makeStyles from '@material-ui/core/styles/makeStyles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import CheckIcon from '@material-ui/icons/Check';
import Link from '@material-ui/core/Link';

// --- Material Ui Icons Imports --- //
// import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

// --- Custom Component Imports --- //
import { NavButton, NavBar } from '../../components';

// --- Import Utilities --- //
import { Validation } from './Utils';

// --- Store Imports --- //
import {
  actions as progressActions,
  types as progressTypes
} from '../../store/Progress/Progress';
import {
  actions as appActions,
  types as appTypes
} from '../../store/Application';
import { Paper } from '@material-ui/core';

// --- Store Configurations --- //
const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    eligibility: state.application.eligibility
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    ...ownProps,
    setProgress: () =>
      dispatch(progressActions.setActive(progressTypes.ELIGIBILITY)),
    completeStage: () =>
      dispatch(progressActions.setCompleted(progressTypes.ELIGIBILITY, true)),
    submitFields: values => {
      dispatch(appActions.setEligibilityFields(values));
    }
  };
};

// --- Styles --- ///
const useStyles = makeStyles(theme => ({
  link: {
    color: theme.palette.primary.main,
    '&:hover': {
      color: theme.palette.primary.dark
    }
  },
  linkText: {}
}));

function Eligibility(props) {
  useEffect(() => {
    props.setProgress(true);
  });

  const classes = useStyles();

  const onSubmit = async (values, formik) => {
    props.submitFields(values);
    // redirect user after submit
    props.history.push('/personal');
  };

  return (
    <Container>
      <Formik
        initialValues={props.eligibility}
        validationSchema={Validation.schema}
        onSubmit={onSubmit}
        render={(formikProps, props) => (
          <Form>
            <Grid container spacing={4}>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <Typography variant="h5" gutterBottom>
                  Applying is fast and easy
                </Typography>
                <Typography>
                  Here's what you'll need to complete your application
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <CheckIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Government-issued ID with current address (driver's license, passport, state ID)" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Your complete physical and mailing address" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Social Security Number" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="You or a family member must live and work in one of the counties below" />
                  </ListItem>
                </List>
              </Grid>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <TextField
                  select
                  id="county"
                  name="county"
                  label="Select the county"
                  variant="outlined"
                  fullWidth
                  value={formikProps.values.county}
                  helperText={
                    formikProps.errors.county ? formikProps.errors.county : ' '
                  }
                  error={
                    formikProps.touched.county &&
                    Boolean(formikProps.errors.county)
                  }
                  onChange={formikProps.handleChange}
                  onBlur={formikProps.handleBlur}
                  InputLabelProps={{
                    shrink: true
                  }}
                >
                  {appTypes.COUNTIES.map(county => (
                    <MenuItem key={`county_${county.value}`} value={county.key}>
                      {county.value}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item lg={12} md={12} sm={12} xs={12}>
                <Paper>
                  <Box p={2}>
                    <Typography>Disclosures</Typography>
                    <List dense>
                      <ListItem>
                        <ListItemText
                          primary={
                            <Link
                              href="https://www.nwcu.com/fees-charges"
                              target="_blank"
                              underline="none"
                              className={classes.link}
                            >
                              <Typography>Services &amp; Charges</Typography>
                            </Link>
                          }
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary={
                            <Link
                              href="https://www.nwcu.com/fees-charges"
                              target="_blank"
                              underline="none"
                              className={classes.link}
                            >
                              <Typography>Fees &amp; Charges</Typography>
                            </Link>
                          }
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary={
                            <Link
                              href="https://www.nwcu.com/rates"
                              target="_blank"
                              underline="none"
                              className={classes.link}
                            >
                              <Typography>Rates</Typography>
                            </Link>
                          }
                        />
                      </ListItem>
                    </List>
                  </Box>
                </Paper>
              </Grid>
            </Grid>

            <NavBar
              next={
                <NavButton
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  to="/personal"
                >
                  Personal
                  <KeyboardArrowRightIcon />
                </NavButton>
              }
            />
          </Form>
        )}
      />
    </Container>
  );
}

// --- Store Connection --- //
const StatefulEligibility = connect(
  mapStateToProps,
  mapDispatchToProps
)(Eligibility);

// --- Exports --- //
export default StatefulEligibility;
