<template>
  <template v-for="(l, i) in labels" :key="l.name">
    <a
      href="javascript:0;"
      :class="{
        'text-gray-500': modelValue !== l.name,
      }"
      :style="{
        color: modelValue !== l.name ? '' : activeColor,
      }"
      @click="handlerClickSwitch(l.name)"
    >
      {{ l.label }}
    </a>
    <a class="px-4" v-show="i !== labels.length - 1">|</a>
  </template>

  <slot :value="modelValue"></slot>
</template>

<script setup>
import { ref, reactive, provide } from 'vue'

defineProps({
  modelValue: Number,
  activeColor: '',
})

const emit = defineEmits('update:modelValue')

// *** 获取子组件中的label | name 属
const labels = ref([])

const handlerLabels = (label, name) => {
  if (!labels.value.find((_) => _.name === name)) {
    labels.value.push({
      label,
      name,
    })
  }
}

provide('handlerLabels', handlerLabels)

// *** 处理点击切换
const handlerClickSwitch = (name) => {
  emit('update:modelValue', name)
}
</script>

<style scoped></style>
