import { useEffect } from 'react';
import WorkingTimeline from './WorkingTimeline'
import PersonalInfo from './PersonalInfo'

import './Resume.module.less'

const Resume = (): JSX.Element => {
  useEffect(() => {
    // gsap.registerPlugin(DrawSVGPlugin)
    // const tl = gsap.timeline();
    // tl.fromTo('.svg path', { drawSVG: 0 }, { duration: 8, drawSVG: '102%' }, '-=1')
  }, [])
  return (
    <div styleName='Resume'>
      <PersonalInfo />

      <WorkingTimeline />

    </div>
  )
}

export default Resume
