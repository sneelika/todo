import {LOGIN_USER, LOGOUT_USER} from './userActionTypes';

export const updateUserToLogin = user => ({
  type: LOGIN_USER,
  payload: user,
});

export const updateUserToLogout = user => ({
  type: LOGOUT_USER,
});
