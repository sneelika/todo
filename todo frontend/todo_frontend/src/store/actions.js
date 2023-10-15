import AsyncStorage from '@react-native-async-storage/async-storage';
import {TOKEN_IDENTIFIER} from '../services/config';

export const login = token => {
  // Store the token in AsyncStorage
  AsyncStorage.setItem(TOKEN_IDENTIFIER, token)
    .then(() => {
      return {type: 'LOGIN', payload: token};
    })
    .catch(error => {
      console.error('Error storing token in AsyncStorage:', error);
    });
};

export const logout = () => {
  // Remove the token from AsyncStorage
  AsyncStorage.removeItem(TOKEN_IDENTIFIER)
    .then(() => {
      return {type: 'LOGOUT'};
    })
    .catch(error => {
      console.error('Error removing token from AsyncStorage:', error);
    });
};
