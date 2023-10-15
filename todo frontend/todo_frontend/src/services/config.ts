import axios from 'axios';
import * as Keychain from 'react-native-keychain';

const BASE_URL = 'http://10.0.2.2:1337';
export const TOKEN_IDENTIFIER = 'todoToken';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

export const saveToken = async (TOKEN_IDENTIFIER: string, value: string) => {
  try {
  } catch (error) {
    // Store the credentials
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

export default axiosInstance;
