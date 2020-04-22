// --- Imports --- //
import { combineReducers } from 'redux';
import update from 'immutability-helper';
import uuid from 'uuid/v4';
// --- Store Imports --- //
import * as types from './Types';
import * as defaultState from './State';

// --- Reducer Definitation --- //
const itemsReducer = (state = defaultState.items, action) => {
  switch (action.type) {
    case types.ADD_ITEM:
      return [
        ...state,
        {
          ...action.payload,
          cartId: uuid(),
          services: action.payload.services
            .filter(s => s.selected === true)
            .map(s => ({ ...s, cartId: uuid() }))
        }
      ];

    case types.REMOVE_PRODUCT_ITEM:
      return update(state, {
        $splice: [
          [state.findIndex(product => product.cartId === action.payload), 1]
        ]
      });

    case types.REMOVE_SERVICE_ITEM:
      return update(state, {
        [state.findIndex(
          product => product.cartId === action.payload.productId
        )]: {
          services: {
            $splice: [
              [
                state[
                  state.findIndex(
                    product => product.cartId === action.payload.productId
                  )
                ].services.findIndex(
                  service => service.cartId === action.payload.serviceId
                ),
                1
              ]
            ]
          }
        }
      });
    default:
      return state;
  }
};

// --- Combine Reducers --- //
const reducer = combineReducers({
  items: itemsReducer
});

// ---  Reducer Exports --- //
export default reducer;
