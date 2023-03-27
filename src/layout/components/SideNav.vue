<template>
  <div class="py-4" v-for="n in nav.list" :key="n.key">
    <p class="text-xl">{{ n.label }}</p>

    <section class="py-4">
      <router-link
        v-for="c in n.childer"
        :key="c.path"
        :class="{ 'text-orange-4': handlerComparisonPath(c.path) }"
        class="text-gray-4 block py-1"
        :to="c.path"
        >{{ c.meta.title }}</router-link
      >
    </section>
  </div>
</template>

<script setup>
import useRouterStore from '@/store/router'
import { reactive, toRefs } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const routerStore = useRouterStore()
const { router } = toRefs(routerStore)

// 侧边栏根据 key数组中的路由进行生成
const key = ['order']

const nav = reactive({
  list: [],
})

const getSideNavData = () => {
  const label = {
    order: '订单中心',
  }

  let params = []

  key.forEach((_) => {
    let nav = router.value.get(_)
    if (nav) {
      params.push({ key: _, label: label[_], childer: nav.filter((n) => !n.meta.isHideSideNav) })
    } else {
      console.error('路由不存在，侧边导航栏生成失败')
    }
  })

  return params
}

nav.list = getSideNavData()

// 处理路径对比
const handlerComparisonPath = (path) => {
  return path.split('/').join('') === route.path.split('/').join('')
}
</script>

<style scoped></style>
