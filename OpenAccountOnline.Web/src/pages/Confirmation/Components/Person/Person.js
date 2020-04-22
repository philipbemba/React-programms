// --- Imports --- //
import React, { Fragment } from 'react';

// --- Material Ui Imports --- //
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

// --- Custom Imports --- //
import ConfirmationField from '../ConfirmationField';

// --- Utilities Imports --- //
import { DateFormat } from '../../../../utils';

// -- Store Imports --- //
import { types as appTypes } from '../../../../store/Application';

function Person(props) {
  return (
    <Fragment>
      <Box py={2}>
        <Typography variant="h4" gutterBottom>
          Personal Information
        </Typography>
        <Grid container spacing={4}>
          <ConfirmationField
            value={
              props.first_name || props.middle_name || props.last_name
                ? `${props.first_name} 
              ${props.middle_name}
              ${props.last_name}`
                : ''
            }
            label={'Full Legal Name'}
          />
          <ConfirmationField
            value={props.social_security_number}
            label={'Social Security Number'}
          />
          <ConfirmationField
            value={DateFormat.toDisplay(props.date_of_birth)}
            label={'Date of Birth'}
          />
        </Grid>
      </Box>

      <Box py={2}>
        <Typography variant="h4" gutterBottom>
          Physical Address
        </Typography>
        <Grid container spacing={4}>
          <ConfirmationField
            value={props.physical_address.line_one}
            label={'Address Line One'}
          />
          <ConfirmationField
            value={props.physical_address.line_two}
            label={'Address Line Two'}
          />
          <ConfirmationField
            value={props.physical_address.city}
            label={'City'}
          />
          <ConfirmationField
            value={props.physical_address.state}
            label={'State'}
          />
          <ConfirmationField value={props.physical_address.zip} label={'Zip'} />
        </Grid>
      </Box>

      <Box py={2} hidden={!Boolean(props.mailing_address.line_one)}>
        <Typography variant="h4" gutterBottom>
          Mailing Address
        </Typography>
        <Grid container spacing={4}>
          <ConfirmationField
            value={props.mailing_address.line_one}
            label={'Address Line One'}
          />
          <ConfirmationField
            value={props.mailing_address.line_two}
            label={'Address Line Two'}
          />
          <ConfirmationField
            value={props.mailing_address.city}
            label={'City'}
          />
          <ConfirmationField
            value={props.mailing_address.state}
            label={'State'}
          />
          <ConfirmationField value={props.mailing_address.zip} label={'Zip'} />
        </Grid>
      </Box>

      <Box py={2}>
        <Typography variant="h4" gutterBottom>
          Contact
        </Typography>
        <Grid container spacing={4}>
          <ConfirmationField
            value={
              props.preferred_contact_method
                ? appTypes.CONTACT_METHOD.find(
                    contact_method =>
                      contact_method.key === props.preferred_contact_method
                  ).value
                : ''
            }
            label={'Preferred Contact Method'}
          />
          <ConfirmationField value={props.email} label={'Email'} />
          <ConfirmationField value={props.home} label={'Home Phone'} />
          <ConfirmationField value={props.cell} label={'Cell Phone'} />
          <ConfirmationField value={props.work} label={'Work Phone'} />
        </Grid>
      </Box>

      <Box py={2}>
        <Typography variant="h4" gutterBottom>
          Employment
        </Typography>
        <Grid container spacing={4}>
          <ConfirmationField value={props.occupation} label={'Occupation'} />
        </Grid>
      </Box>

      <Box py={2}>
        <Typography variant="h4" gutterBottom>
          Identification Documentation
        </Typography>
        <Grid container spacing={4}>
          <ConfirmationField
            value={
              props.identification.type
                ? appTypes.IDENTIFICATION_TYPE.find(
                    idType => idType.key === props.identification.type
                  ).value
                : ''
            }
            label={'Identification Type'}
          />
          <ConfirmationField
            value={props.identification.number}
            label={'ID Number'}
          />
          <ConfirmationField
            value={props.identification.issuer}
            label={'Issuer'}
          />
          <ConfirmationField
            value={DateFormat.toDisplay(props.identification.issue_date)}
            label={'Issue Date'}
          />
          <ConfirmationField
            value={DateFormat.toDisplay(props.identification.expiration_date)}
            label={'Expiration Date'}
          />
        </Grid>
      </Box>
    </Fragment>
  );
}

export default Person;
