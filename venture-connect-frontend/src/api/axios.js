import axios from 'axios';
import { useUserStore } from '../store/useUserStore';

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export const multipartRequest = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,

  (error) => {
    console.log(error);

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

export default api;
