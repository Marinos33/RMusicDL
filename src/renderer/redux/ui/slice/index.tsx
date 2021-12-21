import actions from '../actions';

class UiState {
  isResourcesLoaded = { value: false, message: '' };
  IsSideBarCollapsed = false;
}

export default function reducer(state = new UiState(), action: any): UiState {
  switch (action.type) {
    case actions.SET_GENERAL_LOADING:
      return { ...state, isResourcesLoaded: action.payload };
    case actions.SET_SIDEBAR_COLLAPSED:
      return { ...state, IsSideBarCollapsed: action.payload };
    default:
      return state;
  }
}
