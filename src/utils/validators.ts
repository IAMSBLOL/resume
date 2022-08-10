// 效验手机号
export const validateServicePhone = (rule: any, value: string) => {
  if (!value) {
    return Promise.reject(new Error('手机号不能为空！'))
  } else {
    const reg = /^1[3-9]\d{9}$/
    if (reg.test(value)) {
      return Promise.resolve();
    } else {
      return Promise.reject(new Error('请输入正确的手机号！'))
    }
  }
}

// 效验邮箱
export const validateServiceEmail = (rule: any, value: string) => {
  if (!value) {
    return Promise.reject(new Error('邮箱不能为空'))
  } else {
    const reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
    if (reg.test(value)) {
      return Promise.resolve();
    } else {
      return Promise.reject(new Error('请输入正确的邮箱'))
    }
  }
}

// 效验用户名
export const validateServiceName = (rule: any, value: string) => {
  if (!value) {
    return Promise.reject(new Error('请输入用户名'))
  } else {
    const reg = /^[a-zA-Z0-9_]{5,12}$/
    if (reg.test(value)) {
      return Promise.resolve();
    } else {
      return Promise.reject(new Error('用户名必须是5-12位字母或数字！'))
    }
  }
};

// 效验密码
export const validateServicePwd = (rule: any, value: string) => {
  if (!value) {
    return Promise.reject(new Error('请输入验证码'))
  } else {
    if (value.length >= 8 && value.length <= 20) {
      return Promise.resolve();
    } else {
      return Promise.reject(new Error('请输入8-20位密码'))
    }
  }
};
