import { combineReducers } from 'redux';
import playlistReducer from '../playlist/slice';

const rootReducer = combineReducers({
  playlist: playlistReducer
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
