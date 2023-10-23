import axios from 'axios';
import axiosInstance from './config';

let refresh = false;

export const refreshTokenInterceptor = axios.interceptors.response.use(
  resp => resp,
  async error => {
    if (error.response.status === 401 && !refresh) {
      refresh = true;

      const response = await axiosInstance.get('/users/new-token');

      if (response.status === 200) {
        axios.defaults.headers.common[
          'Authorization'
        ] = `${response.data['token']}`;

        return axios(error.config);
      }
    }
    refresh = false;
    return error;
  },
);
