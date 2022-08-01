import React from 'react'
import { Result, Button } from 'antd';
import './ErrorBoundaries.module.less'

type Props = {
  children: React.ReactNode
}
class ErrorBoundary extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): any {
    // 更新 state 使下一次渲染能够显示降级后的 UI
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any): void {
    // 你同样可以将错误日志上报给服务器
    // 告诉服务出事了
    console.error(error, errorInfo);
  }

  render(): any {
    if ((this.state as any).hasError) {
      // 你可以自定义降级后的 UI 并渲染
      return (
        <div className='errorTips' styleName='errorTips'>
          <Result
            title='页面出了点小问题，请点击按钮刷新尝试。'
            extra={
              <Button type='primary' onClick={() => window.location.reload()}>
                刷新
              </Button>
            }

          />
        </div>
      )
    }

    return this.props.children;
  }
}

export default ErrorBoundary
