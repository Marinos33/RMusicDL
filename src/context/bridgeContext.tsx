import React, { createContext, useCallback } from 'react';
import { invoke } from '@tauri-apps/api/tauri';
import { DownloadingProfile, Playlist, PlaylistInfo } from '../Types';
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
  addPlaylist: (
    name: string,
    url: string,
    owner: string,
    extension: string,
    path: string,
  ) => Promise<void>;
  getPlaylists: () => Promise<Playlist[]>;
  getPlaylist: (id: number) => Promise<Playlist>;
  refreshPlaylist: (id: number) => Promise<Playlist>;
  updateProfile: (
    format: string,
    outputPath: string,
  ) => Promise<DownloadingProfile>;
  getDownloadingProfile: (id: number) => Promise<DownloadingProfile>;
}

const BridgeContext = createContext<BridgeContextValue>({
  getPlaylistInfo: () => Promise.resolve({} as PlaylistInfo),
  downloadPlaylist: () => Promise.resolve(),
  addPlaylist: () => Promise.resolve(),
  getPlaylists: () => Promise.resolve([] as Playlist[]),
  getPlaylist: () => Promise.resolve({} as Playlist),
  refreshPlaylist: () => Promise.resolve({} as Playlist),
  updateProfile: () => Promise.resolve({} as DownloadingProfile),
  getDownloadingProfile: () => Promise.resolve({} as DownloadingProfile),
});

const { useToken } = theme;

function BridgeContextProvider({ children }: BridgeContextProps) {
  const [api, contextHolder] = notification.useNotification();
  const { token }: ExtentedThemeConfig = useToken();

  const openNotificationInitializeInPorgress = useCallback(() => {
    api.info({
      message: `Initialization in progress ...`,
      description:
        'The necessary resources are being downloaded. Please be patient, it should not take long.',
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

  const addPlaylist = async (
    name: string,
    url: string,
    owner: string,
    extension: string,
    path: string,
  ): Promise<void> => {
    try {
      const isInitialized = await getInitializeState(true);

      if (!isInitialized) return;

      const playlist = await invoke<Playlist>('add_playlist', {
        name: name,
        url: url,
        owner: owner,
        extension: extension,
        path: path,
      });

      console.log(playlist);

      return;
    } catch (err) {
      console.error(err);
      openNotificationUnhandleError(err as string);
      return;
    }
  };

  const getPlaylists = async (): Promise<Playlist[]> => {
    try {
      const isInitialized = await getInitializeState(true);

      if (!isInitialized) return Promise.reject('Not initialized');

      const playlists = await invoke<string>('get_playlists');

      return JSON.parse(playlists);
    } catch (err) {
      console.error(err);
      openNotificationUnhandleError(err as string);
      return Promise.reject(err);
    }
  };

  const getPlaylist = async (id: number): Promise<Playlist> => {
    try {
      const isInitialized = await getInitializeState(true);

      if (!isInitialized) return Promise.reject('Not initialized');

      const playlist = await invoke<string>('get_playlist', {
        id: id,
      });

      return JSON.parse(playlist);
    } catch (err) {
      console.error(err);
      openNotificationUnhandleError(err as string);
      return Promise.reject(err);
    }
  };

  const refreshPlaylist = async (id: number): Promise<Playlist> => {
    try {
      const isInitialized = await getInitializeState(true);

      if (!isInitialized) return Promise.reject('Not initialized');

      const playlist = await invoke<string>('refresh_playlist', {
        id: id,
      });

      return JSON.parse(playlist);
    } catch (err) {
      console.error(err);
      openNotificationUnhandleError(err as string);
      return Promise.reject(err);
    }
  };

  const updateProfile = async (
    format: string,
    outputPath: string,
  ): Promise<DownloadingProfile> => {
    try {
      const isInitialized = await getInitializeState(true);

      if (!isInitialized) return Promise.reject('Not initialized');

      const profile = await invoke<string>('update_profile', {
        extension: format,
        path: outputPath,
      });

      return JSON.parse(profile);
    } catch (err) {
      console.error(err);
      openNotificationUnhandleError(err as string);
      return Promise.reject(err);
    }
  };

  const getDownloadingProfile = async (
    id: number,
  ): Promise<DownloadingProfile> => {
    try {
      const isInitialized = await getInitializeState(true);

      if (!isInitialized) return Promise.reject('Not initialized');

      const profile = await invoke<string>('get_downloading_profile', {
        id: id,
      });

      return JSON.parse(profile);
    } catch (err) {
      console.error(err);
      openNotificationUnhandleError(err as string);
      return Promise.reject(err);
    }
  };

  return (
    <BridgeContext.Provider
      value={{
        getPlaylistInfo,
        downloadPlaylist,
        addPlaylist,
        getPlaylists,
        getPlaylist,
        refreshPlaylist,
        updateProfile,
        getDownloadingProfile,
      }}
    >
      {contextHolder}
      {children}
    </BridgeContext.Provider>
  );
}

export { BridgeContext, BridgeContextProvider };
