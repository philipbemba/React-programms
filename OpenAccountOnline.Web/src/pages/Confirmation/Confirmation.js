// --- Imports --- //
import React, { useEffect, useState, Fragment } from 'react';

// --- REdux Imports --- //
import { connect } from 'react-redux';

// --- Material Ui Imports --- //
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

// --- Custom Components --- //
import { NavButton, NavBar, Joint } from '../../components';

// --- Custom Component --- //
import {
  ConfirmationProductItem,
  EStatementAgreement,
  MemberAccountAgreement,
  SubmissionDialog,
  SuccessDialog,
  Person
} from './Components';
import { Formik, Form } from 'formik';

// --- Store Imports --- //
import {
  types as progressTypes,
  actions as progressActions,
  operations as progressOperations
} from '../../store/Progress';
import {
  actions as appActions,
  utils as appUtils,
  operations as appOperations
} from '../../store/Application';
import { selectors as catalogSelectors } from '../../store/Catalog';

// --- Store Configurations --- //
const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    products: state.shoppingCart.products,
    primary: state.application.primary,
    joints: state.application.joints,
    beneficiaries: state.application.beneficiaries,
    confirmation: state.application.confirmation,
    items: state.shoppingCart.items,
    share: catalogSelectors.getRequiredShare(
      state,
      appUtils.calculateAge(state.application.primary.date_of_birth)
    ),
    catalog: state.catalog
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    ...ownProps,
    setProgress: () =>
      dispatch(progressActions.setActive(progressTypes.CONFIRMATION)),
    setPreviousCompleted: () => {},
    // dispatch(
    //   progressOperations.setCompletes([
    //     progressTypes.ELIGIBILITY,
    //     progressTypes.PERSONAL,
    //     progressTypes.PRODUCTS,
    //     progressTypes.FUNDING
    //   ])
    // ),
    submitFields: values => {
      dispatch(appActions.setConfirmationFields(values));
    },
    setNewMembership: values => {
      dispatch(appActions.setNewMembershipInformation(values));
    },
    submitApplication: () => {
      return dispatch(appOperations.submitApplication());
    }
  };
};

// --- Formik Function --- //
const SubmitForm = (values, formik, props) => {
  // Make call to create account
  props
    .submitApplication()
    .then(response => {
      // Set isSubmitting to false
      formik.setSubmitting(false);

      // TODO: set response data to new member state

      // Redirect user to success page
      props.history.push('/success');
    })
    .catch(response => {
      // Set isSubmitting to false
      formik.setSubmitting(false);

      // TODO: Show error from response
    });

  //TODO: Navigate user to confirmation page
};

function Confirmation(props) {
  useEffect(() => {
    props.setProgress();
    props.setPreviousCompleted();
  });

  return (
    <Container>
      <Person {...props.primary} />

      {props.beneficiaries.length > 0 ? (
        <Box py={2}>
          <Typography variant="h4" gutterBottom>
            Beneficiaries
          </Typography>

          <List>
            {props.beneficiaries.map(beneficiary => {
              return (
                <ListItem>
                  <ListItemText
                    primary={beneficiary.name}
                    secondary={
                      <Typography variant="overline" component="p">
                        {beneficiary.relationship}
                        {Boolean(beneficiary.date_of_birth)
                          ? ` - ${beneficiary.date_of_birth}`
                          : ''}
                      </Typography>
                    }
                  />
                </ListItem>
              );
            })}
          </List>
        </Box>
      ) : (
        ''
      )}

      {/* Display joints added to the applications */}
      {props.joints.map((joint, index) => (
        <Joint
          key={joint.id}
          id={joint.id}
          displayName={
            Boolean(joint.first_name)
              ? `Joint ${joint.first_name} ${joint.middle_name} ${joint.last_name}`
              : `Joint ${index + 1}`
          }
        >
          <Person {...joint} />
        </Joint>
      ))}

      {/* Display selected product */}
      <Box py={2}>
        <Typography variant="h4" gutterBottom>
          Selected Products
        </Typography>

        <List>
          {/* Add Required Product to cart as non removable to verify */}
          <Fragment>
            <ConfirmationProductItem required {...props.share} />
            <Divider />
          </Fragment>

          {/* Display products in cart to verify*/}
          {props.items.map(p => {
            const product = props.catalog.products.find(pc => pc.id === p.id);
            return (
              <Fragment key={`product-group-${p.cartId}`}>
                <ConfirmationProductItem
                  key={p.cartId}
                  {...product}
                  remove={() => {
                    props.removeProduct(p.cartId);
                  }}
                />
                {p.services.map(s => {
                  const service = props.catalog.services.find(
                    sc => sc.id === s.id
                  );
                  return (
                    <ConfirmationProductItem
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
      </Box>

      <Formik
        initialValues={props.confirmation}
        // validationSchema={Validation.schema}
        onSubmit={(values, formik) => SubmitForm(values, formik, props)}
        render={formikProps => (
          <Form>
            <MemberAccountAgreement {...formikProps} />
            <EStatementAgreement {...formikProps} />
            <NavBar
              previous={
                <NavButton
                  to="/funding"
                  variant="outlined"
                  color="primary"
                  size="large"
                  direction="previous"
                >
                  Funding
                </NavButton>
              }
              next={
                <NavButton
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={props.isSubmitting}
                >
                  Submit Membership
                </NavButton>
              }
            />
            <SubmissionDialog open={formikProps.isSubmitting} />
          </Form>
        )}
      />
    </Container>
  );
}

// --- Store Connection --- //
const StatefulConfirmation = connect(
  mapStateToProps,
  mapDispatchToProps
)(Confirmation);

// --- Exports --- //
export default StatefulConfirmation;
