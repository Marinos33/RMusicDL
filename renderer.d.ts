export interface IElectronAPI {
  callTest: () => Promise<string>;
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
