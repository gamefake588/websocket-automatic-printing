<template>
  <button @click="handlePrinter">getPrintList</button>
  <el-select v-model="activePrint" class="m-2" placeholder="Select" size="large">
    <el-option
      v-for="item in printList"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
  <el-button type="primary" @click="handlerPrint">print</el-button>
</template>

<script setup>
import { ref } from 'vue'

const printList = ref([])
const activePrint = ref('')

const handlePrinter = () => {
  console.log('handlePrinter')
  window.electron.ipcRenderer.send('getPrinterList')

  window.electron.ipcRenderer.once('getPrinterList', (event, data) => {
    console.log(data)
    printList.value = data.map((_) => ({ label: _.name, value: _.name }))
    activePrint.value = printList.value[0].value
  })
}
handlePrinter()

const handlerPrint = () => {
  console.log('handlerPrint')
  window.electron.ipcRenderer.send('print')
}
</script>

<style lang="less">
@import './assets/css/styles.less';
</style>
