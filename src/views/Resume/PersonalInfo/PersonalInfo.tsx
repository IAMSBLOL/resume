
import { useEffect } from 'react';
import { ReactComponent as Scroll } from './icon/scroll.svg'
import gsap from 'gsap'
import { TextPlugin } from 'gsap/TextPlugin'
import Skill from './Skill'
import { GithubOutlined, ZhihuOutlined, PhoneOutlined, MediumOutlined } from '@ant-design/icons'
import { ReactComponent as TranfomerSvg } from './icon/tranfomer.svg'
import './PersonalInfo.module.less'

const PersonalInfo = (): JSX.Element => {
  useEffect(() => {
    gsap.registerPlugin(TextPlugin)
    const tl = gsap.timeline();
    tl.to('.logo_title', { text: 'The Martrix', duration: 1 });

    tl.to('.TranfomerSvg path', { fill: 'red', duration: 2 });

    gsap.fromTo('.guide_svg path', { y: -200 }, { duration: 3, y: 0, fill: '#fff', repeat: Infinity })
  }, [])
  return (
    <div styleName='PersonalInfo'>

      <div className='header_wrap'>
        <div className='logo_wrap'>
          <TranfomerSvg className='TranfomerSvg'/>
          <p className='logo_title'></p>
        </div>
        <div className='my_social_contact'>
          <a href='https://github.com/IAMSBLOL/resume' target='_blank' rel="noreferrer"><GithubOutlined /></a>
          <a href='https://www.zhihu.com/people/zhong-guo-meng-77/posts' target='_blank' rel="noreferrer"><ZhihuOutlined /></a>

        </div>
      </div>
      <div className='content_wrap'>
        <div className='personal_info_wrap'>
          <div className='city_bg_wrap'>
            <h3 className='ch_city'>深圳</h3>
            <h2 className='en_city'>SEHN ZHEN</h2>
          </div>

          <div className='descriptions'>
            <h1 className='title'>Online Resume</h1>

            <p className='text'>
              本人从事切图5年有余,在切图方面颇有心得...
            </p>
            <p className='text'>
              算了,摊牌了.
            </p>
            <div>
              <span className='tag nineninesix'>1222</span><span className='tag no_money'>123123</span>
            </div>

            <div className='contact_wrap'>
              <div className='contact_item'>
                <MediumOutlined /> 称呼: Matrix
              </div>
              <div className='contact_item'>
                <PhoneOutlined /> 联系方式: 15219267088
              </div>

            </div>
          </div>
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
