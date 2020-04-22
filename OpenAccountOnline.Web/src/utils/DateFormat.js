// --- Imports --- //
import moment from 'moment';

const MIN = '01/01/1900';

const MAX = moment().format('M/D/YYYY');

const FORMAT = 'MM/dd/yyyy';

const DISPlAY_FORMAT = 'M/D/YYYY';

function toDisplay(string) {
  return moment(string).format(DISPlAY_FORMAT);
}

function toUTC(string) {
  return moment(string)
    .utc()
    .format();
}

export default { MIN, MAX, FORMAT, toDisplay, toUTC };
