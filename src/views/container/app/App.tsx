
// import { Redirect } from 'react-router-dom';
import { useLayoutEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { APP_NO_PERMISSION } from '@router'
import './app.module.less'
// import { useDispatch } from 'react-redux'

// import api from '../api'
// 可以在这里做登录拦截或者其他

const App = () => {
  const navigate = useNavigate()
  useLayoutEffect(() => {
    const mobileTest = () => {
      try {
        document.createEvent('TouchEvent')
        return true
      } catch (e) {
        return false
      }
    }
    if (mobileTest()) {
      console.log('????')
      navigate({
        pathname: APP_NO_PERMISSION
      })
    }
  }, [navigate])

  return (
    <div styleName='app'>

      <Outlet />
    </div>
  )
}
export default App
