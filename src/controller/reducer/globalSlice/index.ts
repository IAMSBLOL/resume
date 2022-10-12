// 用新的东西，渐渐淘汰老旧的

import { createSlice, createAction } from '@reduxjs/toolkit'
// createAction
import fn from './fn'

const initialState = {
  userInfo: { test: '666' },
  homePageInfo: {},
  show: false
}

const ApplicationDetailSlice = createSlice({
  name: 'globalSlice',
  initialState,
  reducers: fn,
})
const { actions } = ApplicationDetailSlice
const {
  saveUserInfo, setHomePageInfo, setTextShow
} = actions

// 告诉saga开始处理请求
const getUserInfo = createAction<any>('globalSlice/getUserInfo')

export {
  getUserInfo,
  saveUserInfo,
  setHomePageInfo,
  setTextShow
}

export default ApplicationDetailSlice.reducer
