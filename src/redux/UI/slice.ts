import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface State {
  sideBarCollapsed: boolean;
  rowInEdition: number | null;
  playlistsDownloading: { [key: string]: boolean }[];
}

const initialState: State = {
  sideBarCollapsed: true,
  rowInEdition: null,
  playlistsDownloading: [],
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    collapseSidebar: (state) => {
      state.sideBarCollapsed = !state.sideBarCollapsed;
    },
    editRow: (state, action: PayloadAction<number | null>) => {
      state.rowInEdition = action.payload;
    },
    addPlaylistDownloading: (state, action: PayloadAction<string>) => {
      state.playlistsDownloading.push({ [action.payload]: true });
    },
    removePlaylistDownloading: (state, action: PayloadAction<string>) => {
      state.playlistsDownloading = state.playlistsDownloading.filter(
        (playlist) => !playlist[action.payload],
      );
    },
  },
});

export const {
  collapseSidebar,
  editRow,
  addPlaylistDownloading,
  removePlaylistDownloading,
} = uiSlice.actions;

export default uiSlice.reducer;
