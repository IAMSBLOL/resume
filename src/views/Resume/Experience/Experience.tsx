
import { useEffect } from 'react';
import gsap from 'gsap'
import { TextPlugin } from 'gsap/TextPlugin'
import { useSelector } from 'react-redux'
import { RootState } from '@src/controller/reducer'
import './Experience.module.less'

gsap.registerPlugin(TextPlugin)

const Experience = (): JSX.Element => {
  const show = useSelector((state: RootState) => {
    return state.globalSlice.show
  })
  useEffect(() => {
    if (show) {
      const tl = gsap.timeline();
      tl.to('.skill_info0', { text: '1. 对React源码比较了解，同时对React的生态库也熟悉应用。vue则属于能应用水平。', duration: 1 });
      tl.to('.skill_info1', { text: '2. 熟悉webpack、rollup等构建工具，熟悉babel各种提案。', duration: 1 });
      tl.to('.skill_info2', { text: '3. 熟悉docker。', duration: 1 });
      tl.to('.skill_info3', { text: '4. 熟悉Three.js、GLSL。', duration: 1 });
      tl.to('.skill_info4', { text: '5. 熟悉前端工程化需要相关工具。', duration: 1 });
      tl.to('.skill_info5', { text: '6. 了解node、golang(无项目经验，脚本玩家)', duration: 1 });
      tl.to('.skill_info6', { text: '7. 具有一定设计与审美。可单兵作战亦可带团队协作。', duration: 1 });
    }
  }, [show])
  return (
    <div styleName='Experience'>
      <div className='Experience_bg'>

      </div>
      <div className='resume_info_wrap'>
        <h3 className='title'>Personal Info</h3>

        {
          Array.from({ length: 7 }).fill('').map(
            (o, i) => {
              return (
                <p key={i} className={`skill_info${i}`}></p>
              )
            }
          )
        }

      </div>
      <div className='end_text'>
        简历言不尽意，如果觉得我切图还行，请拿起电话，马上联系我。24小时全天候在线。
      </div>
    </div>
  )
}

export default Experience
