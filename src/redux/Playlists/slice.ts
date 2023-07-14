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
  },
});

export const { setPlaylists } = playlistsSlice.actions;

export default playlistsSlice.reducer;
