import { createSelector } from 'reselect';
import { NAME } from '../constants';

export const getUserFullName = user => `${user.first_name} ${user.last_name} `;

export const getAuthenticated = state => state[NAME].authenticated;
export const getAuthError = state => state[NAME].error;
export const getIsUserLoading = state => state[NAME].loadingUser;
export const getCurrentUser = state => state[NAME].user;
export const getUsers = state => state[NAME].users;

export const getUsersArray = createSelector([getUsers], users => Object.values(users));
