// --- Imports --- //
import * as types from './Types';

// --- Action Definition --- //
function setEligibilityFields(fields) {
  return {
    type: types.SET_ELIGIBILITY,
    payload: fields
  };
}

function setConfirmationFields(fields) {
  return {
    type: types.SET_CONFIRMATION,
    payload: fields
  };
}

function setNewMembershipInformation(fields) {
  return {
    type: types.SET_NEW_MEMBERSHIP_INFORMATION,
    payload: fields
  };
}

function setFundingFields(fields) {
  return {
    type: types.SET_FUNDING,
    payload: fields
  };
}

function setPrimary(data) {
  return {
    type: types.SET_PRIMARY,
    payload: data
  };
}

function setJoints(data) {
  return {
    type: types.SET_JOINTS,
    payload: data
  };
}

function setBeneficiaries(data) {
  return {
    type: types.SET_BENEFICIARIES,
    payload: data
  };
}

function setFunding(data) {
  return {
    type: types.SET_FUNDING,
    payload: data
  };
}

// --- Action Exports --- //
export {
  setPrimary,
  setJoints,
  setBeneficiaries,
  setFunding,
  setConfirmationFields,
  setEligibilityFields,
  setNewMembershipInformation,
  setFundingFields
};
