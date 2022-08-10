
// import { Redirect } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import './app.module.less'
// import { useDispatch } from 'react-redux'

// import api from '../api'
// 可以在这里做登录拦截或者其他

const App = () => {
  return (
    <div styleName='app'>

      <Outlet />
    </div>
  )
}
export default App
