import {IUser} from '../types';
import axiosInstance, {TOKEN_IDENTIFIER, saveToken} from './config';
type RegisterUserTypes = IUser;

export const registerUser = async ({
  name,
  email,
  password,
}: RegisterUserTypes) => {
  try {
    console.log('It came to the Register User API');
    console.log(await axiosInstance.get('/ping'));
    const response = await axiosInstance.post('/users/create', {
      name: name,
      email: email,
      password: password,
    });
    console.log(response.data.user);
    return response.data.user;
  } catch (error) {
    console.log('error in registerUser', error);
    throw error;
  }
};

type LoginUserTypes = Omit<IUser, 'name'>;

export const loginUser = async ({email, password}: LoginUserTypes) => {
  try {
    console.log('It came to the Login User API');
    const response = await axiosInstance.post('/users/login', {
      email,
      password,
    });
    const _token = response.data.token;
    axiosInstance.defaults.headers.common['Authorization'] = _token;
    saveToken(TOKEN_IDENTIFIER, _token);
    return response.data.user;
  } catch (error) {
    console.log('error in loginUser', error);
    throw error;
  }
};
