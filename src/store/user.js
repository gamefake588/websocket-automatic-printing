import { defineStore } from 'pinia'
import Cookies from 'js-cookie'

const useUserStore = defineStore('user', {
  state: () => ({
    token: Cookies.get('AC_USER_TOKEN') || '',
    info: {},
  }),
  getters: {},
  actions: {
    /**
     * 处理用户注册成功后状态
     */
    handlerUserState(token) {
      this.token = token
      Cookies.set('AC_USER_TOKEN', token, { expires: 7 })
    },

    /**
     * 处理用户信息
     */
    handlerUserData(data) {
      this.info = data
    },

    /**
     * 退出登录
     */
    handlerLoginout() {
      this.token = ''
      Cookies.remove('AC_USER_TOKEN')
      this.info = {}
    },
  },
})

export default useUserStore
