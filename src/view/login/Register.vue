<template>
  <div
    class="bg-[url(http://www.aicanwang.com/static/common/zh/images/cloub/cloub_bg_2.png)] h-100vh bg-cover"
  >
    <div class="m-auto w-150 p-8 h-100% shadow-lg">
      <div class="text-center">
        <p class="pt-8">
          <router-link class="text-5xl font-800" to="/">Aican</router-link>
        </p>
        <p class="py-4">注册Aican帐号可享受更多的服务</p>
      </div>

      <div class="bg-white p-6 rounded mt-8 w-80% mx-auto text-center">
        <p class="text-2xl pb-6">注册帐号</p>

        <div class="w-80% mx-auto">
          <section class="py-2">
            <el-input
              v-model="phone"
              size="large"
              name="phone"
              type="text"
              placeholder="请输入手机号"
            />
          </section>
          <section class="py-2">
            <el-input
              v-model="pwd"
              placeholder="请输入密码"
              size="large"
              type="password"
              show-password
            />
          </section>
          <section class="py-2 flex space-x-2">
            <verify
              v-model="sms"
              :value="phone"
              @getCode="getRegister"
            ></verify>

            <!-- <el-input v-model="sms" size="large" placeholder="请输入验证码" />
            <el-button
              type="primary"
              :disabled="state.isSmsDisabled"
              size="large"
              @click="getRegister"
            >
              {{ state.smsTime > 0 ? state.smsTime + '秒' : '获取验证码' }}
            </el-button> -->
          </section>
          <section class="text-left py-4">
            <el-button
              class="w-100%"
              type="primary"
              size="large"
              @click="handlerRegister"
              :loading="state.btnLoadingState"
              >注册</el-button
            >
          </section>
        </div>

        <div class="text-left w-80% mx-auto">
          <router-link class="text-blue-4 text-sm" to="/login"
            >已有帐号？去登陆</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import verify from '@/components/input/verify.vue'

import { ref, reactive, getCurrentInstance, watch } from 'vue'
import useUserStore from '@/store/user'
import { useRouter } from 'vue-router'

const { proxy } = getCurrentInstance()

const router = useRouter()

const state = reactive({
  btnLoadingState: false,
})

const phone = ref('')
const pwd = ref('')
const sms = ref('')

// 验证码回调
const serial = ref('')

// *** 验证码

/**
 *  获取验证码
 * @param {*} handlerSmCountdow 处理验证码倒计时
 */
const getRegister = async (handlerSmCountdow) => {
  const [err, res] = await proxy.To(
    proxy.API.login.registerSms({ phone: phone.value })
  )
  if (err) {
    ElMessage.warning(err.msg)
    // catch
    return
  }

  ElMessage.success('发送成功')
  serial.value = res.data.serial

  handlerSmCountdow()
}

// *** 注册

const userStore = useUserStore()

/**
 * 处理注册前验证数据
 */
const handlerVerifyData = () => {
  if (!proxy.Rule.isPhone(phone.value)) {
    ElMessage.warning('请检查手机号格式是否正确')
    return
  } else if (!pwd.value) {
    ElMessage.warning('请输入密码')
    return
  } else if (pwd.value.length < 6 || pwd.value.length > 18) {
    ElMessage.warning('密码长度在6-18个字符之间')
    return
  } else if (!/^[A-Za-z0-9]+$/.test(pwd.value)) {
    ElMessage.warning('密码只能包含字母、数字')
    return
  } else if (!sms.value) {
    ElMessage.warning('请输入验证码')
    return
  }

  return true
}

/**
 * 处理注册业务
 */
const handlerRegister = async () => {
  if (!handlerVerifyData()) {
    return
  }

  state.btnLoadingState = true

  const [err, res] = await proxy.To(
    proxy.API.login.register({
      code: sms.value,
      password: pwd.value,
      serial: serial.value,
    })
  )
  if (err) {
    ElMessage.warning(err.msg)

    state.btnLoadingState = false
    return
  }

  ElMessage.success('注册成功！')

  // 处理用户注册成功后状态
  userStore.handlerUserState(`${res.data.token_type} ${res.data.access_token}`)

  state.btnLoadingState = false

  setTimeout(() => {
    router.push({
      path: '/',
    })
  }, 2000)
}
</script>

<style scoped></style>
