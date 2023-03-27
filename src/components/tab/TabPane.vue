<template>
  <slot v-if="context.parent.ctx.modelValue === name"></slot>
</template>

<script setup>
import { ref, reactive, getCurrentInstance, inject, watch } from 'vue'

const context = getCurrentInstance()

const props = defineProps({
  name: Number | String,
  label: '',
})

// 广播传值
const handlerLabels = inject('handlerLabels')
handlerLabels(props.label, props.name)
</script>

<style scoped></style>
