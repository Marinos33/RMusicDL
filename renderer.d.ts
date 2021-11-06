export interface IElectronAPI {
  callTest: () => Promise<string>;
  getInfoPlaylist: (playlist: string) => Promise<YtResponse>;
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
