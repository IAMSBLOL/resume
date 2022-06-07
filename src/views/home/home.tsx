import { useEffect } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { APP_TEST, APP_HOME_ONE, APP_HOME_TWO } from '../../router'
import { useDispatch, useSelector } from 'react-redux'
import { getUserInfo } from '@src/controller/reducer/globalSlice'
// import api from '@api'
import { Button } from 'antd'

import * as main from './hello.wasm'

import './home.module.less'

const Home = (props: any): JSX.Element => {
  console.log(props)
  const disPatch = useDispatch()
  const test = useSelector((state: any) => {
    return state.globalSlice.userInfo.test
  })

  useEffect(() => {
    const fibjs = (num:number) :number => {
      if (num <= 0) {
        return 0
      }
      if (num === 1) {
        return 1
      }
      return fibjs(num - 1) + fibjs(num - 2)
    }
    const time1 = performance.now()

    const cppv = main.fib(30)
    const time2 = performance.now()
    const jsv = fibjs(30)
    const time3 = performance.now()
    console.log(time2 - time1, time3 - time2)
    console.log(cppv, jsv)
    setTimeout(() => {
      disPatch(getUserInfo({ test: '77ssssss7' }))
    }, 2000)
    // api.get('/v1/users/info')
  }, [disPatch])

  return (
    <div styleName='home'>
      <Link
        to={APP_TEST}
      >
        <span>Home</span>
      </Link>
      <Link
        to={APP_HOME_ONE}
      >
        <span>APP_HOME_ONE</span>
      </Link>
      <Link
        to={APP_HOME_TWO}
      >
        <span>APP_HOME_TWO</span>
      </Link>
      <div className='test1'>热更新似乎a不是s111很好用asd啊{test}</div>
      <Button type='primary'>123</Button>
      <Outlet />
    </div>
  )
}

export default Home
