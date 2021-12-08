import { Playlist } from '@src/renderer/types';
import actions from '../actions';

class PlaylistState {
  playlists: Array<Playlist> = [];
}

export default function reducer(state = new PlaylistState(), action: any) {
  switch (action.type) {
    case actions.SET_PLAYLISTS:
      return { ...state, playlists: action.payload as Array<Playlist> };
    default:
      return state;
  }
}
