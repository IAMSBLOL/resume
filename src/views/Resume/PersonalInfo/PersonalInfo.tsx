
import { useEffect } from 'react';

import './PersonalInfo.module.less'

const PersonalInfo = (props: any): JSX.Element => {
  console.log(props)
  useEffect(() => {
    // gsap.registerPlugin(DrawSVGPlugin)
    // const tl = gsap.timeline();
    // tl.fromTo('.svg path', { drawSVG: 0 }, { duration: 8, drawSVG: '102%' }, '-=1')
  }, [])
  return (
    <div styleName='PersonalInfo'>
          仓耳渔阳体 W01
      <div className='nomal_text'>天地玄黄日月盈昃辰宿列张</div>
    </div>
  )
}

export default PersonalInfo