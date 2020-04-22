// --- Imports --- //
import * as actions from './Actions';

// --- Operations Definitation --- //
function setCompletes(stages) {
  return dispatch => {
    stages.forEach(stage => {
      if (!stage.completed) {
        dispatch(actions.setCompleted(stage, true));
      }
    });
  };
}

// --- Operations Exports --- //
export { setCompletes };
