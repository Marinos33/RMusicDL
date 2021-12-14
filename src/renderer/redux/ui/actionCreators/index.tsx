import actions from '../actions';

export const setGeneralLoading = (isLaoding: boolean): any => {
  return { type: actions.SET_GENERAL_LOADING, payload: isLaoding };
};
