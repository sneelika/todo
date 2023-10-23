import axios from 'axios';

export const BASE_URL = 'http://35.172.185.114:1337';
export const TOKEN_IDENTIFIER = 'todoToken';

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const fetcher = (url: string) =>
  axiosInstance.get(url).then(res => res.data);

export default axiosInstance;
