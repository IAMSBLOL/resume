
// 参考antd的方案，修改css变量完成主题色改变。
// 不过需要兼容UI库，也不知道小姐姐调的什么颜色规则，不好迭代颜色。
// 所以在改变ANTD主色的时候、把自己需要的颜色变量也加进来吧。
// 不过无法避免首次加载就要run这个代码，影响不大。
// 不过UI设计和ANTD不一致，所以很多东西还是要手改的，比如一些副颜色，要和以前一样修改ANtd组件的，
// 不过大多样式设计统一，可以全局改变。
// 改变主题基本就是颜色才这么做，其他圆角啥的可以忽略

import { ConfigProvider, message } from 'antd'
import { updateCSS } from 'rc-util/lib/Dom/dynamicCSS';
import canUseDom from 'rc-util/lib/Dom/canUseDom';
import { isNil } from 'lodash'

const less_light = require('@src/theme/jsLib/less_light')

const globalPrefixCls = 'resume'

const dynamicStyleMark = globalPrefixCls + '-' + Math.random().toString(36).slice(2);

type Record<K extends keyof any, T> = {
    [P in K]: T;
};

type Theme = {
    ant_design: Record<string, string>,
    gddi_design: Record<string, string>,
}

export const cusTheme = (theme?: Theme) => {
  try {
    const _theme = isNil(theme) ? less_light : theme;

    ConfigProvider.config({
      theme: _theme.ant_design,
    });

    const gddi_design = _theme.gddi_design

    // Convert to css variables

    const cssList = []
    for (const [key, value] of Object.entries(gddi_design)) {
      const cssText = `--${globalPrefixCls}-${key}: ${value};`
      cssList.push(cssText)
    }

    const style = `
  :root {
    ${cssList.join('\n')}
  }
  `.trim();

    if (canUseDom()) {
      updateCSS(style, `${dynamicStyleMark}-dynamic-theme`);
    } else {
      message.warning('SSR do not support dynamic theme with css variables.');
    }
  } catch (e) {
    console.error(e)
  }
}
