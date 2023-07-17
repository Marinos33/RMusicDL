import React, { createContext, useCallback } from 'react';
import { invoke } from '@tauri-apps/api/tauri';
import { open } from '@tauri-apps/api/dialog';
import { DbResult, DownloadingProfile, Playlist, PlaylistInfo } from '../Types';
import { notification, theme } from 'antd';
import { ExtentedThemeConfig } from '../theme';
import { mapEachPlaylist, mapPlaylist } from '../Mapper/PlaylistMapper';
import { mapProfile } from '../Mapper/DownloadingProfileMapper';

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
  ) => Promise<Playlist>;
  getPlaylists: () => Promise<Playlist[]>;
  getPlaylist: (id: number) => Promise<Playlist>;
  refreshPlaylist: (id: number) => Promise<Playlist>;
  updateProfile: (
    id: number,
    format: string,
    outputPath: string,
  ) => Promise<DownloadingProfile>;
  getDownloadingProfile: (id: number) => Promise<DownloadingProfile>;
  deletePlaylist: (id: number) => Promise<void>;
  openFileExplorer: () => Promise<string>;
}

const BridgeContext = createContext<BridgeContextValue>({
  getPlaylistInfo: () => Promise.resolve({} as PlaylistInfo),
  downloadPlaylist: () => Promise.resolve(),
  addPlaylist: () => Promise.resolve({} as Playlist),
  getPlaylists: () => Promise.resolve([] as Playlist[]),
  getPlaylist: () => Promise.resolve({} as Playlist),
  refreshPlaylist: () => Promise.resolve({} as Playlist),
  updateProfile: () => Promise.resolve({} as DownloadingProfile),
  getDownloadingProfile: () => Promise.resolve({} as DownloadingProfile),
  deletePlaylist: () => Promise.resolve(),
  openFileExplorer: () => Promise.resolve(''),
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
  ): Promise<Playlist> => {
    try {
      const isInitialized = await getInitializeState(true);

      if (!isInitialized) return Promise.reject('Not initialized');

      const playlist = await invoke<string>('add_playlist', {
        name: name,
        url: url,
        owner: owner,
        extension: extension,
        path: path,
      });

      const result: DbResult = JSON.parse(playlist);

      return mapPlaylist(result.data);
    } catch (err) {
      console.error(err);
      openNotificationUnhandleError(err as string);
      return Promise.reject('Not initialized');
    }
  };

  const getPlaylists = async (): Promise<Playlist[]> => {
    try {
      const isInitialized = await getInitializeState(true);

      if (!isInitialized) return Promise.reject('Not initialized');

      const playlists = await invoke<string>('get_playlists');

      const result: DbResult = JSON.parse(playlists);

      return mapEachPlaylist(result.data);
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

      const result = JSON.parse(playlist);

      return mapPlaylist(result.data);
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

      const result = JSON.parse(playlist);

      return mapPlaylist(result.data);
    } catch (err) {
      console.error(err);
      openNotificationUnhandleError(err as string);
      return Promise.reject(err);
    }
  };

  const updateProfile = async (
    id: number,
    format: string,
    outputPath: string,
  ): Promise<DownloadingProfile> => {
    try {
      const isInitialized = await getInitializeState(true);

      if (!isInitialized) return Promise.reject('Not initialized');

      const profile = await invoke<string>('update_downloading_profile', {
        id: id,
        extension: format,
        path: outputPath,
      });

      const result = JSON.parse(profile);

      return mapProfile(result.data);
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

      const result = JSON.parse(profile);

      return mapProfile(result.data);
    } catch (err) {
      console.error(err);
      openNotificationUnhandleError(err as string);
      return Promise.reject(err);
    }
  };

  const deletePlaylist = async (id: number): Promise<void> => {
    try {
      const isInitialized = await getInitializeState(true);

      if (!isInitialized) return;

      await invoke<boolean>('delete_playlist', {
        id: id,
      });

      return;
    } catch (err) {
      console.error(err);
      openNotificationUnhandleError(err as string);
      return;
    }
  };

  const openFileExplorer = async (): Promise<string> => {
    try {
      const selected = await open({
        multiple: false,
        directory: true,
      });

      return selected as string;
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
        deletePlaylist,
        openFileExplorer,
      }}
    >
      {contextHolder}
      {children}
    </BridgeContext.Provider>
  );
}

export { BridgeContext, BridgeContextProvider };
