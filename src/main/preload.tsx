import { contextBridge, ipcRenderer } from 'electron';

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

contextBridge.exposeInMainWorld('api', {
  //exemple call main process function trough isolation context
  callTest: async (): Promise<string> => {
    const res: string = await ipcRenderer.invoke('request-mainprocess-action');
    return res;
  }
});
