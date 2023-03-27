<template>
  <div class="">
    <div class="bg-gray-800 text-gray-100" v-show="_state.isShowNav">
      <div class="w-primary ma-a flex-between">
        <div class="flex">
          <router-link
            class="p-4 cursor-pointer text-sm text-white"
            tag="section"
            to="/shop"
            >首页</router-link
          >
          <router-link
            class="p-4 cursor-pointer text-sm text-white"
            tag="section"
            to="/shop/list"
            >爱餐商城</router-link
          >
          <router-link
            class="p-4 cursor-pointer text-sm text-white"
            tag="section"
            to="/shop/list"
            >下载app</router-link
          >
        </div>

        <div class="flex">
          <el-dropdown v-if="info.phone">
            <span
              class="el-dropdown-link p-4 cursor-pointer text-sm text-white"
            >
              {{ info.nickname }}
              <el-icon class="el-icon--right text-white">
                <arrow-down />
              </el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>
                  <router-link to="/order"> 我的订单 </router-link>
                </el-dropdown-item>
                <el-dropdown-item divided @click="handlerLoginout">
                  退出账号
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>

          <router-link
            v-if="!info.phone"
            class="p-4 cursor-pointer text-sm text-white"
            tag="section"
            to="/login"
            >登录</router-link
          >
          <router-link
            v-if="!info.phone"
            class="p-4 cursor-pointer text-sm text-white"
            tag="section"
            to="/register"
            >注册</router-link
          >
          <router-link
            class="p-4 cursor-pointer text-sm text-white"
            tag="section"
            to="/shop/cart"
            >购物车</router-link
          >
        </div>
      </div>
    </div>

    <div class="shadow-lg" v-show="_state.isShowLogoModel">
      <div class="w-primary ma-a flex-between items-center">
        <div class="flex">
          <img
            @click="toIndex"
            class="w-60% cursor-pointer"
            src="http://www.aicanwang.com/static/common/zh/logo.png"
          />
        </div>

        <div class="flex">
          <input
            type="text"
            placeholder="味霸"
            class="border border-gray-3 outline-none b-rounded-l px-2"
          />
          <div
            class="iconfont icon-icon_suosou text-lg cursor-pointer px-4 border border-l-none border-gray-3 block leading-10 b-rounded-r"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { provide, reactive, toRefs, watch, getCurrentInstance } from 'vue'
import { useRouter, useRoute } from 'vue-router'

import useTopNavStore from '@/store/topNav'
import useUserStore from '@/store/user'

const { proxy } = getCurrentInstance()

const topNavStore = useTopNavStore()
const { _state } = toRefs(topNavStore)

const route = useRoute()
const router = useRouter()

// 初始化topNav store配置
watch(
  () => route.path,
  (n) => {
    topNavStore.init()
    console.log(n)
  },
  {
    immediate: true,
  }
)

const toIndex = () => {
  router.push({ path: '/shop' })
}

// *** 用户状态

const userStore = useUserStore()
const { info, token } = toRefs(userStore)

/**
 * 处理用户状态
 */
const handlerUserState = async () => {
  if (!token.value) {
    return
  }

  const [err, res] = await proxy.To(proxy.API.user.info({}))
  if (err) {
    console.log(
      '🚀 ~ file: TopNav.vue ~ line 117 ~ handlerUserState ~ err',
      err
    )
    // ElMessage.warning(err.msg)
    return
  }

  userStore.handlerUserData(res.data)
}
handlerUserState()

const handlerLoginout = () => {
  ElMessageBox.confirm('是否退出当前账号？', 'Warning', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
    draggable: true,
  })
    .then(() => {
      ElMessage.success('退出成功')
      userStore.handlerLoginout()
    })
    .catch(() => {})
}
</script>

<style scoped></style>
