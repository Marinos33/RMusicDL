import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Playlist } from '../../Types';

interface State {
  playlists: Playlist[];
}

const initialState: State = {
  playlists: [],
};

const playlistsSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setPlaylists: (state, action: PayloadAction<Playlist[]>) => {
      state.playlists = action.payload;
    },
    addToPlaylists: (state, action: PayloadAction<Playlist>) => {
      state.playlists.push(action.payload);
    },
    removeFromPlaylists: (state, action: PayloadAction<number>) => {
      state.playlists = state.playlists.filter(
        (playlist) => playlist.id !== action.payload,
      );
    },
    updateElementInPlaylists: (
      state,
      action: PayloadAction<{ id: number; playlist: Playlist }>,
    ) => {
      const { id, playlist } = action.payload;
      state.playlists = state.playlists.map((p) =>
        p.id === id ? playlist : p,
      );
    },
  },
});

export const {
  setPlaylists,
  addToPlaylists,
  removeFromPlaylists,
  updateElementInPlaylists,
} = playlistsSlice.actions;

export default playlistsSlice.reducer;
