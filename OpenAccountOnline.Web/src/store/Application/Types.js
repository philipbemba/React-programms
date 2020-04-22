// --- Imports --- //
import uuid from 'uuid/v4';
import moment from 'moment';

// --- Type Definition --- //
const SET_ELIGIBILITY = 'oao/application/set_eligibility';
const SET_PERSONAL = 'oao/application/set_personal';
const SET_FUNDING = 'oao/application/set_funding';
const SET_CONFIRMATION = 'oao/application/set_confirmation';
const SET_BENEFICIARIES = 'oao/application/set_beneficiaries';
const SET_PRIMARY = 'oao/application/set_primary';
const SET_JOINTS = 'oao/application/set_joints';
const SET_NEW_MEMBERSHIP_INFORMATION =
  'oao/application/set_new_membership_information';

// --- API Endpoints --- //
const SUBMIT_APPLICATION = '/application';

// --- Predefined Dictionaries --- //
const COUNTIES = [
  { key: 'benton', value: 'Benton County' },
  { key: 'clackamus', value: 'Clackamus County' },
  { key: 'coos', value: 'Coos County' },
  { key: 'crook', value: 'Crook County' },
  { key: 'deschutes', value: 'Deschutes County' },
  { key: 'douglas', value: 'Douglas County' },
  { key: 'jackson', value: 'Jackson County' },
  { key: 'jefferson', value: 'Jefferson County' },
  { key: 'josephine', value: 'Josephine County' },
  { key: 'klamath', value: 'Klamath County' },
  { key: 'lane', value: 'Lane County' },
  { key: 'linn', value: 'Linn County' },
  { key: 'marion', value: 'Marion County' },
  { key: 'multnomah', value: 'Multnomah County' },
  { key: 'washington', value: 'Washington County' }
];

const MAILING_STATES = [
  { key: 'AL', value: 'Alabama' },
  { key: 'AK', value: 'Alaska' },
  { key: 'AZ', value: 'Arizona' },
  { key: 'AR', value: 'Arkansas' },
  { key: 'CA', value: 'California' },
  { key: 'CO', value: 'Colorado' },
  { key: 'CT', value: 'Connecticut' },
  { key: 'DE', value: 'Delaware' },
  { key: 'DC', value: 'District of Columbia' },
  { key: 'FL', value: 'Florida' },
  { key: 'GA', value: 'Georgia' },
  { key: 'HI', value: 'Hawaii' },
  { key: 'ID', value: 'Idaho' },
  { key: 'IL', value: 'Illinois' },
  { key: 'IN', value: 'Indiana' },
  { key: 'IA', value: 'Iowa' },
  { key: 'KS', value: 'Kansas' },
  { key: 'KY', value: 'Kentucky' },
  { key: 'LA', value: 'Louisiana' },
  { key: 'ME', value: 'Maine' },
  { key: 'MD', value: 'Maryland' },
  { key: 'MA', value: 'Massachusetts' },
  { key: 'MI', value: 'Michigan' },
  { key: 'MN', value: 'Minnesota' },
  { key: 'MS', value: 'Mississippi' },
  { key: 'MO', value: 'Missouri' },
  { key: 'MT', value: 'Montana' },
  { key: 'NE', value: 'Nebraska' },
  { key: 'NV', value: 'Nevada' },
  { key: 'NH', value: 'New Hampshire' },
  { key: 'NJ', value: 'New Jersey' },
  { key: 'NM', value: 'New Mexico' },
  { key: 'NY', value: 'New York' },
  { key: 'NC', value: 'North Carolina' },
  { key: 'ND', value: 'North Dakota' },
  { key: 'OH', value: 'Ohio' },
  { key: 'OK', value: 'Oklahoma' },
  { key: 'OR', value: 'Oregon' },
  { key: 'PA', value: 'Pennsylvania' },
  { key: 'RI', value: 'Rhode Island' },
  { key: 'SC', value: 'South Carolina' },
  { key: 'SD', value: 'South Dakota' },
  { key: 'TN', value: 'Tennessee' },
  { key: 'TX', value: 'Texas' },
  { key: 'UT', value: 'Utah' },
  { key: 'VT', value: 'Vermont' },
  { key: 'VA', value: 'Virginia' },
  { key: 'WA', value: 'Washington' },
  { key: 'WV', value: 'West Virginia' },
  { key: 'WI', value: 'Wisconsin' },
  { key: 'WY', value: 'Wyoming' }
];

