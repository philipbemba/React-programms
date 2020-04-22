// --- Imports --- //
import React from 'react';

// --- Router Imports --- //
import { Route } from 'react-router-dom';

// -- Page Imports --- //
import {
  Eligibility,
  Products,
  Funding,
  Confirmation,
  Information,
  Success
} from './pages';

function Routes() {
  return (
    <React.Fragment>
      <Route exact path={['/', '/eligibility']} component={Eligibility} />
      <Route exact path="/personal" component={Information} />
      <Route exact path="/products" component={Products} />
      <Route exact path="/funding" component={Funding} />
      <Route exact path="/confirmation" component={Confirmation} />
      <Route exact path="/success" component={Success} />
    </React.Fragment>
  );
}
export default Routes;
