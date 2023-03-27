<template>
  <div class="layout">
    <top-nav />
    <div class="contonent">
      <router-view />
    </div>
    <footer-nav />
  </div>
</template>

<script setup>
import TopNav from './components/TopNav.vue'
import FooterNav from './components/Footer.vue'
</script>

<style lang="scss" scoped></style>
