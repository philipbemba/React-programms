// --- Imports --- //
import axios from 'axios';

// --- Redux Import --- //
import * as actions from './Actions';
import * as types from './Types';

const URL = 'https://localhost:5001';

function loadCatalog() {
  return dispatch => {
    dispatch(actions.setStatus(types.FETCHING));
    return axios
      .get(`${URL}/catalog`)
      .then(response => {
        if (response.status === 200) {
          dispatch(
            actions.setProducts(
              response.data.filter(item => item.doc_type === 'Product')
            )
          );

          dispatch(
            actions.setServices(
              response.data.filter(item => item.doc_type === 'Service')
            )
          );

          dispatch(
            actions.setDocuments(
              response.data.filter(item => item.doc_type === 'Document')
            )
          );

          dispatch(actions.setStatus(types.SUCCESS));
        } else {
          dispatch(actions.setStatus(types.ERROR));
        }
      })
      .catch(response => dispatch(actions.setStatus(types.ERROR)));
  };
}

export { loadCatalog };
