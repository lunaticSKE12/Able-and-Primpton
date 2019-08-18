
const { BrowserWindow } = require('electron')
const windowStateKeeper = require('electron-window-state')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
exports.win

exports.createWindow = () => {

    // Window state manager
    let winState = windowStateKeeper({
        defaultWidth: 1000, defaultHeight: 800
    })

    // Create the browser window.
    this.win = new BrowserWindow({
        width: winState.width,
        height: winState.height,
        minWidth: 400,
        minHeight: 640,
        x: winState.x,
        y: winState.y,
        webPreferences: {
            nodeIntegration: true
        },
        show: false
    })

    // and load the index.html of the app.
    this.win.loadURL(`file://${__dirname}/renderer/index.html`)

    winState.manage(this.win)

    // Open the DevTools.
    // this.win.webContents.openDevTools()

    // Show window when it finish loaded
    this.win.once('ready-to-show', this.win.show)

    // Emitted when the window is closed.
    this.win.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        this.win = null
    })
}
