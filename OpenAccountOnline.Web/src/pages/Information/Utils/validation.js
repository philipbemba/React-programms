// --- Imports --- //
import * as yup from 'yup'; // for everything
import { types as appTypes } from '../../../store/Application/Application';
import { DateFormat } from '../../../utils';

// --- Regex --- //
const alpha_num_limited = {
  regex: /^([a-zA-Z0-9'.\s$%&#,"\-_])+$|(^$)/,
  message: 'Only letters, numbers, spaces, and limited punctuation are allowed.'
};

const number = {
  regex: /^([0-9])+$|(^$)/,
  message: 'Only numbers are allowed.'
};
const social_security_number = {
  regex: /^\d{3} - \d{2} - \d{4}$/,
  message: 'Social Security Number must be formatted as xxx - xx - xxxx'
};

const zip = {
  regex: /^(\d{5}(?:[-]\d{4})?$)|(^$)/,
  message: 'Zip code must be formatted as XXXXX or XXXXX-XXXX'
};

const phone = {
  regex: /^(\d{3} - \d{3} - \d{4}$)|(^$)/,
  message: 'Phone number must be a plain number or in the xxx-xxx-xxxx format'
};
// --- Utility Methods --- //
/**
 * Checks if value is empty
 * @param {*} value value to be determined if empty
 */
const isEmpty = value => {
  return value === undefined ||
    value === null ||
    (typeof value === 'string' && !value.trim().length)
    ? true
    : false;
};

/**
 * Gets the parent selector from . notation path
 * @param {string} path . notation path to value in object
 */
const getSelector = path => {
  // var name = path.split('.');
  var name = path.split(/[.[\]]+/);

  // Check if joint is in split array
  var isJoint = name.includes('joints');

  // Split depending on size of selector array
  if ((isJoint && name.length === 3) || name.length === 2) {
    name.splice(-1, 1);
  } else {
    name.splice(-2, 2);
  }
  return name.join('.');
};

/**
 * Make a field required if no input in given list contain a value
 */
/** NOTE: Fix selector to look at the value schema or self */
yup.addMethod(yup.string, 'requiredIf', function(list, message) {
  return this.test('requiredIf', message, function(value) {
    const { path, createError } = this;

    // remove last sector from path
    const selector = getSelector(path);

    // check if any in list contain value
    // true : one or more are contains a value
    // false: none contain a value
    var anyHasValue = list.some(value => {
      // return `true` if value is not empty, return `false` if value is empty
      return Boolean(
        document.querySelector(`input[name="${selector}.${value}"]`).value
      );
    });

    // returns `CreateError` current value is empty and no value is found, returns `false` if current value is not empty and one other field is not empty.
    return isEmpty(value) && !anyHasValue
      ? createError({ path, message })
      : true;
  });
});

/**
 * Make a field required if given input matches given value
 */
yup.addMethod(yup.mixed, 'requiredIfEqual', function(
  input_name,
  check_input_value,
  message
) {
  return this.test('requiredIfEqual', message, function(value) {
    const { path, createError } = this;

    // remove last sector from path
    const selector = getSelector(path);

    var current_input_value = document.querySelector(
      `input[name="${selector}.${input_name}"]`
    ).value;

    // returns `CreateError` current value is empty and no value is found, returns `false` if current value is not empty and one other field is not empty.
    return isEmpty(value) && current_input_value === check_input_value
      ? createError({ path, message })
      : true;
  });
});

/**
 * Validation for physical address
 */
const physical_address_schema = yup.object().shape({
  line_one: yup
    .string()
    .matches(alpha_num_limited.regex, alpha_num_limited.message)
    .required('Address required'),
  line_two: yup
    .string()
    .matches(alpha_num_limited.regex, alpha_num_limited.message),
  zip: yup
    .string()
    .matches(zip.regex, zip.message)
    .required('Zip required'),
  city: yup
    .string()
    .matches(alpha_num_limited.regex, alpha_num_limited.message)
    .required('City required'),
  state: yup.string().required('State Required')
});

/**
 * Validation for mailing address
 */
const mailing_address_schema = yup.object().shape({
  ine_one: yup
    .string()
    .matches(alpha_num_limited.regex, alpha_num_limited.message),
  ine_two: yup
    .string()
    .matches(alpha_num_limited.regex, alpha_num_limited.message),
  zip: yup.string().matches(zip.regex, zip.message),
  city: yup
    .string()
    .matches(alpha_num_limited.regex, alpha_num_limited.message),
  state: yup.string()
});

/**
 * Validation for identification
 */
const identification_schema = yup.object().shape({
  type: yup.string().required('Identification type required'),
  number: yup
    .string()
    .matches(number.regex, number.message)
    .required('Id Number Required'),
  issuer: yup
    .string()
    .matches(alpha_num_limited.regex, alpha_num_limited.message)
    .required('Issuer Authority or State Required'),
  issue_date: yup
    .date()
    .typeError('Date format is month/day/year ie. 01/01/1990')
    .min(DateFormat.MIN, 'Date must be after 1900')
    .max(DateFormat.MAX, 'Date must be before today')
    .nullable()
    .required('Issue Date Required'),
  expiration_date: yup
    .date()
    .typeError('Date format is month/day/year ie. 01/01/1990')
    .min(DateFormat.MIN, 'Date must be after 1900')
    .nullable()
    .required('Expiration Date Required')
});

/**
 * Validation for person schema
 */
const person_validation_schema = yup.object().shape({
  first_name: yup
    .string()
    .matches(alpha_num_limited.regex, alpha_num_limited.message)
    .required('Legal first name required'),
  middle_name: yup
    .string()
    .matches(alpha_num_limited.regex, alpha_num_limited.message),
  last_name: yup
    .string()
    .matches(alpha_num_limited.regex, alpha_num_limited.message)
    .required('Legal last name required'),
  social_security_number: yup
    .string()
    .matches(social_security_number.regex, social_security_number.message)
    .required('Social Security required'),
  date_of_birth: yup
    .date()
    .typeError('Date format is month/day/year ie. 01/01/1990')
    .min(DateFormat.MIN, 'Date must be after 1900')
    .max(DateFormat.MAX, 'Date must be before today')
    .nullable()
    .required('Date of birth required'),
  physical_address: physical_address_schema,
  mailing_address: mailing_address_schema,
  preferred_contact_method: yup.string().required('Primary phone required'),
  email: yup
    .string()
    .email('Email must be in valid format. (i.e. email@business.com')
    .required('Email address required'),
  home: yup
    .string()
    .matches(phone.regex, phone.message)
    .requiredIf(['cell', 'work'], 'At least one phone number required')
    .requiredIfEqual(
      'preferred_contact_method',
      'home',
      'Home phone required when marked as primary'
    ),
  cell: yup
    .string()
    .matches(phone.regex, phone.message)
    .requiredIf(['home', 'work'], 'At least one phone number required')
    .requiredIfEqual(
      'preferred_contact_method',
      'cell',
      'Cell phone required when marked as primary'
    ),
  work: yup
    .string()
    .matches(phone.regex, phone.message)
    .requiredIf(['home', 'cell'], 'At least one phone number required')
    .requiredIfEqual(
      'preferred_contact_method',
      'work',
      'Work phone required when marked as primary'
    ),
  occupation: yup
    .string()
    .matches(alpha_num_limited.regex, alpha_num_limited.message)
    .required('Occupation required'),
  identification: identification_schema
});

/**
 * Validation for beneficiary schema
 */
const beneficiary_validation_schema = yup.object().shape({
  name: yup
    .string()
    .matches(alpha_num_limited.regex, alpha_num_limited.message)
    .required('Name required'),

  date_of_birth: yup
    .date()
    .typeError('Date format is month/day/year ie. 01/01/1990')
    .min(DateFormat.MIN, 'Date must be after 1900')
    .max(DateFormat.MAX, 'Date must be before today')
    .nullable(),
  relationship: yup
    .string()
    .matches(alpha_num_limited.regex, alpha_num_limited.message)
    .required('Relationship required')
});

const application_validation_schema = yup.object().shape({
  primary: person_validation_schema,
  beneficiaries: yup.array().of(beneficiary_validation_schema),
  joints: yup.array().of(person_validation_schema)
});

export default { application_validation_schema };
