<template>
  <div
    class="bg-[url(http://www.aicanwang.com/static/common/zh/images/cloub/cloub_bg_2.png)] h-100vh bg-cover"
  >
    <div class="m-auto w-150 p-8 h-100% shadow-lg">
      <div class="text-center">
        <p class="pt-8">
          <router-link class="text-5xl font-800" to="/">Aican</router-link>
        </p>
        <p class="py-4">登录Aican帐号可享受更多的服务</p>
      </div>

      <div class="bg-white p-6 rounded mt-8 w-80% mx-auto text-center">
        <p class="text-2xl">帐号登录</p>
        <div class="py-4">
          <Tab v-model="state.tab">
            <TabPane label="短信验证码登录" :name="0">
              <!-- 短线验证码 -->
              <div class="w-80% mx-auto py-2">
                <section class="py-2">
                  <el-input
                    v-model="phone"
                    size="large"
                    placeholder="请输入手机号"
                  />
                </section>
                <section class="py-2 flex space-x-2">
                  <verify
                    v-model="sms"
                    :value="phone"
                    @getCode="getCode"
                  ></verify>
                </section>
                <section class="text-left py-4">
                  <el-button
                    class="w-100%"
                    type="primary"
                    size="large"
                    @click="handlerSmsLogin"
                    >登录</el-button
                  >
                </section>
              </div>
            </TabPane>
            <TabPane label="密码登录" :name="1">
              <!-- 密码 -->
              <div class="w-80% mx-auto py-2">
                <section class="py-2">
                  <el-input
                    v-model="phone"
                    placeholder="请输入手机号"
                    size="large"
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
                <section class="text-left py-4">
                  <el-button
                    class="w-100%"
                    type="primary"
                    size="large"
                    @click="handlerPwdLogin"
                    >登录</el-button
                  >
                </section>
              </div>
            </TabPane>
          </Tab>
        </div>

        <div class="text-right w-80% mx-auto">
          <router-link class="text-blue-4 text-sm" to="/register"
            >注册帐号</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import verify from '@/components/input/verify.vue'
import Tab from '@/components/tab/Tab.vue'
import TabPane from '@/components/tab/TabPane.vue'

import { ref, reactive, getCurrentInstance } from 'vue'
import useUserStore from '@/store/user'
import { useRouter } from 'vue-router'

const { proxy } = getCurrentInstance()

const router = useRouter()

const state = reactive({
  tab: 0,
})

const phone = ref('')
const pwd = ref('')
const sms = ref('')

const serial = ref('')

// *** 验证码

/**
 *  获取验证码
 * @param {*} handlerSmCountdow 处理验证码倒计时
 */
const getCode = async (handlerSmCountdow) => {
  const [err, res] = await proxy.To(
    proxy.API.login.loginSms({ phone: phone.value })
  )
  if (err) {
    ElMessage.warning(err.msg)
    return
  }

  ElMessage.success('发送成功')
  serial.value = res.data.serial

  handlerSmCountdow()
}

// *** 登录

const userStore = useUserStore()

/**
 * 密码 - 登录方式
 */
const handlerPwdLogin = async () => {
  const [err, res] = await proxy.To(
    proxy.API.login.login({
      account: phone.value,
      password: pwd.value,
    })
  )
  if (err) {
    ElMessage.warning(err.msg)
    return
  }

  handlerLoginAfter(`${res.data.token_type} ${res.data.access_token}`)
}

/**
 * 验证码 - 登录方式
 */
const handlerSmsLogin = async () => {
  const [err, res] = await proxy.To(
    proxy.API.login.sms({
      serial: serial.value,
      code: sms.value,
    })
  )
  if (err) {
    ElMessage.warning(err.msg)
    return
  }

  handlerLoginAfter(`${res.data.token_type} ${res.data.access_token}`)
}

const handlerLoginAfter = (token) => {
  ElMessage.success('登录成功')

  userStore.handlerUserState(token)

  setTimeout(() => {
    router.push({
      path: '/',
    })
  }, 2000)
}
</script>

<style scoped></style>
