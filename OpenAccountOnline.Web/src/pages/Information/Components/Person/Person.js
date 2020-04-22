// --- Import --- //
import React, { Fragment } from 'react';
import MaskedInput from 'react-text-mask';

// --- Material Ui Imports --- //
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

// --- Store Imports --- //
import { types as appTypes } from '../../../../store/Application';

// --- Custom Components --- //
import { DatePicker, TextField } from '../../../../components';

function PhoneMaskedTextField(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={ref => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[
        /\d/,
        /\d/,
        /\d/,
        ' ',
        '-',
        ' ',
        /\d/,
        /\d/,
        /\d/,
        ' ',
        '-',
        ' ',
        /\d/,
        /\d/,
        /\d/,
        /\d/
      ]}
      placeholderChar={'\u2000'}
      // showMask
    />
  );
}

function SocialSecurityNumberMaskedTextField(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={ref => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[
        /\d/,
        /\d/,
        /\d/,
        ' ',
        '-',
        ' ',
        /\d/,
        /\d/,
        ' ',
        '-',
        ' ',
        /\d/,
        /\d/,
        /\d/,
        /\d/
      ]}
      placeholderChar={'\u2000'}
      // showMask
    />
  );
}

function Person(props) {
  const { setFieldValue, ...formFields } = props;
  return (
    <Fragment>
      {/* Personal Information */}
      <Grid container spacing={4}>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Typography>Personal Information</Typography>
        </Grid>
        <Grid item lg={4} md={4} sm={12} xs={12}>
          <TextField
            id="first_name"
            name="first_name"
            label="First Name"
            {...formFields}
          />
        </Grid>
        <Grid item lg={4} md={4} sm={12} xs={12}>
          <TextField
            id="middle_name"
            name="middle_name"
            label="Middle Name"
            {...formFields}
          />
        </Grid>
        <Grid item lg={4} md={4} sm={12} xs={12}>
          <TextField
            id="last_name"
            name="last_name"
            label="Last Name"
            {...formFields}
          />
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <DatePicker
            id="date_of_birth"
            name="date_of_birth"
            label="Date of Birth"
            {...formFields}
            maxDate
            setFieldValue={setFieldValue}
          />
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <TextField
            id="social_security_number"
            name="social_security_number"
            label="Social Security Number"
            {...formFields}
            InputProps={{
              inputComponent: SocialSecurityNumberMaskedTextField
            }}
          />
        </Grid>
      </Grid>

      {/* Physical Address */}
      <Grid container spacing={4}>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Typography>Physical Address</Typography>
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <TextField
            id="line_one"
            name="line_one"
            label="Address Line 1"
            {...formFields}
            selector={`${formFields.selector}.physical_address`}
          />
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <TextField
            id="line_two"
            name="line_two"
            label="Address Line 2"
            {...formFields}
            selector={`${formFields.selector}.physical_address`}
          />
        </Grid>

        <Grid item lg={4} md={4} sm={12} xs={12}>
          <TextField
            id="zip"
            name="zip"
            label="Zip"
            {...formFields}
            selector={`${formFields.selector}.physical_address`}
          />
        </Grid>
        <Grid item lg={4} md={4} sm={12} xs={12}>
          <TextField
            id="city"
            name="city"
            label="City"
            {...formFields}
            selector={`${formFields.selector}.physical_address`}
          />
        </Grid>
        <Grid item lg={4} md={4} sm={12} xs={12}>
          <TextField
            select
            id="state"
            name="state"
            label="State"
            {...formFields}
            selector={`${formFields.selector}.physical_address`}
          >
            {appTypes.MAILING_STATES.map(s => {
              return (
                <MenuItem key={s.key} value={s.value}>
                  {s.value}
                </MenuItem>
              );
            })}
          </TextField>
        </Grid>
      </Grid>

      {/* Mailing Address */}
      <Box my={4}>
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon color="primary" />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography color="primary">Different Mailing Address</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid container spacing={4}>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <TextField
                  id="line_one"
                  name="ine_one"
                  label="Address Line 1"
                  {...formFields}
                  selector={`${formFields.selector}.mailing_address`}
                />
              </Grid>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <TextField
                  id="line_two"
                  name="line_two"
                  label="Address Line 2"
                  {...formFields}
                  selector={`${formFields.selector}.mailing_address`}
                />
              </Grid>

              <Grid item lg={4} md={4} sm={12} xs={12}>
                <TextField
                  id="zip"
                  name="zip"
                  label="Zip"
                  {...formFields}
                  selector={`${formFields.selector}.mailing_address`}
                />
              </Grid>
              <Grid item lg={4} md={4} sm={12} xs={12}>
                <TextField
                  id="city"
                  name="city"
                  label="City"
                  {...formFields}
                  selector={`${formFields.selector}.mailing_address`}
                />
              </Grid>
              <Grid item lg={4} md={4} sm={12} xs={12}>
                <TextField
                  select
                  id="state"
                  name="state"
                  label="State"
                  {...formFields}
                  selector={`${formFields.selector}.mailing_address`}
                >
                  {appTypes.MAILING_STATES.map(s => {
                    return (
                      <MenuItem key={s.key} value={s.value}>
                        {s.value}
                      </MenuItem>
                    );
                  })}
                </TextField>
              </Grid>
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </Box>

      {/* Contact */}
      <Grid container spacing={4}>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Typography>Contact</Typography>
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <TextField id="email" name="email" label="Email" {...formFields} />
        </Grid>
        <Grid item lg={4} md={4} sm={12} xs={12}>
          <TextField
            id="cell"
            name="cell"
            label="Cell Phone (Preferred Number)"
            InputProps={{
              inputComponent: PhoneMaskedTextField
            }}
            {...formFields}
          />
        </Grid>
        <Grid item lg={4} md={4} sm={12} xs={12}>
          <TextField
            id="home"
            name="home"
            label="Home Phone"
            InputProps={{
              inputComponent: PhoneMaskedTextField
            }}
            {...formFields}
          />
        </Grid>
        <Grid item lg={4} md={4} sm={12} xs={12}>
          <TextField
            id="work"
            name="work"
            label="Work Phone"
            InputProps={{
              inputComponent: PhoneMaskedTextField
            }}
            {...formFields}
          />
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <TextField
            select
            id="preferred_contact_method"
            name="preferred_contact_method"
            label="Primary Phone"
            {...formFields}
          >
            {appTypes.CONTACT_METHOD.map(cm => (
              <MenuItem key={`contact_method_${cm.key}`} value={cm.key}>
                {cm.value}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>

      {/* Employment */}
      <Grid container spacing={4}>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Typography>Employment</Typography>
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <TextField
            id="occupation"
            name="occupation"
            label="Occupation"
            {...formFields}
          />
        </Grid>
      </Grid>

      {/* Identification Documentation */}
      <Grid container spacing={4}>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Typography>Identification Documentation</Typography>
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <TextField
            select
            id="type"
            name="type"
            label="Type"
            {...formFields}
            selector={`${formFields.selector}.identification`}
          >
            {appTypes.IDENTIFICATION_TYPE.map(id_type => (
              <MenuItem
                key={`identification_type_${id_type.key}`}
                value={id_type.key}
              >
                {id_type.value}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <TextField
            id="number"
            name="number"
            label="ID Number"
            {...formFields}
            selector={`${formFields.selector}.identification`}
          />
        </Grid>

        {/* Select issuing authority base on identification type */}
        <Grid item lg={6} md={6} sm={12} xs={12}>
          {true ? (
            <TextField
              select
              id="issuer"
              name="issuer"
              label="Issuing State"
              {...formFields}
              selector={`${formFields.selector}.identification`}
            >
              {appTypes.MAILING_STATES.map(s => {
                return (
                  <MenuItem key={s.key} value={s.value}>
                    {s.value}
                  </MenuItem>
                );
              })}
            </TextField>
          ) : (
            <TextField
              id="issuer"
              name="issuer"
              label="Issuing Authority"
              {...formFields}
              selector={`${formFields.selector}.identification`}
            />
          )}
        </Grid>

        <Grid item lg={6} md={6} sm={12} xs={12}>
          <DatePicker
            id="issue_date"
            name="issue_date"
            label="Issue Date"
            {...formFields}
            maxDate
            setFieldValue={setFieldValue}
            selector={`${formFields.selector}.identification`}
          />
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <DatePicker
            id="expiration_date"
            name="expiration_date"
            label="Expiration Date"
            {...formFields}
            setFieldValue={setFieldValue}
            selector={`${formFields.selector}.identification`}
          />
        </Grid>
      </Grid>
    </Fragment>
  );
}

export default Person;
