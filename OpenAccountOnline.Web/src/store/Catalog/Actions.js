// --- Imports --- //
import * as types from './Types';

// --- Action Definition --- //

function setStatus(status) {
  return {
    type: types.SET_STATUS,
    payload: status
  };
}
function setProducts(products) {
  return {
    type: types.SET_PRODUCTS,
    payload: products
  };
}

function setServices(services) {
  return {
    type: types.SET_SERVICES,
    payload: services
  };
}

function setDocuments(documents) {
  return {
    type: types.SET_DOCUMENTS,
    payload: documents
  };
}

// --- Action Exports --- //
export { setProducts, setServices, setDocuments, setStatus };
