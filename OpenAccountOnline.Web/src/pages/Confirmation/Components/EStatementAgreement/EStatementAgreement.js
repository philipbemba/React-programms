// --- Imports --- //
import React from 'react';

// --- Material Ui Imports --- //
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

// --- Terms and Condition Label Component --- //
const EStatementAgreementLabel = props => {
  return (
    <Typography gutterBottom>
      I would like to receive electronic statements instead of monthly mailed statements.
    </Typography>
  );
};

function EStatementAgreement(props) {
  return (
      <Box p={2}>
        <FormControlLabel
          control={
            <Checkbox
              id="estatement_agreement_accepted"
              name="estatement_agreement_accepted"
              color="primary"
              value={props.values.estatement_agreement_accepted}
              checked={props.values.estatement_agreement_accepted}
              onChange={props.handleChange}
              onBlur={props.handleBlur}
            />
          }
          label={<EStatementAgreementLabel />}
        />
      </Box>
  );
}

// --- Exports --- //
export default EStatementAgreement;
