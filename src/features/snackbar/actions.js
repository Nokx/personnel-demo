export const actionTypes = {
  SHOW_SNACKBAR: 'snackbar/SHOW_SNACKBAR',
  HIDE_SNACKBAR: 'snackbar/HIDE_SNACKBAR',
};

export const actions = {
  showSnackbar: text => ({
    type: actionTypes.SHOW_SNACKBAR,
    payload: text,
  }),
  hideSnackbar: () => ({
    type: actionTypes.HIDE_SNACKBAR,
  }),
};
