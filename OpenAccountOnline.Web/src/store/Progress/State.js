// --- Imports --- //
import * as types from './Types';

// --- State Definitation --- //
// const stage = types.ELIGIBILITY;

const stages = {
  [types.ELIGIBILITY]: {
    completed: false
  },
  [types.PERSONAL]: {
    completed: false
  },
  [types.PRODUCTS]: {
    completed: false
  },
  [types.FUNDING]: {
    completed: false
  },
  [types.CONFIRMATION]: {
    completed: false
  }
};
const active = '';
// --- State Export --- //
export { stages, active };
