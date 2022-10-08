
import { useEffect } from 'react';
import { ReactComponent as Scroll } from './icon/scroll.svg'
import gsap from 'gsap'
import { TextPlugin } from 'gsap/TextPlugin'
import Skill from './Skill'
import './PersonalInfo.module.less'

const PersonalInfo = (): JSX.Element => {
  useEffect(() => {
    gsap.registerPlugin(TextPlugin)
    const tl = gsap.timeline();
    tl.to('.logo_wrap', { text: 'what the fuck', duration: 1 });

    gsap.fromTo('.guide_svg path', { y: -200 }, { duration: 2, y: 0, fill: '#fff', repeat: Infinity })
  }, [])
  return (
    <div styleName='PersonalInfo'>

      <div className='header_wrap'>
        <div className='logo_wrap'>

        </div>
        <div className='my_social_contact'>

        </div>
      </div>
      <div className='content_wrap'>
        <div className='personal_info_wrap'>
          123
        </div>
        <div className='three_skill_wrap'>
          <Skill />
        </div>
      </div>
      <div className='footer_wrap'>
        <Scroll className='guide_svg' />
      </div>
    </div>
  )
}

export default PersonalInfo
