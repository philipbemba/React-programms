// --- Imports --- //
import React, { useEffect } from 'react';
import { connect } from 'react-redux';

// --- Router Imports --- //
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './Routes';

// --- Theme Imports --- //
import { ThemeProvider } from '@material-ui/styles';
import theme from './theme';

// --- Store Imports --- //
import {
  types as catalogTypes,
  operations as catalogOperations
} from './store/Catalog';

// --- Layout Imports --- //
import Layout from './layout';
import ScrollToTop from './layout/components/ScrollToTop';

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
    loadCatalog: () => dispatch(catalogOperations.loadCatalog())
  };
};

function App(props) {
  useEffect(() => {
    if (props.catalog.status == catalogTypes.INIT) {
      props.loadCatalog();
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <ScrollToTop>
          <Layout>
            <Routes />
          </Layout>
        </ScrollToTop>
      </Router>
    </ThemeProvider>
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
