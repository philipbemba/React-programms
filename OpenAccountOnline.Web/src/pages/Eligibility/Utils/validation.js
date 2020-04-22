// --- Imports --- //
import * as yup from 'yup'; // for everything

const isEmpty = value => {
  return value === undefined ||
    value === null ||
    (typeof value === 'string' && !value.trim().length)
    ? true
    : false;
};

yup.addMethod(yup.string, 'requiredIf', function(list, message) {
  return this.test('requiredIf', message, function(value) {
    const { path, createError } = this;

    // check if any in list contain value
    // true : one or more are contains a value
    // flase: none contain a vlue
    var anyHasValue = list.some(value => {
      // return `true` if value is not empty, return `false` if value is empty
      return Boolean(document.querySelector(`input[name="${value}"]`).value);
    });

    // returns `CreateError` current value is empty and no value is found, returns `false` if current value is not empty and one other field is not empty.
    return isEmpty(value) && !anyHasValue
      ? createError({ path, message })
      : true;
  });
});

// --- Yup Configurations --- //
const schema = yup.object().shape({
  county: yup.string().required('County Required')
});

export default { schema };
