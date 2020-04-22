// --- Imports --- //
import * as types from './Types';

// --- Action Definitation --- //
function setActive(stage) {
  return {
    type: types.SET_ACTIVE,
    payload: stage
  };
}

function setCompleted(stage, completed) {
  return {
    type: types.SET_COMPLETED,
    payload: {
      stage: stage,
      completed: completed
    }
  };
}
// --- Action Exports --- //
export { setActive, setCompleted };
