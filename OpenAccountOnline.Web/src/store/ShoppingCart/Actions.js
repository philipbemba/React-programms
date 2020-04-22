// --- imports --- //
import * as types from "./Types";

// --- action definitation --- //
function removeServiceItem(productId, serviceId) {
  return {
    type: types.REMOVE_SERVICE_ITEM,
    payload: {
      productId,
      serviceId
    }
  };
}

function removeProductItem(id) {
  return {
    type: types.REMOVE_PRODUCT_ITEM,
    payload: id
  };
}

function addItem(item) {
  return {
    type: types.ADD_ITEM,
    payload: item
  };
}



// --- action exports --- //
export {
  removeServiceItem,
  removeProductItem,
  addItem
};
