import R from 'ramda';
import {
  SET_AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  GET_AUTH_USER,
  ADD_USER,
  EDIT_USER,
  REMOVE_USER,
  LOAD_USERS,
} from './actionTypes';

const defaultState = {
  users: {},
};

export default function(state = defaultState, action) {
  switch (action.type) {
    case SET_AUTH_USER:
      return {
        ...state,
        error: '',
        authenticated: true,
        user: action.payload.user,
        loadingUser: false,
      };
    case UNAUTH_USER:
      return { ...state, authenticated: false, user: null, loadingUser: false };
    case AUTH_ERROR:
      return { ...state, error: action.payload, loadingUser: false };
    case GET_AUTH_USER:
      return { ...state, loadingUser: true };
    case LOAD_USERS: {
      const users = action.payload;
      return { ...state, users };
    }
    case ADD_USER: {
      const user = action.payload;
      return { ...state, users: { ...state.users, [user.id]: user } };
    }
    case EDIT_USER: {
      const user = action.payload;
      return { ...state, users: { ...state.users, [user.id]: user } };
    }
    case REMOVE_USER: {
      const user = action.payload;
      return { ...state, users: R.omit([user.id.toString()], state.users) };
    }
    default:
      return state;
  }
}
