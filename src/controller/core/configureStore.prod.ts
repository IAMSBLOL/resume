// import {
//   createStore,
//   applyMiddleware,

// } from 'redux';
import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';
import rootReducer from '../reducer'
import rootSaga from '../sagas'

const sagaMiddleware = createSagaMiddleware()
const middleware = [thunk, sagaMiddleware];

const store = configureStore({
  reducer: rootReducer,
  middleware
})

sagaMiddleware.run(rootSaga)
export default store
