<template>
  <div bg="gray-6" text="white" w="100vw" h="100vh">
    <router-link to="/print" v-if="false">to print</router-link>

    <!-- socket -->
    <div w="50%" m="auto">
      <h2 text="center" p="b-4">WebSocket自动打印小票助手</h2>
      <section>
        <el-form label-width="100px">
          <el-form-item label="端口">
            <el-input v-model="port" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handlerSocketOpen">链接</el-button>
            <el-button @click="handlerSocketClose">断开</el-button>
            <el-button @click="handlerPrint">test打印</el-button>
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
const socketData = ref([])

const handlerSocketOpen = () => {
  window.electron?.ipcRenderer.send('openSocket', port.value)
}

const handleSocket = () => {
  handlerSocketOpen()

  window.electron?.ipcRenderer.on('getSocketLog', (event, data) => {
    console.log('getSocketLog', data)
    socketData.value.push(data)
  })
}
handleSocket()

const handlerSocketClose = () => {
  window.electron?.ipcRenderer.send('closeSocket', port.value)
}

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
          title: '爱餐上海餐厅',
          orderNum: '2023040649535450',
          createTime: '2023-04-06 14:20:17',
          allTotal: '78.00',
          tableNum: 'D1',
          content: '',
          num: 1,
          goods: [
            {
              goods_id: 57,
              title: '川香回锅肉',
              price: '39.00',
              quantity: 1,
              total: '39.00',
              img_min_url:
                'http://img.aicanwang.com/goods/20230406/2a506e4d-84ff-4ba5-bd2d-2a3dfc0af9c0_100x100.jpg'
            },
            {
              goods_id: 56,
              title: '招牌千叶豆腐',
              price: '39.00',
              quantity: 1,
              total: '39.00',
              img_min_url:
                'http://img.aicanwang.com/goods/20230406/b3cc11e2-0e5b-466b-b645-cc19406d7be3_100x100.jpg'
            }
          ],
          goodList: [
            {
              shopName: '川香回锅肉',
              quantity: 1,
              total: '39.00',
              price: '39.00'
            },
            {
              shopName: '招牌千叶豆腐',
              quantity: 1,
              total: '39.00',
              price: '39.00'
            }
          ]
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
