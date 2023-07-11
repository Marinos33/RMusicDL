import React, { createContext } from 'react';
import { invoke } from '@tauri-apps/api/tauri';
import { PlaylistInfo } from '../Types';

interface BridgeContextProps {
  children: React.ReactNode;
}

interface BridgeContextValue {
  getPlaylistInfo: (url: string) => Promise<PlaylistInfo>;
  downloadPlaylist: (url: string, format: string) => Promise<boolean>;
}

const BridgeContext = createContext<BridgeContextValue>({
  getPlaylistInfo: () => Promise.resolve({} as PlaylistInfo),
  downloadPlaylist: () => Promise.resolve(false),
});

function BridgeContextProvider({ children }: BridgeContextProps) {
  const getPlaylistInfo = async (url: string): Promise<PlaylistInfo> => {
    try {
      const playlistInfo = await invoke<string>('get_playlist_info', {
        url: url,
      });
      //deserialize the response from res
      return JSON.parse(playlistInfo);
    } catch (err) {
      console.error(err);
      return Promise.reject(err);
    }
  };

  const downloadPlaylist = async (
    url: string,
    format: string,
  ): Promise<boolean> => {
    try {
      const res = await invoke<boolean>('download_playlist', {
        url: url,
        format: format,
      });

      return res;
    } catch (err) {
      console.error(err);
      return Promise.reject(err);
    }
  };

  return (
    <BridgeContext.Provider
      value={{
        getPlaylistInfo,
        downloadPlaylist,
      }}
    >
      {children}
    </BridgeContext.Provider>
  );
}

export { BridgeContext, BridgeContextProvider };
