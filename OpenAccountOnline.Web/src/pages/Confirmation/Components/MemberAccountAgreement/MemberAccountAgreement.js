// --- Imports --- //
import React from 'react';

// --- Material Ui Imports --- //
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

// --- Terms and Condition Label Component --- //
const MemberAccountAgreementLabel = props => {
  return (
    <Typography gutterBottom>
      By clicking the checkbox, you authorize us to verify the information you
      submitted and to obtain credit reports concerning you.
    </Typography>
  );
};

function MemberAccountAgreement(props) {
  return (
    <Paper>
      <Box p={2}>
        <FormControlLabel
          control={
            <Checkbox
              id="member_account_agreement_accepted"
              name="member_account_agreement_accepted"
              color="primary"
              value={props.values.member_account_agreement_accepted}
              checked={props.values.member_account_agreement_accepted}
              helpertext={
                props.touched.member_account_agreement_accepted
                  ? props.errors.member_account_agreement_accepted
                  : ' '
              }
              // error={
              //   props.touched.member_account_agreement_accepted &&
              //   Boolean(props.errors.member_account_agreement_accepted)
              // }
              onChange={props.handleChange}
              onBlur={props.handleBlur}
            />
          }
          label={<MemberAccountAgreementLabel />}
        />
        <Typography gutterBottom>
          Upon your request, we will tell you if a credit report was obtained
          and give you the name and address of the credit reporting agency that
          provided the report. You warrant to us that the information you are
          submitting is true and correct.
        </Typography>
        <Typography gutterBottom>
          By submitting this application, you agree to allow us to receive the
          information contained in your application, as well as the status of
          your application.
        </Typography>
      </Box>
    </Paper>
  );
}

// --- Exports --- //
export default MemberAccountAgreement;
