<template>
  <div class="border-b border-gray-100">
    <p class="text-xl py-4 content-center border-b border-gray-100">
      <i class="icon icon-icon_yun text-red-4 text-lg"></i>
      {{ data.shop_name }}
    </p>
    <div class="py-4">
      <carts-item
        v-for="goods in data.shopcar"
        :key="goods.pack_num"
        :goods="goods"
      ></carts-item>
    </div>
  </div>
</template>

<script setup>
import CartsItem from './CartsItem.vue'

defineProps({
  data: {},
})
</script>

<style scoped></style>
