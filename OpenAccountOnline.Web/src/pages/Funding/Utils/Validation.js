// --- Imports --- //
import * as yup from 'yup'; // for everything

// --- Regex --- //
const alpha_num_limited = {
  regex: /^([a-zA-Z0-9'.\s$%&#,"\-_])+$|(^$)/,
  message: 'Only letters, numbers, spaces, and limited punctuation are allowed.'
};

const number = {
  regex: /^([0-9])+$|(^$)/,
  message: 'Only numbers are allowed.'
};

const month = {
  regex: /^(0[1-9])|(10)|(11)|(12)|(^$)/,
  message: 'Only months numbers are allow. (ex: 09 for september)'
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
 * Make a field required if given input matches given value
 */
yup.addMethod(yup.mixed, 'requiredIfPaymentEqual', function(
  checking_input_value,
  message
) {
  return this.test('requiredIfEqual', message, function(value) {
    const { path, createError } = this;

    // remove last sector from path
    // const selector = getSelector(path);

    var current_input_value = document.querySelector(`input[name="method"]`)
      .value;
    // returns `CreateError` current value is empty and no value is found, returns `false` if current value is not empty and one other field is not empty.
    return isEmpty(value) && current_input_value === checking_input_value
      ? createError({ path, message })
      : true;
  });
});

/**
 * Validation for credit cards schema
 */
const credit_card_validation_schema = yup.object().shape({
  name: yup
    .string()
    .label('Name on card')
    .matches(alpha_num_limited.regex, alpha_num_limited.message)
    .requiredIfPaymentEqual('credit_card', 'Name on Card Required'),
  number: yup
    .string()
    .label('Card Number')
    .matches(number.regex, number.message)
    .max(16)
    .requiredIfPaymentEqual('credit_card', 'Card Number Required'),
  security_code: yup
    .string()
    .label('Security Code')
    .max(4)
    .matches(number.regex, number.message)
    .requiredIfPaymentEqual('credit_card', 'Security Code Required'),
  expiration_month: yup
    .string()
    .label('Expiration Month')
    .matches(number.regex, number.message)
    .matches(month.regex, month.message)
    .max(2)
    .requiredIfPaymentEqual('credit_card', 'Expiration Month Required'),
  expiration_year: yup
    .string()
    .label('Expiration Year')
    .matches(number.regex, number.message)
    .max(4)
    .requiredIfPaymentEqual('credit_card', 'Expiration Year Required')
});

/**
 * Validation for ACH schema
 */
const ach_validation_schema = yup.object().shape({
  name: yup
    .string()
    .label('Name on Account')
    .matches(alpha_num_limited.regex, alpha_num_limited.message)
    .requiredIfPaymentEqual('ach', 'Name on Account Required'),
  routing_number: yup
    .string()
    .label('Routing Number')
    .matches(number.regex, number.message)
    .max(16, 'Routing Max Length is 16')
    .requiredIfPaymentEqual('ach', 'Routing Number Required'),
  account_number: yup
    .string()
    .label('Account Number')
    .matches(number.regex, number.message)
    .max(16)
    .requiredIfPaymentEqual('ach', 'Account Required'),
  account_type: yup
    .string()
    .label('Account Number')
    .requiredIfPaymentEqual('ach', 'Account Type Required')
});

const funding_validation_schema = yup.object().shape({
  method: yup.string().required('Payment Method Required'),
  credit_card: credit_card_validation_schema,
  ach: ach_validation_schema
});

export default {
  funding_validation_schema
};
