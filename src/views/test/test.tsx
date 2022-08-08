
import { Link } from 'react-router-dom'
import { APP_HOME } from '@router'
import { ReactComponent as TestSvg } from './svg/test.svg'
import './test.module.less'

const Test = (props:any):JSX.Element => {
  console.log(props)
  return (
    <div styleName='test'>
      <Link
        to={APP_HOME}
      >
        <span>Test</span>
      </Link>
      <div className='test1'>热更新似乎a不1是很好用啊</div>
      <TestSvg />
    </div>
  )
}

export default Test
