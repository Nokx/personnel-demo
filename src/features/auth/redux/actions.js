import * as t from './actionTypes';

export const signinUser = (email, password) => ({
  type: t.SIGNIN_USER,
  payload: { email, password },
});

export const signoutUser = () => ({
  type: t.SIGNOUT_USER,
});

export const setAuthUser = user => ({
  type: t.SET_AUTH_USER,
  payload: { user },
});

export const authError = error => ({
  type: t.AUTH_ERROR,
  payload: error,
});

export const getAuthUser = () => ({
  type: t.GET_AUTH_USER,
});

export const loadUsersRequest = () => ({
  type: t.LOAD_USERS_REQUEST,
});

export const loadUsers = users => ({
  type: t.LOAD_USERS,
  payload: users,
});

export const addUserRequest = user => ({
  type: t.ADD_USER_REQUEST,
  payload: user,
});

export const addUser = user => ({
  type: t.ADD_USER,
  payload: user,
});

export const editUserRequest = user => ({
  type: t.EDIT_USER_REQUEST,
  payload: user,
});

export const editUser = user => ({
  type: t.EDIT_USER,
  payload: user,
});

export const removeUserRequest = user => ({
  type: t.REMOVE_USER_REQUEST,
  payload: user,
});

export const removeUser = user => ({
  type: t.REMOVE_USER,
  payload: user,
});
