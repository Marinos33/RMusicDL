import { app, BrowserWindow, ipcMain } from 'electron';

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;
import youtubedl from 'youtube-dl-exec';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  // eslint-disable-line global-require
  app.quit();
}

const createWindow = (): void => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    backgroundColor: '#171b21',
    show: false,
    autoHideMenuBar: false,
    webPreferences: {
      nodeIntegration: true,
      nativeWindowOpen: true,
      contextIsolation: false,
      nodeIntegrationInWorker: false,
      nodeIntegrationInSubFrames: false,
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY
    }
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Show window when its ready to
  mainWindow.on('ready-to-show', () => mainWindow.show());
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.handle('request-mainprocess-action', async (event, ...arg) => {
  console.log('start');
  const info = await youtubedl('https://youtu.be/HzKlGo2bMI8', {
    dumpSingleJson: true
  });
  console.log(info['channel']);
  return info['channel'];
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
