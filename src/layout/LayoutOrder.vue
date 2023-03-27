<template>
  <div class="layout">
    <top-nav />
    <div class="contonent bg-gray-1 min-h-100vh p-4">
      <section class="flex space-x-4 w-primary h-100% items-start">
        <div class="w-30% bg-white p-8">
          <side-nav></side-nav>
        </div>
        <div class="w-70% bg-white p-8 h-100%">
          <router-view />
        </div>
      </section>
    </div>
    <footer-nav />
  </div>
</template>

<script setup>
import SideNav from './components/SideNav.vue'
import TopNav from './components/TopNav.vue'
import FooterNav from './components/Footer.vue'
</script>

<style lang="scss" scoped></style>
