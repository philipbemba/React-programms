// -- Imports --- //
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

// --- State Imports --- //
import { default as catalog } from './Catalog';
import { default as progress } from './Progress';
import { default as shoppingCart } from './ShoppingCart';
import { default as application } from './Application';

// --- State Setup --- //
const loggerMiddleware = createLogger();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// --- Configuration Store
const store = createStore(
  combineReducers({ catalog, progress, shoppingCart, application }),
  composeEnhancers(applyMiddleware(thunkMiddleware, loggerMiddleware))
);

// --- Export Store --- //
export default store;
