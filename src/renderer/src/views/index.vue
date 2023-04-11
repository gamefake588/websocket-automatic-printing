<template>
  <div bg="gray-6" text="white" w="100vw" h="100vh">
    <router-link to="/print">to print</router-link>

    <!-- socket -->
    <div w="50%" m="auto">
      <h2 text="center" p="b-4">WebSocket</h2>
      <section>
        <el-form label-width="100px">
          <el-form-item label="端口">
            <el-input v-model="port" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary">链接</el-button>
            <el-button>断开</el-button>
          </el-form-item>
        </el-form>
      </section>

      <section p="2" bg="white" text="gray-6" rounded h="400px" class="overflow-auto">
        <pre style="white-space: pre-line">
          <code v-for="item in socketData" :key="item">
            {{ item }}
          </code>
        </pre>
      </section>
    </div>

    <!-- print -->
    <div v-if="false">
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
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// * socket

const port = ref(12346)
const socketData = ref(['链接成功', '链接id:2131ksjadksajdklsajdkla'])

const handleSocket = () => {
  window.electron?.ipcRenderer.send('getSocketList', port.value)

  window.electron?.ipcRenderer.once('getSocketList', (event, data) => {
    console.log('getSocketList', data)
    socketData.value = data
  })
}
handleSocket()

// * print
const printList = ref([])
const activePrint = ref('')

const handlePrinter = () => {
  window.electron?.ipcRenderer.send('getPrinterList')

  window.electron?.ipcRenderer.once('getPrinterList', (event, data) => {
    console.log('getPrinter', data)
    printList.value = data.map((_) => ({ label: _.name, value: _.name, isDefault: _.isDefault }))
    activePrint.value = printList.value.find((_) => _.isDefault)?.value
  })
}
handlePrinter()

const handlerPrint = () => {
  console.log('printHandlePrint')
  window.electron.ipcRenderer.invoke(
    'printHandlePrint',
    JSON.stringify({
      option: {
        silent: true,
        deviceName: activePrint.value,
        printBackground: true,
        margins: {
          marginType: 'none'
        },
        scaleFactor: 80
      },
      data: {
        orderDetail: {
          a: 1,
          b: 1,
          c: 2
        }
      }
    })
  )
}
</script>

<style lang="less">
.el-form-item__label {
  color: #fff;
}
</style>
