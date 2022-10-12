
const fns = {
  saveUserInfo: (state, action) => {
    const { data } = action.payload
    state.userInfo = data
  },

  setHomePageInfo: (state, action) => {
    const { data } = action.payload
    state.homePageInfo = data
  },
  setTextShow: (state, action) => {
    const { show } = action.payload
    state.show = show
  }
}
export default fns
