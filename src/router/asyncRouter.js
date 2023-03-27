import { listToTree } from '../utils/tools'
import shop from './modules/shop'
import order from './modules/order'

import pinia from '@/store/store'
import useRouterStore from '@/store/router'

const routerStore = useRouterStore(pinia)

// 动态路由名称映射表
const modules = {
  ...import.meta.glob('../view/shop/**/**.vue'),
  ...import.meta.glob('../view/order/**/**.vue'),
}
// console.log(modules);
const components = {
  Layout: () => import('../layout/LayoutIndex.vue'),
}

Object.keys(modules).forEach((key) => {
  const nameMatch = key.match(/^\.\.\/view\/(.+)\.vue/)
  if (!nameMatch) {
    return
  }
  // 排除components文件夹下的文件
  if (nameMatch[1].includes('components')) {
    return
  }
  // 如果页面以index命名，则使用父文件夹作为name
  const indexMatch = nameMatch[1].match(/(.*)\/Index$/i)
  let name = indexMatch ? indexMatch[1] : nameMatch[1]
  ;[name] = name.split('/').splice(-1)
  components[name] = modules[key]
})

/* eslint-disable no-unused-vars */
const accessControlList = (list) => {
  const roles = JSON.parse(window.localStorage.getItem('roles'))
  console.log(!roles)
  if (!roles) {
    return list
  }
  const isAdmin = roles.includes('ADMIN')
  console.log(isAdmin)
  for (let i = 0; i < list.length; i++) {
    // 鉴权并且不是管理员账户
    if (list[i].meta.roles && !isAdmin) {
      list.splice(i, 1)
      i--
    }
  }
  return list
}

const handleRoute = (routes, pData = null) => {
  return routes.map((v) => {
    if (!v.component) {
      v.component = components.Empty
    }
    if (typeof v.component === 'string') {
      v.component = components[v.component]
    }
    if (!v.meta.permission || (pData && v.meta.permission.length === 0)) {
      v.meta.permission = pData && pData.meta && pData.meta.permission ? pData.meta.permission : []
    }
    if (v.children && v.children.length > 0) {
      handleRoute(v.children, v)
    }
    return v
  })
}
const generatorDynamicRouter = () => {
  const routerList = new Map([
    ['shop', handleRoute(listToTree(shop, '0', '/shop'), null)],
    ['order', handleRoute(listToTree(order, '0', '/order'), null)],
  ])
  routerStore.setRoutes(routerList)
  return routerList
}

export { components, generatorDynamicRouter }
