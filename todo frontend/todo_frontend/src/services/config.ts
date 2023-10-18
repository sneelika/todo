import axios from 'axios';
import * as Keychain from 'react-native-keychain';

export const BASE_URL = 'http://35.175.188.159:1337';
export const TOKEN_IDENTIFIER = 'todoToken';

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

export const saveToken = async (TOKEN_IDENTIFIER: string, value: string) => {
  try {
  } catch (error) {
    // Store the credentials
    console.log('It came to saveToken method');
    await Keychain.setGenericPassword(TOKEN_IDENTIFIER, value);
    console.log(TOKEN_IDENTIFIER, value);
    console.log('error in saveToken', error);
    throw error;
  }
};

axiosInstance.interceptors.request.use(async req => {
  try {
    // Retrieve the authentication token from the secure storage
    const credentials = await Keychain.getGenericPassword();
    if (credentials) {
      const {password} = credentials;
      req.headers.Authorization = `${password}`;
    }
    return req;
  } catch (error) {
    return req;
  }
});

export const fetcher = (url: string) =>
  axiosInstance.get(url).then(res => res.data);

export default axiosInstance;
