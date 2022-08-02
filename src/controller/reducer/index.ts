import { combineReducers } from '@reduxjs/toolkit'
import globalSlice from './globalSlice'

const rootReducer = combineReducers({
  globalSlice,

  // test
});
export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
