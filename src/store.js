import {createStore, compose, applyMiddleware} from 'redux';
import {reducers} from './redux/redux.js';
import logger from './redux/logger.js';
import thunk from 'redux-thunk'

const initialState = localStorage.getItem('items') || {};

const middleware = [thunk];
if (process.env.NODE_ENV !== 'production') middleware.push(logger);

const composedEnhancers = compose(
  applyMiddleware(...middleware)
);

export const store = createStore(reducers, initialState, composedEnhancers);
