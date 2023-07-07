import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface State {
  sideBarCollapsed: boolean;
  rowInEdition: number | null;
}

const initialState: State = {
  sideBarCollapsed: true,
  rowInEdition: null,
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
  },
});

export const { collapseSidebar, editRow } = uiSlice.actions;

export default uiSlice.reducer;
