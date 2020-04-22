// --- Imports --- //
import * as types from './Types';

// --- State Definition --- //
const county = '';
const meets_age_requirements = false;
const primary = Object.assign({}, types.PERSON_SCHEMA);

const joints = [];
// const joints = [
//   Object.assign({}, types.PERSON_SCHEMA),
//   Object.assign({}, types.PERSON_SCHEMA)
// ];

const beneficiaries = [];
const funding = {
  method: '',
  credit_card: Object.assign({}, types.CREDIT_CARD_SCHEMA),
  ach: Object.assign({}, types.ACH_SCHEMA)
};

// --- State Export --- //
export {
  county,
  meets_age_requirements,
  primary,
  joints,
  beneficiaries,
  funding
};
