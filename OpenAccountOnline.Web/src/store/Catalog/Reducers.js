// --- Imports --- //
import { combineReducers } from 'redux';
import * as defaultState from './State';
import * as types from './Types';

// --- Reducer Definition --- //
function reducer(state = defaultState, action) {
  switch (action.type) {
    case types.SET_STATUS:
      return Object.assign({}, state, {
        status: action.payload
      });
    case types.SET_PRODUCTS:
      return Object.assign({}, state, {
        products: action.payload
      });

    case types.SET_SERVICES:
      return Object.assign({}, state, {
        services: action.payload
      });
    case types.SET_DOCUMENTS:
      return Object.assign({}, state, {
        documents: action.payload
      });
    default:
      return state;
  }
}

// --- Combine Reducers --- //

// ---  Reducer Exports --- //
export default reducer;
