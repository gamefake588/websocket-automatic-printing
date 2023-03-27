<template>
  <el-input
    v-model="modelValue"
    @input="emit('update:modelValue', $event)"
    size="large"
    placeholder="请输入验证码"
  />
  <el-button
    type="primary"
    :disabled="state.isSmsDisabled"
    size="large"
    @click="getCode"
  >
    {{ state.smsTime > 0 ? state.smsTime + '秒' : '获取验证码' }}
  </el-button>
</template>

<script setup>
import { ref, reactive, getCurrentInstance, watch } from 'vue'

const { proxy } = getCurrentInstance()

const props = defineProps({
  modelValue: '',
  value: '',
})

const emit = defineEmits(['getCode', 'update:modelValue'])

const state = reactive({
  isSmsDisabled: true, // 验证码是否可点击
  smsTime: 0, // 验证码倒计时
})

// *** 验证码

const getCode = () => {
  emit('getCode', handlerSmCountdow)
}

/**
 * 处理验证码倒计时
 */
const handlerSmCountdow = () => {
  state.smsTime = 60
  state.isSmsDisabled = true

  let t = setInterval(() => {
    if (state.smsTime > 0) state.smsTime--
    else {
      handlerVerifyPhone()
      clearInterval(t)
    }
  }, 1000)
}

watch(
  () => props.value,
  (n) => {
    handlerVerifyPhone()
  }
)

/**
 * 验证手机号格式
 */
const handlerVerifyPhone = () => {
  if (proxy.Rule.isPhone(props.value) && state.smsTime === 0) {
    state.isSmsDisabled = false
  } else {
    state.isSmsDisabled = true
  }
}
</script>

<style scoped></style>
