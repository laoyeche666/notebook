const { contextBridge, ipcRenderer } = require('electron');

// 暴露安全的API给渲染进程
contextBridge.exposeInMainWorld('electronAPI', {
  getUserDataPath: () => ipcRenderer.invoke('get-user-data-data-path')
});
