import { inDev } from '@src/utils/helpers';
import { app, BrowserWindow, ipcMain } from 'electron';
import { YtResponse } from 'yt-dlp-exec';
import 'reflect-metadata';
import { Playlist } from './Database/Models/Playlist';
import {
  CreatePlaylist,
  DownloadPlaylist,
  GetAllPlaylists,
  GetInfoPlaylist,
  GetPlaylist,
  GetStoredSettings,
  RefreshPlaylist,
  RemovePlaylist,
  SelectFolder,
  UpdateProfile,
  UpdateSettings
} from './api';
import { PlaylistRepository } from './Database/Repository/PlaylistRepository';
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

ipcMain.handle('get-info-playlist', async (event, playlistUrl: string): Promise<YtResponse> => {
  return await GetInfoPlaylist(playlistUrl);
});

ipcMain.handle('download-playlist', async (event, id: number): Promise<void> => {
  const repository = new PlaylistRepository();

  await DownloadPlaylist(repository, id);
});

ipcMain.handle('get-playlists', async (): Promise<Playlist[]> => {
  const repository = new PlaylistRepository();
  return await GetAllPlaylists(repository);
});

ipcMain.handle('get-playlist', async (event, id: number): Promise<Playlist> => {
  const repository = new PlaylistRepository();

  return await GetPlaylist(repository, id);
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
    return await CreatePlaylist(url, owner, playlistName, outputExtension, outputPath);
  }
);

ipcMain.handle('refresh-playlist', async (event, id: number): Promise<void> => {
  const playlistRepository = new PlaylistRepository();
  await RefreshPlaylist(playlistRepository, id);
});

ipcMain.handle('remove-playlist', async (event, id: number): Promise<void> => {
  const playlistRepository = new PlaylistRepository();
  await RemovePlaylist(playlistRepository, id);
});

ipcMain.handle('select_folder', async (): Promise<string> => {
  return await SelectFolder();
});

ipcMain.handle(
  'update-profile',
  async (event, playlistId: number, outputExtension: string, outputPath: string): Promise<void> => {
    const profileRepository = new ProfileRepository();
    const playlistRepository = new PlaylistRepository();
    await UpdateProfile(profileRepository, playlistRepository, playlistId, outputExtension, outputPath);
  }
);

ipcMain.handle(
  'update-settings',
  async (event, setting: string, value: number | string | boolean): Promise<number | string | boolean> => {
    return await UpdateSettings(setting, value);
  }
);

ipcMain.handle('get-stored-settings', async (event, setting: string): Promise<unknown | string> => {
  return await GetStoredSettings(setting);
});
