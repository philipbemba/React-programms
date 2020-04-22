// --- Imports --- //
import { combineReducers } from 'redux';
import * as types from './Types';
import * as defaultState from './State';

// --- Reducer Definitation --- //

/**
 * Application progress state reducer
 * @param {Object} state object defining the state redux state
 * @param {string} action defines action taken againts state
 */
const stageReducer = (state = defaultState.stages, action) => {
  switch (action.type) {
    case types.SET_COMPLETED:
      return Object.assign({}, state, {
        [action.payload.stage]: {
          completed: action.payload.completed
        }
      });
    default:
      return state;
  }
};

const activeReducer = (state = defaultState.active, action) => {
  switch (action.type) {
    case types.SET_ACTIVE:
      return action.payload;
    default:
      return state;
  }
};

// --- Combine Reducers --- //
const reducer = combineReducers({
  stages: stageReducer,
  active: activeReducer
});

// ---  Reducer Exports --- //
export default reducer;
