
import { useEffect } from 'react';

import './ApproachMask.module.less'

const ApproachMask = (props: any): JSX.Element => {
  console.log(props)
  useEffect(() => {
    // gsap.registerPlugin(DrawSVGPlugin)
    // const tl = gsap.timeline();
    // tl.fromTo('.svg path', { drawSVG: 0 }, { duration: 8, drawSVG: '102%' }, '-=1')
  }, [])
  return (
    <div styleName='ApproachMask'>
          ApproachMask
    </div>
  )
}

export default ApproachMask
