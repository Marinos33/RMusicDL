import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './UI/slice';
import playlistsSliceReducer from './Playlists/slice';

const store = configureStore({
  reducer: {
    ui: uiReducer,
    playlists: playlistsSliceReducer,
  },
});

export default store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
