export interface IElectronAPI {
  callTest: () => Promise<string>;
}

declare global {
  interface Window {
    api: IElectronAPI;
  }
}
