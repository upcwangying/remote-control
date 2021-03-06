const { BrowserWindow } = require('electron')
const isDev = require('electron-is-dev')
const path = require('path')

let win
let willQuitApp = false
function create() {
  // 创建浏览器窗口
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.on('close', (e) => {
    if (willQuitApp) {
      win = null
    } else {
      e.preventDefault()
      win.hide()
    }
  })

  if (isDev) {
    win.loadURL('http://localhost:3000')
  } else {
    // 加载index.html文件
    win.loadFile(path.resolve(__dirname, '../../renderer/pages/main/index.html'))
  }
  return win
}

function send(channel, ...args) {
  win.webContents.send(channel, ...args)
}

function show() {
  win.show()
}

function close() {
  willQuitApp = true
  win.close()
}

module.exports = {
  create,
  send,
  show,
  close
}
