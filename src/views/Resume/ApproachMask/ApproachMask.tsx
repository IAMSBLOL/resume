
import { useEffect } from 'react';
import { ReactComponent as Test } from '@src/asset/images/test.svg'
import gsap from 'gsap'
import './ApproachMask.module.less'

const ApproachMask = (props: any): JSX.Element => {
  console.log(props)
  useEffect(() => {
    const tl = gsap.timeline();
    tl
      .fromTo('.svg path', { stroke: 'orange', strokeDasharray: 100, strokeDashoffset: 2000, fill: 'transparent' }, { stroke: '#fff', duration: 2, strokeDasharray: 100, strokeDashoffset: 0 })
      .to('.svg', { scale: 0, duration: 0.8 })
  }, [])
  return (
    <div styleName='ApproachMask'>
      <Test className='svg'/>
    </div>
  )
}

export default ApproachMask
