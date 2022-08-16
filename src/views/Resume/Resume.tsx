import { useEffect, useMemo, useRef, useState } from 'react';
import WorkingTimeline from './WorkingTimeline'
import PersonalInfo from './PersonalInfo'
import Experience from './Experience'
import Timeline from './Catalogue'
import './Resume.module.less'

const Resume = (): JSX.Element => {
  const [height, setHeight] = useState(0)
  const [jumpPos, jumpToPosition] = useState(0)
  const divRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (divRef.current) {
      const height = Number(divRef.current.offsetHeight)
      setHeight(height * 2 / 3)
    }
  }, [])
  return (
    <div styleName='Resume'>
      <WorkingTimeline height={height} jumpPos={jumpPos}/>
      {
        useMemo(() => {
          return (
            <>
              <Timeline scrollPosition={jumpToPosition} />
              <div className='Resume_content' ref={divRef}>
                <PersonalInfo />
                <Experience />
                <PersonalInfo />
              </div>
            </>
          )
        }, [])
      }

    </div>
  )
}

export default Resume
