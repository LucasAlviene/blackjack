window.electron = require('electron');
window.electron.ipcRenderer.once('app_version', (event, arg) => {
    window.version = arg.version;
});