import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join, basename } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import handlerPrint from './print'

const WebSocket = require('ws')

// socket
let server

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 750,
    height: 600,
    show: false,
    nodeIntegration: true, //允许渲染进程使用node.js
    contextIsolation: false, //允许渲染进程使用node.js
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  // 获取打印机列表
  const getPrinterList = async () => {
    return await mainWindow.webContents.getPrintersAsync()
  }

  // * socket

  // 打开socket
  ipcMain.on('openSocket', async (e, port = 12346) => {
    if (server) {
      mainWindow.webContents.send('getSocketLog', 'websocket已经链接')
      return
    }

    server = new WebSocket.Server({ port: port }, () => {
      console.log(`websocket服务器正在监听${port}端口`)
      mainWindow.webContents.send('getSocketLog', `websocket服务器正在监听${port}端口`)
    })

    // 连接时
    server.on('connection', (ws, req) => {
      const ip = req.socket.remoteAddress
      const port = req.socket.remotePort
      const clientName = `${ip}:${port}`
      mainWindow.webContents.send('getSocketLog', `connection:${clientName}`)

      // 消息处理
      ws.on('message', async (msg) => {
        mainWindow.webContents.send('getSocketLog', `发送过来的消息:${msg.toString()}`)

        let reqData = JSON.parse(msg.toString())
        let resData = {}

        if (reqData.method === 'printreport') {
          handlerPrint(
            {
              option: {
                silent: true,
                deviceName: reqData.PrinterName,
                printBackground: true,
                margins: {
                  marginType: 'none'
                },
                scaleFactor: 80
              },
              data: {
                orderDetail: reqData.data
              }
            },
            mainWindow
          )
          resData.method = 'printreport'
          resData.data = '打印成功'
        } else if (reqData.method === 'getprinterlist') {
          const list = await getPrinterList()
          resData.method = 'getprinterlist'
          resData.data = list
        }

        resData = JSON.stringify(resData)
        ws.send(resData)
        mainWindow.webContents.send('getSocketLog', `返回客户端的消息:${resData}`)
      })
    })

    // 错误异常
    server.on('error', (err) => {
      console.error('Socket错误:', err.message)

      mainWindow.webContents.send('getSocketLog', `Socket错误:${err.message}`)
    })

    // 服务器关闭事件监听
    server.on('close', () => {
      console.log('Socket关闭!')
      mainWindow.webContents.send('getSocketLog', `Socket关闭`)
    })
  })

  // 关闭socket
  ipcMain.on('closeSocket', async () => {
    server?.close()
    server = null
  })

  // * print

  // 获取打印机列表
  ipcMain.on('getPrinterList', async (event) => {
    event
    const list = await getPrinterList()
    mainWindow.webContents.send('getPrinterList', list)
  })

  // 调用打印机打印
  ipcMain.handle('printHandlePrint', async (event, params) => {
    handlerPrint(JSON.parse(params), mainWindow)
  })

  mainWindow.on('ready-to-show', () => {
    if (process.argv.indexOf('--openAsHidden') < 0) mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

function onAppReady() {
  // 设置开机自起
  const exeName = basename(process.execPath)
  app.setLoginItemSettings({
    // 设置为true注册开机自起
    openAtLogin: true,
    openAsHidden: true, //macOs
    path: process.execPath,
    args: ['--processStart', `"${exeName}"`, '--openAsHidden']
  })
}
app.isReady() ? onAppReady() : app.on('ready', onAppReady)

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
