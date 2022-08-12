import { useEffect } from 'react';
// import { gsap } from 'gsap'
import './Timeline.module.less'

const stepsList = [
  {
    title: '2022',
    description: '某公司-xxx'
  },
  {
    title: '2021',
    description: '某公司-xxx'
  },
  {
    title: '2020',
    description: '某公司-xxx'
  },
]
type Props={
  scrollPosition: (v: number)=>void
}
// const scrollTotal = 1000;
const Timeline = (props:Props): JSX.Element => {
  const { scrollPosition } = props
  useEffect(() => {
    // const ease = gsap.parseEase('power1');
    // console.log(ease)
    // gsap.registerPlugin(DrawSVGPlugin)
    // const tl = gsap.timeline();
    // tl.fromTo('.svg path', { drawSVG: 0 }, { duration: 8, drawSVG: '102%' }, '-=1')
  }, [])

  const handleClick = (index:number) => {
    const pos = (1 / 3) * index - 0.002;

    scrollPosition(pos)
  }
  return (
    <div styleName='Timeline'>
      {
        stepsList.map((o, i) => {
          return (
            <div key={i} className='Timeline_item' onClick={() => handleClick(i)}>
              <div className='line_step'>
                <div className='Timeline_point'>

                </div>
                {
                  (stepsList.length !== i + 1) && (
                    <div className='Timeline_line'></div>
                  )
                }
              </div>

              <div className='step_info'>
                <h3 className='info_title'>
                  {o.title}
                </h3>
                <p className='info_text'>
                  {o.description}
                </p>
              </div>

            </div>
          )
        })
      }
    </div>
  )
}

export default Timeline
