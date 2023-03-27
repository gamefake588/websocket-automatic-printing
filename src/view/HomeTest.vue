<template>
  <h1 class="text-25px text-#ff6700 bg-#ccc">{{counter}}</h1>
  <h1 @click="add">
    <button>++</button>
  </h1>

</template>

<script setup>
import useDemoStore from '@/store/test'
import { storeToRefs } from 'pinia'

const demoStore = useDemoStore()
const { counter } = storeToRefs(demoStore)

const add = () => {
  demoStore.increment()
}

</script>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
