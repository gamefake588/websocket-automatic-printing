<template>
  <div class="flex-between mb-2">
    <!-- 多选框 -->
    <div class="w-5%">
      <el-checkbox></el-checkbox>
    </div>
    <!-- 图片 -->
    <div class="w-10%">
      <img class="w-100%" :src="goods.img_url" alt="" />
    </div>
    <!-- 名称 -->
    <div class="w-30%">{{ goods.title }}</div>
    <!-- 价格 -->
    <div class="w-10%">{{ goods.price }}元</div>
    <!-- 数量 -->
    <div class="w-20%">
      <el-input-number v-model="goods.quantity" :min="1" :max="10" />
    </div>
    <!-- 总价 -->
    <div class="w-10%">{{ proxy.Tool.transformPrice(goods.price * goods.quantity) }}元</div>
    <!-- 操作 -->
    <div class="w-5%">
      <i class="icon icon-icon_guanbi"></i>
    </div>
  </div>
</template>

<script setup>
import { ref, getCurrentInstance } from 'vue'

const { proxy } = getCurrentInstance()
const num = ref(0)

defineProps({
  goods: {},
})
</script>

<style scoped></style>
