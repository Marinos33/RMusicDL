// Externals
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

// Reducers
import rootReducer from '../reducers/rootReducer';

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
