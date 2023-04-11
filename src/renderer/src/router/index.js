import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import('../views/index.vue'),
    meta: {
      title: '首页'
    }
  },
  {
    path: '/print',
    name: 'print',
    component: () => import('../views/print.vue'),
    meta: {
      title: ''
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
