<template>
  <div class="py-4">
    <div class="pb-8 text-2xl">{{ label }}</div>
    <div class="flex space-x-4">
      <GoodsItem label="Test" content="test test"></GoodsItem>
      <GoodsItem label="Test" content="test test"></GoodsItem>
      <GoodsItem label="Test" content="test test"></GoodsItem>
      <GoodsItem label="Test" content="test test"></GoodsItem>
      <GoodsItem label="Test" content="test test"></GoodsItem>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onActivated, onMounted, getCurrentInstance } from 'vue'
import GoodsItem from './GoodsItem.vue'

defineProps({
  label: String,
})
</script>

<style lang="scss" scoped></style>
