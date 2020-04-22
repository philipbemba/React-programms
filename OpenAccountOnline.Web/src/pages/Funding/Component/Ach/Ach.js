// --- imports --- //
import React from 'react';

// --- material ui imports --- //
import Grid from '@material-ui/core/Grid';

// --- Custom Components --- //
import { TextField } from '../../../../components';
import { MenuItem } from '@material-ui/core';

// --- Store Imports --- //
import { types as appTypes } from '../../../../store/Application';

function Ach(props) {
  const { setFieldValue, ...formFields } = props;

  return (
    <Grid container spacing={4}>
      <Grid item lg={6} md={6} sm={12} xs={12}>
        <TextField
          id="name"
          name="name"
          label="Name on Account"
          {...formFields}
        />
      </Grid>
      <Grid item lg={6} md={6} sm={12} xs={12}>
        <TextField
          select
          id="account_type"
          name="account_type"
          label="Account Type"
          {...formFields}
        >
          {appTypes.ACH_ACCOUNT_TYPES.map((type, index) => (
            <MenuItem key={`${type.key}-${index}`} value={type.key}>
              {type.value}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item lg={6} md={6} sm={12} xs={12}>
        <TextField
          id="routing_number"
          name="routing_number"
          label="Routing Number"
          {...formFields}
        />
      </Grid>
      <Grid item lg={6} md={6} sm={12} xs={12}>
        <TextField
          id="account_number"
          name="account_number"
          label="Account Number"
          {...formFields}
        />
      </Grid>
    </Grid>
  );
}

export default Ach;
