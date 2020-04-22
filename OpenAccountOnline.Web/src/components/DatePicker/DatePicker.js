// --- Imports --- //
import React from 'react';

// --- Date Picker Imports --- //
import DateFnsUtils from '@date-io/date-fns';
import moment from 'moment';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';

// --- Utils Imports --- //
import { Resolve, DateFormat } from '../../utils';

// --- Store Import --- //
import { types as appTypes } from '../../store/Application';

function DatePicker(props) {
  const {
    maxDate,
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
    ...rest
  } = props;

  const hasErrors =
    (Resolve(selector, touched) || {})[name] &&
    (Resolve(selector, errors) || {})[name];

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        id={`${selector}-${id}`}
        name={`${selector}.${name}`}
        label={label}
        value={(Resolve(selector, values) || {})[name]}
        helperText={hasErrors ? Resolve(selector, errors)[name] : ' '}
        error={Boolean(hasErrors)}
        onChange={value => {
          props.setFieldValue(`${selector}.${name}`, DateFormat.toUTC(value));
        }}
        inputVariant="outlined"
        fullWidth
        KeyboardButtonProps={{
          'aria-label': 'change date'
        }}
        InputLabelProps={{
          shrink: true
        }}
        minDate={DateFormat.MIN}
        maxDate={Boolean(maxDate) ? DateFormat.MAX : '01/01/2100'}
        format={DateFormat.FORMAT}
        {...rest}
      />
    </MuiPickersUtilsProvider>
  );
}

export default DatePicker;
