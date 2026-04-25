const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 360,
    height: 520,
    minWidth: 320,
    minHeight: 400,
    frame: true,
    resizable: true,
    transparent: false,
    alwaysOnTop: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  mainWindow.loadFile('pet.html');

  if (process.argv.includes('--dev')) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  mainWindow.on('close', () => {
    const bounds = mainWindow.getBounds();
    saveWindowBounds(bounds);
  });

  loadWindowBounds();
}

function saveWindowBounds(bounds) {
  const userDataPath = app.getPath('userData');
  const boundsPath = path.join(userDataPath, 'window-bounds.json');
  try {
    fs.writeFileSync(boundsPath, JSON.stringify(bounds));
  } catch (error) {
    console.error('保存窗口位置失败:', error);
  }
}

function loadWindowBounds() {
  const userDataPath = app.getPath('userData');
  const boundsPath = path.join(userDataPath, 'window-bounds.json');
  try {
    if (fs.existsSync(boundsPath)) {
      const bounds = JSON.parse(fs.readFileSync(boundsPath));
      mainWindow.setBounds(bounds);
    }
  } catch (error) {
    console.error('加载窗口位置失败:', error);
  }
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

ipcMain.on('minimize-window', () => {
  if (mainWindow) {
    mainWindow.minimize();
  }
});

ipcMain.on('close-window', () => {
  if (mainWindow) {
    mainWindow.close();
  }
});

ipcMain.handle('get-user-data-path', () => {
  return app.getPath('userData');
});
