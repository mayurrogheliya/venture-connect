import axios from 'axios';
import { useUserStore } from '../store/useUserStore';

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
  timeout: 100000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export const multipartRequest = axios.create({
  baseURL: API_URL,
  timeout: 1000000,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
  withCredentials: true,
});

const attachAuthInterceptor = (instance) => {
  instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error),
  );

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      const { logout } = useUserStore.getState();
      if (
        error.response &&
        (error.response.status === 401 || error.response.status == 403)
      ) {
        logout();
      }

      return Promise.reject(error);
    },
  );
};

attachAuthInterceptor(api);
attachAuthInterceptor(multipartRequest);

export default api;
