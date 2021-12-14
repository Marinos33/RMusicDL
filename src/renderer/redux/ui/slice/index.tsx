import actions from '../actions';

class UiState {
  isResourcesLoaded = false;
}

export default function reducer(state = new UiState(), action: any) {
  switch (action.type) {
    case actions.SET_GENERAL_LOADING:
      return { ...state, isResourcesLoaded: action.payload as boolean };
    default:
      return state;
  }
}
