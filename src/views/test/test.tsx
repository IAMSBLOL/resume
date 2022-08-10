
import { Link } from 'react-router-dom'
import { APP_HOME } from '@router'
import { ReactComponent as TestSvg } from './svg/test.svg'

import './test.module.less'
import { useEffect } from 'react';

const Test = (props:any):JSX.Element => {
  console.log(props)
  useEffect(() => {
    // gsap.registerPlugin(DrawSVGPlugin)
    // const tl = gsap.timeline();
    // tl.fromTo('.svg path', { drawSVG: 0 }, { duration: 8, drawSVG: '102%' }, '-=1')
  }, [])
  return (
    <div styleName='test'>
      <Link
        to={APP_HOME}
      >
        <span>Test</span>
      </Link>
      <div className='test1'>热更新似乎a1不1是很好用啊</div>
      <TestSvg />
    </div>
  )
}

export default Test
