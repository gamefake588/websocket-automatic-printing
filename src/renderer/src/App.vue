<template>
  <Versions></Versions>

  <svg class="hero-logo" viewBox="0 0 900 300">
    <use xlink:href="./assets/icons.svg#electron" />
  </svg>
  <h2 class="hero-text">You've successfully created an Electron project with Vue</h2>
  <p class="hero-tagline">Please try pressing <code>F12</code> to open the devTool</p>
</template>

<script setup>
import { onMounted, nextTick } from 'vue'
import Versions from './components/Versions.vue'

onMounted(() => {
  nextTick(() => {
    setTimeout(() => {
      console.log(window.api)
    }, 2000)
  })
})
</script>

<style lang="less">
@import './assets/css/styles.less';
</style>
