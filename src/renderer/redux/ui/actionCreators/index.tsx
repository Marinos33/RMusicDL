import actions from '../actions';

export const setGeneralLoading = (isResourcesLoaded: boolean, message?: string): any => {
  if (isResourcesLoaded) {
    message = '';
  }
  return { type: actions.SET_GENERAL_LOADING, payload: { value: isResourcesLoaded, message: message } };
};

export const setSideBarCollapsed = (isSideBarCollapsed: boolean): any => {
  console.log(isSideBarCollapsed);
  return { type: actions.SET_SIDEBAR_COLLAPSED, payload: isSideBarCollapsed };
};
