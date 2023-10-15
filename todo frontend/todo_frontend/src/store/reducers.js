// reducers/authReducer.js
import AsyncStorage from '@react-native-async-storage/async-storage';

import {TOKEN_IDENTIFIER} from '../services/config';

const initialState = {
  token: null,
};

// Retrieve the token from AsyncStorage when the app starts
AsyncStorage.getItem(TOKEN_IDENTIFIER)
  .then(token => {
    initialState.token = token;
  })
  .catch(error => {
    console.error('Error reading token from AsyncStorage:', error);
  });

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        token: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        token: null,
      };
    default:
      return state;
  }
};

export default authReducer;
