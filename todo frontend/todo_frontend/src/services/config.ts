import axios from 'axios';

export const BASE_URL = 'http://18.208.245.13:1337';
export const TOKEN_IDENTIFIER = 'todoToken';

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const fetcher = (url: string) =>
  axiosInstance.get(url).then(res => res.data);

export default axiosInstance;
