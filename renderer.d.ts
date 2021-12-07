export interface IElectronAPI {
  callTest: () => Promise<string>;
  getInfoPlaylist: (playlist: string) => Promise<YtResponse>;
  getAllPlaylists: () => Promise<Playlist[]>;
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
  }

  interface PaletteOptions {
    icon?: {
      primary?: string;
      secondary?: string;
    };
  }
}
