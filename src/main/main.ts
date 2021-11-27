import { inDev } from '@src/utils/helpers';
import { app, BrowserWindow, ipcMain } from 'electron';
import youtubedl, { YtResponse } from 'youtube-dl-exec';
import 'reflect-metadata';
import Database from './Database';
import { PlaylistRepository } from './Database/Repository/PlaylistRepository';
import { Playlist } from './Database/Models/Playlist';
import { DownloadingProfile } from './Database/Models/DownloadingProfile';
import { ProfileRepository } from './Database/Repository/DownloadingProfileRepository';

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  // eslint-disable-line global-require
  app.quit();
}

const createWindow = (): void => {
  //const database = new Database();

  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    backgroundColor: '#171b21',
    show: false,
    autoHideMenuBar: false,
    webPreferences: {
      nodeIntegration: false,
      nativeWindowOpen: true,
      contextIsolation: true,
      nodeIntegrationInWorker: false,
      nodeIntegrationInSubFrames: false,
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY
    }
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  if (inDev) {
    mainWindow.webContents.openDevTools({ mode: 'detach' });
  }
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

// exemple youtubeDL
ipcMain.handle('get-info-playlist', async (event, playlist: string): Promise<YtResponse> => {
  try {
    const info = await youtubedl(playlist, {
      dumpSingleJson: true
    });
    return info;
  } catch (e: any) {
    console.log(e.message);
    return null;
  }
});

ipcMain.handle('get-playlists', async (event): Promise<Playlist[]> => {
  try {
    const repository = new PlaylistRepository();
    const playlists = await repository.getAll();
    return playlists;
  } catch (e: any) {
    console.log(e.message);
    return null;
  }
});

ipcMain.handle(
  'create-playlist',
  async (
    event,
    url: string,
    owner: string,
    playlistName: string,
    outputExtension: string,
    outputPath: string
  ): Promise<Playlist> => {
    try {
      const profileRepository = new ProfileRepository();
      const profile = await profileRepository.create(outputExtension, outputPath);

      const playlistRepository = new PlaylistRepository();
      const newPlaylist = await playlistRepository.create(url, owner, playlistName, profile.id);
      return newPlaylist;
    } catch (e: any) {
      console.log(e.message);
      return null;
    }
  }
);

ipcMain.handle('refresh-playlist', async (event, id: number): Promise<void> => {
  try {
    const playlistRepository = new PlaylistRepository();
    await playlistRepository.refresh(id);
  } catch (e: any) {
    console.log(e.message);
    return null;
  }
});

ipcMain.handle('remove-playlist', async (event, id: number): Promise<void> => {
  try {
    const playlistRepository = new PlaylistRepository();
    await playlistRepository.delete(id);
  } catch (e: any) {
    console.log(e.message);
    return null;
  }
});
