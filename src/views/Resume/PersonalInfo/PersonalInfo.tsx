
import { useEffect } from 'react';
import { ReactComponent as Scroll } from './icon/scroll.svg'
import gsap from 'gsap'
import { TextPlugin } from 'gsap/TextPlugin'
import Skill from './Skill'
import { GithubOutlined, ZhihuOutlined } from '@ant-design/icons'
import { ReactComponent as TranfomerSvg } from './icon/tranfomer.svg'
import './PersonalInfo.module.less'

const PersonalInfo = (): JSX.Element => {
  useEffect(() => {
    gsap.registerPlugin(TextPlugin)
    const tl = gsap.timeline();
    tl.to('.logo_wrap', { text: 'The Martrix', duration: 1 });

    gsap.fromTo('.guide_svg path', { y: -200 }, { duration: 3, y: 0, fill: '#fff', repeat: Infinity })
  }, [])
  return (
    <div styleName='PersonalInfo'>

      <div className='header_wrap'>
        <div className='logo_wrap'>
          <TranfomerSvg />
        </div>
        <div className='my_social_contact'>
          <a href='https://github.com/IAMSBLOL/resume' target='_blank' rel="noreferrer"><GithubOutlined /></a>
          <a href='https://www.zhihu.com/people/zhong-guo-meng-77/posts' target='_blank' rel="noreferrer"><ZhihuOutlined /></a>

        </div>
      </div>
      <div className='content_wrap'>
        <div className='personal_info_wrap'>
          <h3 className='ch_city'>深圳</h3>
          <h2 className='en_city'>SEHN ZHEN</h2>
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
