export const Actions = {
  LOAD_USER_DATA: 'load_user_data',
};

export const loadUserData = data => ({
  type: Actions.LOAD_USER_DATA,
  payload: data,
});
