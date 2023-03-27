// const baseUrl = '/brain/governance';
const base = '/'

export default {
  // 登陆接口
  login: { type: 'post', base, url: '/login/password' },

  // 退出登陆接口
  loginout: { type: 'post', base, url: '/login/password' },

  // 验证码登录
  sms: { type: 'post', base, url: '/login/login_sms' },

  // 获取登录验证码
  loginSms: { type: 'get', base, url: '/login/sms' },

  // 注册接口
  register: { type: 'post', base, url: '/register/register_sms' },

  // 获取注册验证码
  registerSms: { type: 'get', base, url: '/register/sms' },
}
