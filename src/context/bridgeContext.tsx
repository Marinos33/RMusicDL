import React, { createContext, useCallback } from 'react';
import { invoke } from '@tauri-apps/api/tauri';
import { PlaylistInfo } from '../Types';
import { notification, theme } from 'antd';
import { ExtentedThemeConfig } from '../theme';

interface BridgeContextProps {
  children: React.ReactNode;
}

interface BridgeContextValue {
  getPlaylistInfo: (url: string) => Promise<PlaylistInfo>;
  downloadPlaylist: (
    url: string,
    format: string,
    outputPath: string,
    playlistName: string,
  ) => Promise<void>;
}

const BridgeContext = createContext<BridgeContextValue>({
  getPlaylistInfo: () => Promise.resolve({} as PlaylistInfo),
  downloadPlaylist: () => Promise.resolve(),
});

const { useToken } = theme;

function BridgeContextProvider({ children }: BridgeContextProps) {
  const [api, contextHolder] = notification.useNotification();
  const { token }: ExtentedThemeConfig = useToken();

  const openNotificationInitializeInPorgress = useCallback(() => {
    api.info({
      message: `Initialization in progress ...`,
      description:
        'The necessary resources are being downloaded. Please be patient, it sould not take long.',
      placement: 'top',
      duration: 5,
      style: {
        backgroundColor: token.colorBgContainer,
        border: `3px solid black`,
      },
    });
  }, [api, token]);

  const openNotificationUnhandleError = useCallback(
    (error: string) => {
      api.error({
        message: `An unhandled error occured`,
        description: `The error is : ${error}`,
        placement: 'top',
        duration: 5,
        style: {
          backgroundColor: token.colorBgContainer,
          border: `3px solid black`,
        },
      });
    },
    [api, token],
  );

  const getPlaylistInfo = async (url: string): Promise<PlaylistInfo> => {
    try {
      const isInitialized = await getInitializeState(true);

      if (!isInitialized) return Promise.reject('Not initialized');

      const playlistInfo = await invoke<string>('get_playlist_info', {
        url: url,
      });
      //deserialize the response from res
      return JSON.parse(playlistInfo);
    } catch (err) {
      console.error(err);
      openNotificationUnhandleError(err as string);
      return Promise.reject(err);
    }
  };

  const downloadPlaylist = async (
    url: string,
    format: string,
    outputPath: string,
    playlistName: string,
  ): Promise<void> => {
    try {
      const isInitialized = await getInitializeState(true);

      if (!isInitialized) return;

      await invoke<boolean>('download_playlist', {
        url: url,
        format: format,
        path: outputPath,
        name: playlistName,
      });
    } catch (err) {
      console.error(err);
      openNotificationUnhandleError(err as string);
      return;
    }
  };

  const getInitializeState = useCallback(
    async (useNotif = false): Promise<boolean> => {
      try {
        const res = await invoke<boolean>('is_initialized');

        if (useNotif && !res) {
          openNotificationInitializeInPorgress();
        }

        return res;
      } catch (err) {
        console.error(err);
        openNotificationUnhandleError(err as string);
        return Promise.reject(err);
      }
    },
    [openNotificationInitializeInPorgress, openNotificationUnhandleError],
  );

  return (
    <BridgeContext.Provider
      value={{
        getPlaylistInfo,
        downloadPlaylist,
      }}
    >
      {contextHolder}
      {children}
    </BridgeContext.Provider>
  );
}

export { BridgeContext, BridgeContextProvider };
