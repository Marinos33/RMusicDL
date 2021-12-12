import { contextBridge, ipcRenderer } from 'electron';
import { YtResponse } from 'youtube-dl-exec';
import { Playlist } from './Database/Models/Playlist';

// Say something
console.log('[ReactDL] : Preload execution started');

// Get versions
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector: string, text: string) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  };

  // Packages version
  for (const type of ['chrome', 'node', 'electron', 'erwt']) {
    const version = type == 'erwt' ? process.env['npm_package_version'] : process.versions[type];

    replaceText(`${type}-version`, version);
  }
});

contextBridge.exposeInMainWorld('electronAPI', {
  //exemple call main process function trough isolation context
  callTest: async (): Promise<string> => {
    const res: string = await ipcRenderer.invoke('request-mainprocess-action');
    return res;
  },
  getInfoPlaylist: async (playlist: string): Promise<YtResponse> => {
    const res: YtResponse = await ipcRenderer.invoke('get-info-playlist', playlist);
    return res;
  },
  getAllPlaylists: async (): Promise<Playlist[]> => {
    const res: Playlist[] = await ipcRenderer.invoke('get-playlists');
    return res;
  },
  createPlaylist: async (
    url: string,
    owner: string,
    playlistName: string,
    outputExtension: string,
    outputPath: string
  ): Promise<Playlist> => {
    const res: Playlist = await ipcRenderer.invoke(
      'create-playlist',
      url,
      owner,
      playlistName,
      outputExtension,
      outputPath
    );
    return res;
  },
  refreshPlaylist: async (id: number): Promise<void> => {
    await ipcRenderer.invoke('refresh-playlist', id);
  },
  removePlaylist: async (id: number): Promise<void> => {
    await ipcRenderer.invoke('remove-playlist', id);
  },
  selectFolder: async (): Promise<string> => {
    return await ipcRenderer.invoke('select_folder');
  },
  downloadPlaylist: async (id: number): Promise<void> => {
    await ipcRenderer.invoke('download-playlist', id);
  }
});
