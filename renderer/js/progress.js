/**
 *   @author Napong Dungduangsasitorn
 * */
// jQuery
$ = require('jquery')
// Require IPC
const { ipcRenderer } = require('electron')

let progress = 0
// Request progress every second
setInterval(() => {

  // Request a sync response via IPC
  // let progress = ipcRenderer.sendSync('download-progress-request')
  progress++

  // Update progress element
  $('progress').val(progress)
}, 1000)
