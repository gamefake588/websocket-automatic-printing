<template>
  <swiper
    :slidesPerView="1"
    :spaceBetween="30"
    :loop="true"
    :centeredSlides="true"
    :pagination="{
      clickable: true,
    }"
    :autoplay="{
      delay: 5000,
      disableOnInteraction: false,
    }"
    :navigation="true"
    :modules="modules"
    class="mySwiper"
  >
    <swiper-slide v-for="(item, index) in imgList" :key="index">
      <div style="width: 100%" class="flex">
        <img style="width: 100%; height: 100%" :src="item" />
      </div>
    </swiper-slide>
  </swiper>
</template>

<script setup>
import { ref, reactive, onActivated, onMounted, getCurrentInstance } from 'vue'

import { Swiper, SwiperSlide } from 'swiper/vue' // swiper所需组件
// 这是分页器和对应方法，swiper好像在6的时候就已经分离了分页器和一些其他工具
import { Autoplay, Navigation, Pagination, A11y } from 'swiper'
// 引入swiper样式，对应css 如果使用less或者css只需要把scss改为对应的即可
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const modules = [Autoplay, Pagination, Navigation, A11y]

const { proxy } = getCurrentInstance()

// 描述字段
defineProps({
  imgList: {
    type: Array,
    default: () => [
      '//i8.mifile.cn/v1/a1/' + '144b229b-89e8-a722-6bae-0ca3ffa60bdc!1226x460.jpg',
      '//i8.mifile.cn/v1/a1/' + '6731940e-6983-e453-9816-3132a133d1fa!1226x460.jpg',
      '//i8.mifile.cn/v1/a1/' + '90a0b3ba-a851-699b-6243-ad6df0aae8d2!1226x460.png',
    ],
  },
})
</script>

<style lang="scss" scoped>
.mySwiper {
  width: 100%;
}

.swiper {
  --swiper-theme-color: #ca2020; /* 设置Swiper风格 */
  --swiper-navigation-color: #ca2020; /* 单独设置按钮颜色 */
  --swiper-navigation-size: 30px; /* 设置按钮大小 */
}
</style>
