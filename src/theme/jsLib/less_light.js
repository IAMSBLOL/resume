
// 暗色调的对象
// 要符合less的标准、变量都是驼峰
const gddi_design = {
  // GDDI设计参数
  // 背景色
  'bg-color': '#ffffff',
  'secondary-bg-color': '#EDF8FF',
  // 第1颜色
  'primary-color': '#061926',
  // 第二颜色
  'secondary-color': '#A2F6C5',

  // 标题
  'primary-title-color': '#141414',
  'secondary-title-color': '#141414',
  'small-title-color': '#262626',

  // 正文
  'primary-text-color': '#fff',
  'auxiliary-text-color': '#8C8C8C',
  'unactive-text-color': '#BFBFBF',

  // 链接颜色
  'link-color': '#2C60F5',

  // 状态颜色
  'success-color': '#52C41A',
  'warning-color': '#FAAD14',
  'error-color': '#FF4D4F',
}

const ant_design = {
  // antd的设计参数
  primaryColor: '#48A2DF',
}

const all_design = {
  gddi_design, ant_design
};

module.exports = all_design
