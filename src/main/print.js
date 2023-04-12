import { BrowserWindow } from 'electron'
import { join } from 'path'
import { format as formatUrl } from 'url'

function createPrintWindow(params) {
  // 实例化一个窗口出来
  let printWindow = new BrowserWindow({
    width: 1200,
    height: 1000,
    frame: true,
    skipTaskbar: true,
    transparent: false,
    resizable: false,
    show: true, //不要让窗口显示出来
    nodeIntegration: true, //允许渲染进程使用node.js
    contextIsolation: false, //允许渲染进程使用node.js
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      webSecurity: false,
      nodeIntegration: true //允许渲染进程使用node.js
    }
  })

  const winURL =
    process.env.NODE_ENV === 'development'
      ? `http://localhost:5173`
      : `file://${__dirname}/index.html`
  winURL
  // 加载主页面
  // printWindow.loadURL(`${winURL}#/print`)

  printWindow.loadURL(
    formatUrl({
      pathname: join(__dirname, 'index.html'),
      protocol: 'file',
      slashes: true,
      hash: 'print'
    })
  )

  // 打开控制台
  printWindow.webContents.openDevTools()
  setTimeout(() => {
    printWindow.webContents.send('getPrinterData', params.data.orderDetail)
  }, 300)
  return

  // // 让窗口去加载webPage里面的某个路由
  // printWindow.loadURL(`${winURL}#/print`)

  // 页面加载完成了就可以执行打印的流程了
  printWindow.once('ready-to-show', async () => {
    setTimeout(() => {
      printWindow.webContents.send('getPrinterData', params.data.orderDetail)
    }, 300)

    setTimeout(() => {
      printWindow.webContents.print(params.option, (success, failureReason) => {
        failureReason
        printWindow.destroy()
        printWindow = null
      })
    }, 1000)
  })
}

export default createPrintWindow
