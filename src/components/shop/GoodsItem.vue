<template>
  <div
    class="w-19% bg-white text-center p-2 hover:shadow-lg hover:translate-y-(-1) transform transition cursor-pointer"
    :style="{ width: w }"
    @click="toDetail"
  >
    <div class="">
      <img
        class="w-70%"
        src="https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1628588570.47182471.jpg?f=webp&thumb=1&w=200&h=200"
        alt=""
      />
    </div>

    <div class="py-4">
      <p>{{ label }}</p>
      <span class="text-sm text-gray-400" v-if="content">{{ content }}</span>
      <span class="text-sm text-orange-6" v-if="price">{{ price }}元</span>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onActivated, onMounted, getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router'

defineProps({
  w: String,
  id: String | Number,
  imgSrc: String,
  label: String,
  content: String,
  price: String,
})

const router = useRouter()

const toDetail = () => {
  router.push({ path: '/shop/detail' })
}
</script>

<style lang="scss" scoped></style>
