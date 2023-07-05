import { createSlice } from '@reduxjs/toolkit';

interface State {
  sideBarCollapsed: boolean;
}

const initialState: State = {
  sideBarCollapsed: true,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    collapseSidebar: (state) => {
      console.log('collapseSidebar', state);
      state.sideBarCollapsed = !state.sideBarCollapsed;
    },
  },
});

export const { collapseSidebar } = uiSlice.actions;

export default uiSlice.reducer;
