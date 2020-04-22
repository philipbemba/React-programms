// --- Imports --- //
import React from 'react';
import PropType from 'prop-types';

// --- Material Ui Imports --- //
import TextField from '@material-ui/core/TextField';

// --- Utils Imports --- //
import { Resolve } from '../../utils';

function TextFieldWrapper(props) {
  const {
    selector,
    id,
    name,
    label,
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    setFieldValue,
    children,
    ...rest
  } = props;

  const hasErrors =
    (Resolve(selector, touched) || {})[name] &&
    (Resolve(selector, errors) || {})[name];

  return (
    <TextField
      id={`${selector}-${id}`}
      name={`${selector}.${name}`}
      label={label}
      value={(Resolve(selector, values) || {})[name]}
      helperText={hasErrors ? Resolve(selector, errors)[name] : ' '}
      error={Boolean(hasErrors)}
      onChange={handleChange}
      onBlur={handleBlur}
      variant="outlined"
      fullWidth
      InputLabelProps={{
        shrink: true
      }}
      {...rest}
    >
      {children}
    </TextField>
  );
}

TextFieldWrapper.prototype = {
  id: PropType.string.isRequired,
  name: PropType.string.isRequired,
  label: PropType.string.isRequired,
  values: PropType.isRequired,
  helperText: PropType.isRequired,
  errors: PropType.isRequired,
  onChange: PropType.func.isRequired,
  onBlue: PropType.func.isRequired
};

export default TextFieldWrapper;
