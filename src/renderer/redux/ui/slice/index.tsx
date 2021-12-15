import actions from '../actions';

class UiState {
  isResourcesLoaded = { value: false, message: '' };
}

export default function reducer(state = new UiState(), action: any): UiState {
  switch (action.type) {
    case actions.SET_GENERAL_LOADING:
      return { ...state, isResourcesLoaded: action.payload };
    default:
      return state;
  }
}
