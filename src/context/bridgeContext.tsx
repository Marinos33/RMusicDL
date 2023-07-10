import React, { createContext } from 'react';
import { invoke } from '@tauri-apps/api/tauri';
import { PlaylistInfo } from '../Types';

interface BridgeContextProps {
  children: React.ReactNode;
}

interface BridgeContextValue {
  getPlaylistInfo: (url: string) => Promise<PlaylistInfo>;
}

const BridgeContext = createContext<BridgeContextValue>({
  getPlaylistInfo: () => Promise.resolve({} as PlaylistInfo),
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

  return (
    <BridgeContext.Provider
      value={{
        getPlaylistInfo,
      }}
    >
      {children}
    </BridgeContext.Provider>
  );
}

export { BridgeContext, BridgeContextProvider };
