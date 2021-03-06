import actions from '../actions';
import _ from 'lodash';
import { Playlist } from '@src/renderer/types';
import { Dispatch } from 'redux';
import store from '../../store';

export const setPlaylists = (playlists: Playlist[]): any => {
  return { type: actions.SET_PLAYLISTS, payload: _.sortBy(playlists, ['playlistName']) };
};

export const fetchPlaylists =
  () =>
  async (dispatch: Dispatch): Promise<void> => {
    const playlists = await window.electronAPI.getAllPlaylists();
    dispatch(setPlaylists(playlists));
  };

export const addPlaylist =
  (url: string, owner: string, playlistName: string, outputExtension: string, outputPath: string) =>
  async (dispatch: Dispatch, getState: () => ReturnType<typeof store.getState>): Promise<void> => {
    const newPlaylist = await window.electronAPI.createPlaylist(url, owner, playlistName, outputExtension, outputPath);
    dispatch(setPlaylists([...getState().playlist.playlists, newPlaylist]));
  };

export const removePlaylist =
  (id: number) =>
  async (dispatch: Dispatch, getState: () => ReturnType<typeof store.getState>): Promise<void> => {
    await window.electronAPI.removePlaylist(id);
    dispatch(setPlaylists(_.filter(getState().playlist.playlists, (v) => v.id !== id)));
  };

export const setDownlodingPlaylist = (downloadingPlaylists: number[]): any => {
  return { type: actions.SET_DOWNLOADING_PLAYLIST, payload: downloadingPlaylists };
};

export const addToDownloadingList =
  (id: number) =>
  async (dispatch: Dispatch, getState: () => ReturnType<typeof store.getState>): Promise<void> => {
    dispatch(setDownlodingPlaylist([...getState().playlist.downloadingPlaylists, id]));
  };

export const removeFromDownloadingList =
  (id: number) =>
  async (dispatch: Dispatch, getState: () => ReturnType<typeof store.getState>): Promise<void> => {
    dispatch(setDownlodingPlaylist(_.filter(getState().playlist.downloadingPlaylists, (v) => v !== id)));
  };

export const setSelectedPlaylists = (playlistsId: number[]): any => {
  return { type: actions.SET_SELECTED_PLAYLISTS, payload: _.uniq(playlistsId) };
};

export const addToSelectedPlaylists =
  (id: number[]) =>
  async (dispatch: Dispatch): Promise<void> => {
    dispatch(setSelectedPlaylists(id));
  };

export const removeFromSelectedPlaylists =
  (id: number) =>
  async (dispatch: Dispatch, getState: () => ReturnType<typeof store.getState>): Promise<void> => {
    dispatch(setSelectedPlaylists(_.filter(getState().playlist.selectedPlaylistsId, (v) => v !== id)));
  };

export const setSelectedPlaylist = (playlist: Playlist | null): any => {
  return { type: actions.SET_SELECTED_PLAYLIST, payload: playlist };
};

export const setPlaylist =
  (playlistId?: number) =>
  async (dispatch: Dispatch): Promise<void> => {
    let playlist = null;
    if (playlistId !== undefined) {
      playlist = await window.electronAPI.getPlaylist(playlistId);
    }
    dispatch(setSelectedPlaylist(playlist));
  };
