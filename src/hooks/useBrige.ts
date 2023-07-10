import React from 'react';
import { BridgeContext } from '../context/bridgeContext';

const useBridge = () => React.useContext(BridgeContext);

export default useBridge;

/*
import { invoke } from '@tauri-apps/api/tauri';

export const useBridge = () => {
  const getPlaylistInfo = async (url: string): Promise<any> => {
    try {
      const playlistInfo = await invoke('get_playlist_info', { url });
      return playlistInfo;
    } catch (err) {
      console.error(err);
      return Promise.reject(err);
    }
  };

  return { getPlaylistInfo };
};*/
