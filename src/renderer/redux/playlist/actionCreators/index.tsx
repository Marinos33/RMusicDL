import actions from '../actions';
import _ from 'lodash';
import { Playlist } from '@src/renderer/types';

export const setPlaylists = (playlists: Playlist[]) => {
  return { type: actions.SET_PLAYLISTS, payload: _.sortBy(playlists, ['playlistName']) };
};

export const fetchPlaylists = () => async (dispatch: any, getState: any) => {
  const playlists = await window.electronAPI.getAllPlaylists();
  dispatch(setPlaylists(playlists));
};

export const addPlaylist =
  (url: string, owner: string, playlistName: string, outputExtension: string, outputPath: string) =>
  async (dispatch: any, getState: any) => {
    const newPlaylist = await window.electronAPI.createPlaylist(url, owner, playlistName, outputExtension, outputPath);
    console.log(newPlaylist);
    dispatch(setPlaylists([...getState().playlist.playlists, newPlaylist]));
  };

export const removePlaylist = (id: number) => async (dispatch: any, getState: any) => {
  await window.electronAPI.removePlaylist(id);
  dispatch(setPlaylists(_.filter(getState().playlist.playlists, (v) => v !== id)));
};

export const setDownlodingPlaylist = (downloadingPlaylists: number[]) => {
  return { type: actions.SET_DOWNLOADING_PLAYLIST, payload: downloadingPlaylists };
};

export const addToDownloadingList = (id: number) => async (dispatch: any, getState: any) => {
  dispatch(setDownlodingPlaylist([...getState().playlist.downloadingPlaylists, id]));
};

export const removeFromDownloadingList = (id: number) => async (dispatch: any, getState: any) => {
  dispatch(setDownlodingPlaylist(_.filter(getState().playlist.downloadingPlaylists, (v) => v !== id)));
};
