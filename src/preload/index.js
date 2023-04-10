import { contextBridge } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const fs = require('fs')
const os = require('os')
const WebSocket = require('ws')
const api = { fs, os, WebSocket }

const server = new WebSocket.Server({ port: 1122 }, () => {
  console.log('websocket服务器正在监听1122端口')
})

// 连接时
server.on('connection', (ws) => {
  ws.on('message', (msg) => {
    console.log('客户端传来的消息', msg.toString())
    ws.send('客户端传过来的消息，服务端已收到!')
  })
})
// 错误异常
server.on('error', (err) => {
  console.error('服务器错误:', err.message)
})
// 服务器关闭事件监听
server.on('close', () => {
  console.log('服务器关闭!')
})

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
  window.api = api
}
