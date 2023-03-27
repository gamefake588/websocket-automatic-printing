import { createRouter, createWebHashHistory } from 'vue-router'
// import Home from "view/home/index.vue";
import { configure, start, done } from 'nprogress'
// import store from '../store/index'
import Layout from '../layout/LayoutIndex.vue'
import LayoutOrder from '../layout/LayoutOrder.vue'
import Login from '@/view/login/Login.vue'
import Register from '@/view/login/Register.vue'

import { generatorDynamicRouter } from './asyncRouter'

import pinia from '@/store/store'
import useRouterStore from '@/store/router'
import { storeToRefs } from 'pinia'

const routerStore = useRouterStore(pinia)
const store = storeToRefs(routerStore)

configure({ showSpinner: false })

/**
 * 定义路由数组
 */
const routes = [
  {
    path: '/',
    redirect: '/shop',
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      title: '登录',
    },
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    meta: {
      title: '注册',
    },
  },
  {
    path: '/shop',
    name: 'shop',
    component: Layout,
    meta: {
      title: '爱餐商城',
    },
  },
  {
    path: '/order',
    name: 'order',
    component: LayoutOrder,
    meta: {
      title: '爱餐商城-订单',
    },
  },
]
/**
 * 创建路由
 */
const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

// 添加所有动态路由
const addRoutes = () => {
  for (let [key, value] of store.router.value) {
    for (let i = 0; i < value.length; i++) {
      router.addRoute(key, value[i])
    }
  }
}

/**
 * 路由守卫
 */
router.beforeEach(async (to) => {
  start()
  if (!['/login', '/loginApp'].includes(to.path)) {
    const role = true
    // console.log(role);

    if (!role) {
      router.push('/login')
    }
  }
  // 判断是否还没添加过路由
  // console.log(store.router.value)
  if (store.router.value.length <= 0) {
    generatorDynamicRouter()
    addRoutes()
    return to.fullPath
  }
})

router.afterEach(() => {
  done()
})
/**
 * 路由错误回调
 */
// router.onError((handler: ErrorHandler) => {
//     console.log("error:", handler);
// });

export default router
