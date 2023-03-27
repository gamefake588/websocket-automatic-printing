<template>
  <div class="border border-gray-4 my-4">
    <div class="p-4 border-b border-gray-4">
      <p class="text-gray-4 text-xl">已收货</p>
      <div class="flex-between items-center">
        <p class="text-gray-5 text-sm w-70%">
          2022年07月01日 16:44 | 黄显 | 订单号：5220701681208207|
          微信支付（APP）
        </p>
        <p class="text-gray-5 text-sm">
          实付金额：
          <span class="text-2xl text-black">19.90</span>
          元
        </p>
      </div>
    </div>
    <div class="p-4">
      <section class="flex items-center">
        <div class="w-15%">
          <img
            class="w-100%"
            src="http://wbfile.aicanwang.cn//cpbmp/bz/ZT20200510001.jpg"
            alt=""
          />
        </div>
        <div class="w-70% pl-8">
          <p class="text-2xl">莴苣炒肉丝</p>
          <p>9.90元 x 1</p>
        </div>
        <div class="w-15%">
          <el-button type="info" @click="toOrderDetail">订单详情</el-button>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const toOrderDetail = () => {
  router.push({
    path: '/order/detail',
  })
}
</script>

<style scoped></style>
