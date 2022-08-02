// import {
//   createStore,
//   applyMiddleware,
//   compose
// } from 'redux';
import { configureStore } from '@reduxjs/toolkit'
// import { createLogger } from 'redux-logger';
// import { Iterable } from 'immutable';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

import logger from 'redux-logger'
import rootReducer from '../reducer'

import rootSaga from '../sagas'

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware()

const middleware = [thunk, sagaMiddleware, logger];

// const store = createStore(
//   rootReducer,
//   composeEnhancers(applyMiddleware(...middleware))

// );

const store = configureStore({
  reducer: rootReducer,
  middleware
})

sagaMiddleware.run(rootSaga)

export default store
