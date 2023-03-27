<template>
  <div
    class="w-23% mr-2% my-1% p-4 border border-gray-200 hover:border-gray-400 transition cursor-pointer group"
    v-if="state === 'item'"
  >
    <p class="py-4">黄兴</p>

    <div class="text-sm text-gray-4">
      <p>18888***7777</p>
      <p>广东广州市番禺区南村镇</p>
      <p>唯家·舒享公寓(广州员岗地铁站店)</p>
    </div>

    <div class="text-right text-orange-4 text-sm py-4">
      <span class="invisible group-hover:visible">修改</span>
    </div>
  </div>

  <div
    class="w-23% mr-2% my-1% p-4 border border-gray-200 hover:border-gray-400 transition cursor-pointer flex justify-center items-center group"
    v-else
  >
    <div class="text-center text-gray-4 group-hover:text-gray-8">
      <el-icon class="text-2xl"><CirclePlus /></el-icon>
      <p>添加新地址</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  // item || add
  state: {
    type: String,
    default: 'item',
  },
})
</script>

<style scoped></style>
