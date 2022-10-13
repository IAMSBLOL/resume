import { useEffect, useMemo, useRef, useState } from 'react';
import WorkingTimeline from './WorkingTimeline'
import PersonalInfo from './PersonalInfo'
import Experience from './Experience'
// import Timeline from './Catalogue'
// import ApproachMask from './ApproachMask'
import './Resume.module.less'

const Resume = (): JSX.Element => {
  const [height, setHeight] = useState(0)

  const divRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (divRef.current) {
      const height = Number(divRef.current.offsetHeight)
      setHeight(height)

      window.addEventListener('resize', () => {
        // update sizes
        console.log(divRef.current?.offsetHeight, 21)
        const height = Number(divRef.current?.offsetHeight)
        setHeight(height)
      });
    }
  }, [])
  return (
    <div styleName='Resume'>
      <WorkingTimeline height={height} />
      {
        useMemo(() => {
          return (
            <>

              <div className='Resume_content' ref={divRef}>

                <PersonalInfo />
                <Experience />
              </div>
            </>
          )
        }, [])
      }

    </div>
  )
}

export default Resume
