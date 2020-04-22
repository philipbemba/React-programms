// --- Imports --- //
import React, { useEffect } from 'react';

// --- REdux Imports --- //
import { connect } from 'react-redux';

// --- Material Ui Imports --- //
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

// --- Custom Component Imports --- //
import { Product } from './Components';
import { NavBar, NavButton } from '../../components';

// --- Store Imports --- //
import {
  types as progressTypes,
  actions as progressActions,
  operations as progressOperations
} from '../../store/Progress';
import { actions as shoppingCartActions } from '../../store/ShoppingCart';

import { types as catalogTypes } from '../../store/Catalog';

// --- Store Configurations --- //
const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    catalog: state.catalog
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    ...ownProps,
    addToCart: item => dispatch(shoppingCartActions.addItem(item)),
    setProgress: () =>
      dispatch(progressActions.setActive(progressTypes.PRODUCTS)),
    completeStage: () =>
      dispatch(progressActions.setCompleted(progressTypes.PRODUCTS, true)),
    setPreviousCompleted: () =>
      dispatch(
        progressOperations.setCompletes([
          progressTypes.ELIGIBILITY,
          progressTypes.PERSONAL
        ])
      )
  };
};

function Products(props) {
  useEffect(() => {
    props.setProgress();
    props.setPreviousCompleted();
  });

  return (
    <Container>
      <Box my={1}>
        {props.catalog.status === catalogTypes.SUCCESS ? (
          <Grid container spacing={3}>
            {props.catalog.products
              .filter(p => p.type != 'Savings')
              .map(product => {
                const { services, documents, ...productDetails } = product;
                return (
                  <Grid
                    key={product.id}
                    item
                    lg={4}
                    md={6}
                    sm={6}
                    xs={12}
                    style={{
                      display: 'flex',
                      alignContent: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Product
                      {...productDetails}
                      services={props.catalog.services.filter(s =>
                        services.includes(s.id)
                      )}
                      documents={props.catalog.documents.filter(s =>
                        documents.includes(s.id)
                      )}
                      addToCart={props.addToCart}
                    />
                  </Grid>
                );
              })}
          </Grid>
        ) : (
          <Typography>No Products Found</Typography>
        )}
      </Box>

      <NavBar
        previous={
          <NavButton
            to="/personal"
            variant="outlined"
            color="primary"
            size="large"
            direction="previous"
          >
            Personal
          </NavButton>
        }
        next={
          <NavButton
            onClick={e => {
              props.completeStage();
            }}
            to="/funding"
            variant="contained"
            color="primary"
            size="large"
            direction="next"
          >
            Funding
          </NavButton>
        }
      />
    </Container>
  );
}

// --- Store Connection --- //
const StatefulProducts = connect(
  mapStateToProps,
  mapDispatchToProps
)(Products);

// --- Exports --- //
export default StatefulProducts;
