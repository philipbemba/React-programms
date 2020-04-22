// --- Imports --- //
import React, { useEffect } from 'react';
import { Formik, Form } from 'formik';

// --- REdux Imports --- //
import { connect } from 'react-redux';

// --- Material Ui Imports --- //
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import { default as MuiTextField } from '@material-ui/core/TextField';

// --- Custom Components Imports --- //
import { NavBar, NavButton, TextField } from '../../components';
import { CreditCard, Ach } from './Component';

// --- Import Utilities --- //
import { Validation } from './Utils';

// --- Store Imports --- //
import {
  types as progressTypes,
  actions as progressActions,
  operations as progressOperations
} from '../../store/Progress/Progress';
import {
  actions as appActions,
  utils as appUtils,
  types as appTypes
} from '../../store/Application';
import { selectors as catalogSelectors } from '../../store/Catalog';

// --- Store Configurations --- //
const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    funding: state.application.funding,
    items: state.shoppingCart.items,
    age: appUtils.calculateAge(state.application.primary.date_of_birth),
    catalog: state.catalog,
    require_share: catalogSelectors.getRequiredShare(
      state,
      appUtils.calculateAge(state.application.primary.date_of_birth)
    )
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    ...ownProps,
    setProgress: () =>
      dispatch(progressActions.setActive(progressTypes.FUNDING)),
    completeStage: () =>
      dispatch(progressActions.setCompleted(progressTypes.PRODUCTS, true)),
    setPreviousCompleted: () =>
      dispatch(
        progressOperations.setCompletes([
          progressTypes.ELIGIBILITY,
          progressTypes.PERSONAL,
          progressTypes.PRODUCTS
        ])
      ),
    submitFields: values => {
      dispatch(appActions.setFunding(values));
    }
  };
};

function Funding(props) {
  useEffect(() => {
    props.setProgress();
    // props.setPreviousCompleted();
  });

  const onSubmit = async (values, formik) => {
    props.submitFields(values);
    // redirect user after submit
    props.history.push('/confirmation');
  };

  /* ---
    - Gather product details
    - Combine with required product to shopping cart to create a cohesive list
    = This is to reduce logic in the render function of the component. 
  --- */
  const shopping_cart_products = props.items.map(p =>
    Object.assign({}, p, props.catalog.products.find(pc => pc.id === p.id))
  );

  const products = [props.require_share, ...shopping_cart_products];

  // Total funding amount
  const total = products
    .map(p => (p.funding !== 0 ? p.funding : parseInt(p.minimum)))
    .reduce((prev, curr) => prev + curr);

  return (
    <React.Fragment>
      <Container>
        <Formik
          initialValues={Object.assign({}, props.funding)}
          validationSchema={Validation.funding_validation_schema}
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
            // combining props to be used in TextFields
            const formProps = {
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              setFieldValue
            };

            return (
              <Form>
                <Grid container spacing={4}>
                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Typography>Overview</Typography>
                  </Grid>
                </Grid>

                {/* Shopping Receipt */}
                <Box my={4}>
                  <List>
                    {/* Display products in cart to show funding amount */}
                    {products.map((product, index) => {
                      return (
                        <ListItem key={`${product.id}-${index}`}>
                          <ListItemText
                            primary={
                              product.funding > 0
                                ? `$${product.funding}`
                                : `$${product.minimum}`
                            }
                            secondary={product.name}
                          />
                        </ListItem>
                      );
                    })}
                    <Divider />
                    <ListItem>
                      <ListItemText primary={`$${total}`} secondary={'Total'} />
                    </ListItem>
                  </List>
                </Box>

                <Grid container spacing={4}>
                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Typography>Funding Options</Typography>
                  </Grid>
                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <MuiTextField
                      select
                      id="method"
                      name="method"
                      label="Select payment method"
                      variant="outlined"
                      fullWidth
                      value={values.method}
                      helperText={(errors || {}).method ? errors.method : ' '}
                      error={
                        (touched || {}).method && Boolean((errors || {}).method)
                      }
                      onChange={handleChange}
                      onBlur={handleBlur}
                      InputLabelProps={{
                        shrink: true
                      }}
                    >
                      {appTypes.PAYMENT_OPTION.map(payment => (
                        <MenuItem
                          key={`payment_methods_${payment.value}`}
                          value={payment.key}
                        >
                          {payment.value}
                        </MenuItem>
                      ))}
                    </MuiTextField>
                  </Grid>
                </Grid>

                {/* Credit Card */}
                {values.method === 'credit_card' ? (
                  <CreditCard selector={'credit_card'} {...formProps} />
                ) : (
                  ''
                )}

                {/* ACH */}
                {values.method === 'ach' ? (
                  <Ach selector={'ach'} {...formProps} />
                ) : (
                  ''
                )}

                {/* Navigation Bar */}
                <NavBar
                  previous={
                    <NavButton
                      to="/products"
                      variant="outlined"
                      color="primary"
                      size="large"
                      direction="previous"
                    >
                      Products
                    </NavButton>
                  }
                  next={
                    <NavButton
                      type="submit"
                      to="/confirmation"
                      variant="contained"
                      color="primary"
                      size="large"
                      direction="next"
                    >
                      Confirmation
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
const StatefulFunding = connect(
  mapStateToProps,
  mapDispatchToProps
)(Funding);

// --- Exports --- //
export default StatefulFunding;
