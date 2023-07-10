import React, { createContext } from 'react';
import { invoke } from '@tauri-apps/api/tauri';

interface BridgeContextProps {
  children: React.ReactNode;
}

interface BridgeContextValue {
  getPlaylistInfo: (url: string) => Promise<any>;
}

const BridgeContext = createContext<BridgeContextValue>({
  getPlaylistInfo: () => Promise.resolve({} as any),
});

function BridgeContextProvider({ children }: BridgeContextProps) {
  const getPlaylistInfo = async (url: string): Promise<any> => {
    try {
      const playlistInfo = await invoke('get_playlist_info', { url: url });
      return playlistInfo;
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
