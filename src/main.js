import { createApp } from 'vue'
import './style.css'
import '//at.alicdn.com/t/c/font_3152666_w4v3bjfbwkk.js'
import '@/utils/iconfont'
import App from './App.vue'
import router from './router'
import API from './http/index.js'
import pinia from '@/store/store'
import * as Tool from '@/utils/tools.js'
import * as Rule from '@/utils/rule.js'
import to from '@/utils/awaitTo.js'

import 'element-plus/dist/index.css'
// 如果您正在使用CDN引入，请删除下面一行。
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import jsCookie from 'js-cookie'

// 导入Unocss
import 'uno.css'

const app = createApp(App)

app.config.globalProperties.API = API
app.config.globalProperties.Tool = Tool
app.config.globalProperties.Rule = Rule
app.config.globalProperties.To = to
app.config.globalProperties.Cookies = jsCookie
// 文件接口
app.config.globalProperties.$IMG_URL = '//i8.mifile.cn/v1/a1/'

app.use(router)
app.use(pinia)

// Element Icon
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.mount('#app')
