export interface IElectronAPI {
  getInfoPlaylist: (playlist: string) => Promise<YtResponse>;
  getAllPlaylists: () => Promise<Playlist[]>;
  getPlaylist: (id: number) => Promise<Playlist>;
  createPlaylist: (
    url: string,
    owner: string,
    playlistName: string,
    outputExtension: string,
    outputPath: string
  ) => Promise<Playlist>;
  refreshPlaylist: (id: number) => Promise<void>;
  removePlaylist: (id: number) => Promise<void>;
  selectFolder: () => Promise<string>;
  downloadPlaylist: (id: number) => Promise<void>;
  updateProfile: (id: number, outputExtension: string, outputPath: string) => Promise<void>;
  updateSettings: (setting: string, value: any) => Promise<any>;
  getStoredSettings: (setting: string) => Promise<any>;
}

declare global {
  interface Window {
    electronAPI: IElectronAPI;
  }
}

declare module '@mui/material/styles' {
  // allow configuration using `createTheme`
  interface Palette {
    icon: {
      primary: string;
      secondary: string;
    };
    sideBar: {
      backgroundColor: {
        primary: string;
      };
    };
  }

  interface PaletteOptions {
    icon?: {
      primary?: string;
      secondary?: string;
    };
    sideBar?: {
      backgroundColor?: {
        primary?: string;
      };
    };
  }
}
