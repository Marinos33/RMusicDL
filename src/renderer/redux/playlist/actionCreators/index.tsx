import actions from '../actions';

// Externals
import _ from 'lodash';
import { Playlist } from '@src/renderer/types';

export const setPlaylists = (playlists: Playlist[]) => {
  return { type: actions.SET_PLAYLISTS, payload: playlists };
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

/*export const updatePlaylist =
  (playlistRepository: PlaylistRepository, id: number) => async (dispatch: any, getState: any) => {
    await playlistRepository.refresh(id);
    fetchPlaylists(playlistRepository);
  };*/

export const removePlaylist = (id: number) => async (dispatch: any, getState: any) => {
  await window.electronAPI.removePlaylist(id);
  dispatch(setPlaylists(_.filter(getState().playlist.playlists, (v) => v !== id)));
};
