// --- Imports --- //
import { combineReducers } from 'redux';

// --- Store Imports --- //
import * as types from './Types';
import * as defaultState from './State';

// --- Reducer Definition --- //
const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case types.SET_ELIGIBILITY:
      return Object.assign({}, state, {
        county: action.payload.county,
        meets_age_requirements: action.payload.meets_age_requirements
      });
    case types.SET_PRIMARY:
      return Object.assign({}, state, { primary: action.payload });
    case types.SET_JOINTS:
      return Object.assign({}, state, { joints: action.payload });
    case types.SET_BENEFICIARIES:
      return Object.assign({}, state, { beneficiaries: action.payload });
    case types.SET_FUNDING:
      return Object.assign({}, state, { funding: action.payload });
    default:
      return state;
  }
};

// ---  Reducer Exports --- //
export default reducer;
