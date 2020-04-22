// --- Imports --- //
import axios from 'axios';

// --- Redux Imports --- //
import * as actions from './Actions';
import * as types from './Types';

function setApplication(data) {
  return dispatch => {
    // Setting Eligibility
    if (data.county !== undefined && data.meets_age_requirements) {
      dispatch(actions.setJoints(data));
    }

    // Setting Primary
    if (data.primary !== undefined) {
      dispatch(actions.setPrimary(data.primary));
    }

    // Setting Joints
    if (data.joints !== undefined) {
      dispatch(actions.setJoints(data.joints));
    }

    // Setting Beneficiaries
    if (data.beneficiaries !== undefined) {
      dispatch(actions.setBeneficiaries(data.beneficiaries));
    }

    // Setting Funding
    if (data.funding !== undefined) {
      dispatch(actions.setFunding(data.funding));
    }
  };
}

function submitApplication() {
  return (dispatch, getState) => {
    const { application } = getState();
    return new Promise((resolve, reject) => {
      axios
        .post(
          `${process.env.REACT_APP_API_URL}${types.SUBMIT_APPLICATION}`,
          application
        )
        .then(response => {
          console.log(response);
          if (response.status == 200) {
            // TODO: Resolve data from response
            resolve();
          }
          // TODO: Reject with error
          reject();
        })
        .catch(response => {
          console.loge('ERROR', response);
          //TODO: Reject with error message
          reject();
        });
    });
  };
}

export { setApplication, submitApplication };
