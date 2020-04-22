// --- imports --- //
import React from 'react';

// --- material ui imports --- //
import Grid from '@material-ui/core/Grid';

// --- Custom Components --- //
import { TextField } from '../../../../components';

function CreditCard(props) {
  const { setFieldValue, ...formFields } = props;

  return (
    <Grid container spacing={4}>
      <Grid item lg={6} md={6} sm={12} xs={12}>
        <TextField id="name" name="name" label="Name on Card" {...formFields} />
      </Grid>
      <Grid item lg={6} md={6} sm={12} xs={12}>
        <TextField
          id="number"
          name="number"
          label="Card Number"
          {...formFields}
        />
      </Grid>
      <Grid item lg={4} md={4} sm={12} xs={12}>
        <TextField
          id="security_code"
          name="security_code"
          label="Security Code (CVV)"
          {...formFields}
        />
      </Grid>
      <Grid item lg={4} md={4} sm={12} xs={12}>
        <TextField
          id="expiration_month"
          name="expiration_month"
          label="Expiration Month"
          {...formFields}
        />
      </Grid>
      <Grid item lg={4} md={4} sm={12} xs={12}>
        <TextField
          id="expiration_year"
          name="expiration_year"
          label="Expiration Year"
          {...formFields}
        />
      </Grid>
    </Grid>
  );
}

export default CreditCard;
