import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'

const useTopNavStore = defineStore('topNav', () => {
  const _state = reactive({
    isShowLogoModel: true,
    isShowNav: true,
  })

  const init = () => {
    _state.isShowNav = true
    _state.isShowLogoModel = true
  }

  /**
   * 设置logo模块状态 显隐
   * @param {boolean} state true false
   */
  const setLogoModelState = (state) => {
    _state.isShowLogoModel = state
  }

  /**
   * 设置Nav状态 显隐
   * @param {boolean} state true false
   */
  const setNavState = (state) => {
    _state.isShowLogoModel = state
  }

  return {
    _state,
    init,
    setLogoModelState,
    setNavState,
  }
})

export default useTopNavStore
