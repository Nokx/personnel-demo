import { batchActions } from 'redux-batched-actions';
import * as t from '../redux/actionTypes';
import * as actions from '../redux/actions';
import { getUserFullName } from '../redux/selectors';
import { getHttpSourceEventStream } from '../../../common/streamHelpers';
import { getError } from '../../../helpers/ajax-helper';
import snackbar from '../../snackbar';

export const cycles = {
  signIn: sources => {
    const category = 'sign_in';
    const request$ = sources.ACTION
      .filter(action => action.type === t.SIGNIN_USER)
      .map(action => action.payload)
      .map(reqData => ({
        url: `${apiURL}sessions`,
        category: 'sign_in',
        method: 'POST',
        send: {
          session: {
            password: reqData.password,
            email: reqData.email,
          },
        },
      }));

    const action$ = getHttpSourceEventStream(
      sources.HTTP,
      category,
      'Не удалось обработать запрос',
    ).map(response => {
      const error = getError(response);
      if (error) {
        return actions.authError(error.message);
      }

      const { body: { data: { jwt, user } } } = response;
      localStorage.setItem('personnel_token', jwt);
      return actions.setAuthUser(user);
    });

    return {
      ACTION: action$,
      HTTP: request$,
    };
  },

  getAuthUser: sources => {
    const category = 'current_user';
    const request$ = sources.ACTION
      .filter(action => action.type === t.GET_AUTH_USER)
      .map(action => action.payload)
      .map(() => ({
        url: `${apiURL}current_user`,
        category: 'current_user',
        method: 'GET',
        headers: {
          Authorization: localStorage.getItem('personnel_token'),
        },
      }));

    const action$ = getHttpSourceEventStream(
      sources.HTTP,
      category,
      'Не удалось обработать запрос',
    ).map(response => {
      const error = getError(response);
      if (error) {
        localStorage.removeItem('personnel_token');
      }

      return actions.setAuthUser(response.body.data);
    });

    return {
      ACTION: action$,
      HTTP: request$,
    };
  },

  signOut: sources => {
    const category = 'sign_out';
    const request$ = sources.ACTION
      .filter(action => action.type === t.SIGNOUT_USER)
      .map(action => action.payload)
      .map(() => ({
        url: `${apiURL}sessions`,
        category: 'sign_out',
        method: 'DELETE',
        headers: {
          Authorization: localStorage.getItem('personnel_token'),
        },
      }));

    const action$ = getHttpSourceEventStream(
      sources.HTTP,
      category,
      'Не удалось обработать запрос',
    ).map(response => {
      const error = getError(response);
      if (error) {
        localStorage.removeItem('personnel_token');
      }

      localStorage.removeItem('personnel_token');
      return { type: t.UNAUTH_USER };
    });

    return {
      ACTION: action$,
      HTTP: request$,
    };
  },
  getUsers: sources => {
    const category = 'all_users';
    const request$ = sources.ACTION
      .filter(action => action.type === t.LOAD_USERS_REQUEST)
      .map(action => action.payload)
      .map(() => ({
        url: `${apiURL}users`,
        category,
        method: 'GET',
        headers: {
          Authorization: localStorage.getItem('personnel_token'),
        },
      }));

    const action$ = getHttpSourceEventStream(
      sources.HTTP,
      category,
      'Не удалось обработать запрос',
    ).map(response => {
      const error = getError(response);
      if (error) {
        return snackbar.actions.showSnackbar(error.message);
      }

      const users = response.body.data.reduce((acc, user) => {
        acc[user.id] = user;
        return acc;
      }, {});
      return actions.loadUsers(users);
    });

    return {
      ACTION: action$,
      HTTP: request$,
    };
  },

  addUserRequest: sources => {
    const category = 'add_user';
    const request$ = sources.ACTION
      .filter(action => action.type === t.ADD_USER_REQUEST)
      .map(action => action.payload)
      .map(user => ({
        url: `${apiURL}users`,
        category,
        method: 'POST',
        headers: {
          Authorization: localStorage.getItem('personnel_token'),
        },
        send: {
          user,
        },
      }));

    const action$ = getHttpSourceEventStream(
      sources.HTTP,
      category,
      'Не удалось выполнить операцию',
    ).map(response => {
      const error = getError(response);
      if (error) {
        return snackbar.actions.showSnackbar(error.message);
      }

      const { body: { data: user } } = response;

      return batchActions([
        actions.addUser(user),
        snackbar.actions.showSnackbar(`Пользователь ${getUserFullName(user)} создан`),
      ]);
    });

    return {
      ACTION: action$,
      HTTP: request$,
    };
  },

  editUserRequest: sources => {
    const category = 'edit_user';
    const request$ = sources.ACTION
      .filter(action => action.type === t.EDIT_USER_REQUEST)
      .map(action => action.payload)
      .map(user => ({
        url: `${apiURL}users/${user.id}`,
        category,
        method: 'PUT',
        headers: {
          Authorization: localStorage.getItem('personnel_token'),
        },
        send: {
          user,
        },
      }));

    const action$ = getHttpSourceEventStream(
      sources.HTTP,
      category,
      'Не удалось выполнить операцию',
    ).map(response => {
      const error = getError(response);
      if (error) {
        return snackbar.actions.showSnackbar(error.message);
      }

      const { body: { data: user } } = response;

      return batchActions([
        actions.editUser(user),
        snackbar.actions.showSnackbar(`Пользователь ${getUserFullName(user)} отредактирован`),
      ]);
    });

    return {
      ACTION: action$,
      HTTP: request$,
    };
  },

  removeUserRequest: sources => {
    const category = 'remove_user';
    const request$ = sources.ACTION
      .filter(action => action.type === t.REMOVE_USER_REQUEST)
      .map(action => action.payload)
      .map(user => ({
        url: `${apiURL}users/${user.id}`,
        category,
        method: 'DELETE',
        headers: {
          Authorization: localStorage.getItem('personnel_token'),
        },
        reqData: user,
      }));

    const action$ = getHttpSourceEventStream(
      sources.HTTP,
      category,
      'Не удалось выполнить операцию',
    ).map(response => {
      const error = getError(response);
      if (error) {
        return snackbar.actions.showSnackbar(error.message);
      }

      const { request: { reqData: user } } = response;
      return batchActions([
        actions.removeUser(user),
        snackbar.actions.showSnackbar(`Пользователь ${getUserFullName(user)} удален`),
      ]);
    });

    return {
      ACTION: action$,
      HTTP: request$,
    };
  },
};
