<template>
  <div w="200px">
    <p text="center" font="bold">{{ orderDetail.title }}</p>
    <div p="y-4" text="sm">
      <p>桌号:{{ orderDetail.tableNum }}</p>
      <p>人数:{{ orderDetail.num }}</p>
      <p>单据号:{{ orderDetail.orderNum }}</p>
      <p>下单时间:{{ orderDetail.createTime }}</p>

      <hr m="t-4" />
      <p flex class="justify-between">
        <span>品名</span>
        <span>数量</span>
        <span>单价</span>
        <span>金额</span>
      </p>
      <!-- shop li -->
      <div v-for="good in orderDetail.goods" border="" :key="good.goods_id">
        <p flex class="justify-between">
          <span>{{ good.title }}</span>
        </p>
        <p flex class="justify-between">
          <span class="opacity-0">品名</span>
          <span>{{ good.quantity }}</span>
          <span>{{ good.price }}</span>
          <span>{{ good.total }}</span>
        </p>
      </div>
      <hr m="b-4" />

      <p p="t-2">消费金额:￥{{ orderDetail.allTotal }}</p>
      <p>打单日期:{{ dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss') }}</p>
      <p>备注:{{ orderDetail.content }}</p>
    </div>

    <div v-if="false" text="center" p="y-2">
      <h2 p="b-4">扫码付款</h2>
      <img width="100" src="../assets/1.png" alt="" />
    </div>
  </div>
  <router-link v-if="false" to="/">to index</router-link>
</template>

<script setup>
import { ref } from 'vue'
import dayjs from 'dayjs'

const orderDetail = ref({})

window.electron?.ipcRenderer.once('getPrinterData', (event, data) => {
  console.log('getPrinterData-print', data)
  orderDetail.value = data
})
</script>

<style lang="less"></style>
