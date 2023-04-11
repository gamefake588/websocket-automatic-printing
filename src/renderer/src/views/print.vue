<template>
  <div w="200px">
    <p text="center" font="bold">爱餐广州餐厅</p>
    <p>
      {{ orderDetail }}
    </p>
    <div p="y-4" text="sm">
      <p>桌号:A1</p>
      <p>人数:1</p>
      <p>单据号:12131231421512</p>
      <p>下单时间:2023-4-11 15-04</p>
      <p flex class="justify-between">
        <span>品名</span>
        <span>数量</span>
        <span>单价</span>
        <span>金额</span>
      </p>
      <!-- shop li -->
      <div v-for="i in 5" :key="i">
        <p flex class="justify-between">
          <span>牛肉炒饭</span>
        </p>
        <p flex class="justify-between">
          <span class="opacity-0">品名</span>
          <span>1</span>
          <span>20.00</span>
          <span>20.00</span>
        </p>
      </div>

      <p p="t-2">消费金额:￥154.00</p>
      <p>打单日期:2023-4-11 15-04</p>
      <p>备注:test</p>
    </div>

    <div text="center" p="y-2">
      <h2 p="b-4">扫码付款</h2>
      <img width="100" src="../assets/1.png" alt="" />
    </div>
  </div>
  <router-link to="/">to index</router-link>
</template>

<script setup>
import { ref } from 'vue'

const orderDetail = ref('')

window.electron?.ipcRenderer.once('getPrinterData', (event, data) => {
  console.log('getPrinterData-print', data)
  orderDetail.value = data
})
</script>

<style lang="less"></style>
