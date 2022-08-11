import { useEffect } from 'react';

import './Timeline.module.less'

const stepsList = [
  {
    label: '2020',
  },
  {
    label: '2021',
  },
  {
    label: '2022',
  },
  {
    label: '2023',
  },
]

const Timeline = (): JSX.Element => {
  useEffect(() => {
    // gsap.registerPlugin(DrawSVGPlugin)
    // const tl = gsap.timeline();
    // tl.fromTo('.svg path', { drawSVG: 0 }, { duration: 8, drawSVG: '102%' }, '-=1')
  }, [])
  return (
    <div styleName='Timeline'>
      {
        stepsList.map((o, i) => {
          return (
            <div key={i}>
                123
            </div>
          )
        })
      }
    </div>
  )
}

export default Timeline
