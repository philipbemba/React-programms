// --- Imports --- //
import React, { useEffect, Fragment, useState } from 'react';
import { Formik, Form, FieldArray } from 'formik';

// --- Redux Imports --- //
import { connect } from 'react-redux';

// --- Material Ui Imports --- //
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import makeStyles from '@material-ui/core/styles/makeStyles';

// --- Custom Component Imports --- //
import { Person, Beneficiary, ValidationIndicator } from './Components';
import { NavButton, NavBar, Joint } from '../../components';

// --- Import Utilities --- //
import { Validation } from './Utils';

// --- Store Imports --- //
import {
  types as progressTypes,
  actions as progressActions,
  operations as progressOperations
} from '../../store/Progress/Progress';
import {
  types as appTypes,
  operations as appOperations
} from '../../store/Application';

// --- Store Configurations --- //
const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    application: state.application
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    ...ownProps,
    setProgress: () =>
      dispatch(progressActions.setActive(progressTypes.PERSONAL)),
    completeStage: () =>
      dispatch(progressActions.setCompleted(progressTypes.PERSONAL, true)),
    setPreviouslyCompleted: () =>
      dispatch(progressOperations.setCompletes([progressTypes.ELIGIBILITY])),
    submitFields: values => {
      dispatch(appOperations.setApplication(values));
    }
  };
};

// --- styles --- //
const useStyles = makeStyles(theme => ({
  expansionPanelDetails: {
    flexDirection: 'column'
  }
}));

function MemberInformation(props) {
  const classes = useStyles();

  useEffect(() => {
    props.setProgress(true);
    props.setPreviouslyCompleted();
  });

  const onSubmit = async (values, formik) => {
    props.submitFields(values);
    // redirect user after submit
    props.history.push('/products');
  };

  return (
    <React.Fragment>
      <Container>
        <Formik
          initialValues={Object.assign({}, props.application)}
          validationSchema={Validation.application_validation_schema}
          onSubmit={onSubmit}
          render={({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            setFieldValue,
            submitCount
          }) => {
            return (
              <Form>
                {/* {Primary} */}
                <Person
                  selector="primary"
                  {...{
                    values,
                    errors,
                    touched,
                    handleBlur,
                    handleChange,
                    setFieldValue
                  }}
                />

                {/* {Beneficiaries} */}
                <Box mb={4} mt={2}>
                  <FieldArray
                    name="beneficiaries"
                    render={helper => (
                      <ExpansionPanel>
                        <ExpansionPanelSummary
                          expandIcon={<ExpandMoreIcon color="primary" />}
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                        >
                          <Typography color="primary">Beneficiary</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails
                          className={classes.expansionPanelDetails}
                        >
                          {values.beneficiaries.map((beneficiary, index) => {
                            return (
                              <Beneficiary
                                key={`beneficiary.${index}`}
                                id={beneficiary.id}
                                displayName={
                                  Boolean(beneficiary.name)
                                    ? `Beneficiary ${beneficiary.name}`
                                    : `Beneficiary ${index + 1}`
                                }
                                onRemove={() => helper.remove(index)}
                                selector={`beneficiaries.${index}`}
                                {...{
                                  values,
                                  errors,
                                  touched,
                                  handleBlur,
                                  handleChange,
                                  setFieldValue
                                }}
                              />
                            );
                          })}
                          <Box mt={2}>
                            <Button
                              color="primary"
                              variant="outlined"
                              size="large"
                              fullWidth
                              onClick={() =>
                                helper.push(
                                  Object.assign({}, appTypes.BENEFICIARY_SCHEMA)
                                )
                              }
                            >
                              Add Beneficiary{' '}
                            </Button>
                          </Box>
                        </ExpansionPanelDetails>
                      </ExpansionPanel>
                    )}
                  />
                </Box>

                {/* {Joints} */}
                <FieldArray
                  name="joints"
                  render={helper => (
                    <Fragment>
                      {values.joints.map((joint, index) => {
                        return (
                          <Joint
                            key={`joints.${index}`}
                            id={joint.id}
                            displayName={
                              Boolean(joint.first_name)
                                ? `Joint ${joint.first_name} ${joint.middle_name} ${joint.last_name}`
                                : `Joint ${index + 1}`
                            }
                            removable
                            onRemove={() => helper.remove(index)}
                          >
                            <Person
                              selector={`joints.${index}`}
                              {...{
                                values,
                                errors,
                                touched,
                                handleBlur,
                                handleChange,
                                setFieldValue
                              }}
                            />
                          </Joint>
                        );
                      })}
                      <Box my={4}>
                        <Button
                          color="primary"
                          variant="outlined"
                          size="large"
                          fullWidth
                          onClick={() =>
                            helper.push(
                              Object.assign({}, appTypes.PERSON_SCHEMA)
                            )
                          }
                        >
                          Add Joint{' '}
                        </Button>
                      </Box>
                    </Fragment>
                  )}
                />

                <ValidationIndicator
                  errors={errors}
                  submitCount={submitCount}
                />

                <NavBar
                  previous={
                    <NavButton
                      to="/eligibility"
                      variant="outlined"
                      color="primary"
                      size="large"
                      direction="previous"
                    >
                      Eligibility
                    </NavButton>
                  }
                  next={
                    <NavButton
                      type="submit"
                      to="/products"
                      variant="contained"
                      color="primary"
                      size="large"
                      direction="next"
                    >
                      Products
                    </NavButton>
                  }
                />
              </Form>
            );
          }}
        />
      </Container>
    </React.Fragment>
  );
}

// --- Store Connection --- //
const StatefulMemberInformation = connect(
  mapStateToProps,
  mapDispatchToProps
)(MemberInformation);

// --- Exports --- //
export default StatefulMemberInformation;