const CONTACT_METHOD = [
  { key: 'cell', value: 'Cell Phone' },
  { key: 'home', value: 'Home Phone' },
  { key: 'work', value: 'Work Phone' }
];

const IDENTIFICATION_TYPE = [
  { key: 'driver_license', value: "Driver's License" },
  { key: 'matricula_consular', value: ' Matricula Consular ID' },
  { key: 'military_id', value: 'Military ID' },
  { key: 'passport', value: 'Passport' },
  { key: 'state_id', value: 'State ID' }
];

const PAYMENT_OPTION = [
  { key: 'ach', value: 'Bank Transfer (ACH)' },
  { key: 'credit_card', value: 'Credit Card' }
];

const ACH_ACCOUNT_TYPES = [
  { key: 'savings', value: 'Savings' },
  { key: 'checking', value: 'Checking' }
];

// --- Person Schemas --- //
const ADDRESS_SCHEMA = {
  line_one: '',
  line_two: '',
  zip: '',
  city: '',
  state: ''
};

const IDENTIFICATION_SCHEMA = {
  type: '',
  number: '',
  issuer: '',
  issue_date: null,
  expiration_date: null
};

// const PERSON_SCHEMA = {
//   id: uuid(),
//   first_name: '',
//   middle_name: '',
//   last_name: '',
//   social_security_number: '',
//   date_of_birth: null,
//   physical_address: Object.assign({}, ADDRESS_SCHEMA),
//   mailing_address: Object.assign({}, ADDRESS_SCHEMA),
//   preferred_contact_method: '',
//   email: '',
//   home: '',
//   cell: '',
//   work: '',
//   occupation: '',
//   identification: Object.assign({}, IDENTIFICATION_SCHEMA)
// };

const PERSON_SCHEMA = {
  id: uuid(),
  first_name: 'Merry',
  middle_name: 'N',
  last_name: 'Test',
  social_security_number: '000 - 00 - 0000',
  date_of_birth: moment('01/01/1998')
    .utc()
    .format(),
  physical_address: Object.assign({}, ADDRESS_SCHEMA, {
    line_one: '123 Test ST.',
    zip: '97404',
    city: 'Eugene',
    state: 'Oregon'
  }),
  mailing_address: Object.assign({}, ADDRESS_SCHEMA, {
    line_one: 'ABC Test ave',
    zip: '97404',
    city: 'Eugene',
    state: 'Oregon'
  }),
  preferred_contact_method: 'cell',
  email: 'mtest@nwcu.com',
  home: '541 - 123 - 1234',
  cell: '541 - 123 - 1234',
  work: '541 - 123 - 1234',
  occupation: 'tester',
  identification: Object.assign({}, IDENTIFICATION_SCHEMA, {
    type: 'driver_license',
    number: '000000000',
    issuer: 'Oregon',
    issue_date: moment('01/01/1998')
      .utc()
      .format(),
    expiration_date: moment('01/01/1998')
      .utc()
      .format()
  })
};

// --- Funding Schemas --- //
const CREDIT_CARD_SCHEMA = {
  number: '',
  name: '',
  security_code: '',
  expiration_month: '',
  expiration_year: ''
};

const ACH_SCHEMA = {
  name: '',
  routing_number: '',
  account_number: '',
  account_type: ''
};

// --- Beneficiaries Schemas --- //
const BENEFICIARY_SCHEMA = {
  name: '',
  date_of_birth: null,
  relationship: ''
};

// const BENEFICIARY_SCHEMA = {
//   name: 'Tester',
//   date_of_birth: '01/01/1990',
//   relationship: 'Tester'
// };

// --- Type Exports --- //
export {
  // Actions
  SET_ELIGIBILITY,
  SET_PERSONAL,
  SET_FUNDING,
  SET_CONFIRMATION,
  SET_BENEFICIARIES,
  SET_PRIMARY,
  SET_JOINTS,
  SET_NEW_MEMBERSHIP_INFORMATION,
  // API endpoints
  SUBMIT_APPLICATION,
  // Predefined Dictionaries
  COUNTIES,
  MAILING_STATES,
  CONTACT_METHOD,
  PAYMENT_OPTION,
  IDENTIFICATION_TYPE,
  // Persona Schema
  PERSON_SCHEMA,
  CREDIT_CARD_SCHEMA,
  ACH_SCHEMA,
  ACH_ACCOUNT_TYPES,
  // Beneficiary Schema
  BENEFICIARY_SCHEMA
};
