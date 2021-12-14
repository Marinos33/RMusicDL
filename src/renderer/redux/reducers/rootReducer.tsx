import { combineReducers } from 'redux';
import playlistReducer from '../playlist/slice';
import uiReducer from '../ui/slice';

const rootReducer = combineReducers({
  playlist: playlistReducer,
  ui: uiReducer
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
