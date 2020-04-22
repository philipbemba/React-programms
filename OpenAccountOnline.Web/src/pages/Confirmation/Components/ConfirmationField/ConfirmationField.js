// --- Imports --- //
import React from 'react';

// --- Material Ui Imports ---//
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

function ConfirmationField(props) {
  return (
    <Grid
      item
      lg={Boolean(props.lg) ? props.lg : 4}
      md={Boolean(props.md) ? props.md : 4}
      sm={Boolean(props.sm) ? props.sm : 6}
      xs={Boolean(props.xs) ? props.xs : 12}
    >
      <Typography variant="h5">
        {Boolean(props.value) ? props.value : '-'}
      </Typography>
      <Typography variant="overline">{props.label}</Typography>
    </Grid>
  );
}

// --- Exports --- //
export default ConfirmationField;
