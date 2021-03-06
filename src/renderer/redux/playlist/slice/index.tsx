import { Playlist } from '@src/renderer/types';
import actions from '../actions';

class PlaylistState {
  playlists: Array<Playlist> = [];
  downloadingPlaylists: Array<number> = [];
  selectedPlaylistsId: Array<number> = [];
  selectedPlaylist: Playlist = null;
}

export default function reducer(state = new PlaylistState(), action: any): PlaylistState {
  switch (action.type) {
    case actions.SET_PLAYLISTS:
      return { ...state, playlists: action.payload as Array<Playlist> };
    case actions.SET_DOWNLOADING_PLAYLIST:
      return { ...state, downloadingPlaylists: action.payload as Array<number> };
    case actions.SET_SELECTED_PLAYLISTS:
      return { ...state, selectedPlaylistsId: action.payload as Array<number> };
    case actions.SET_SELECTED_PLAYLIST:
      return { ...state, selectedPlaylist: action.payload as Playlist };
    default:
      return state;
  }
}
