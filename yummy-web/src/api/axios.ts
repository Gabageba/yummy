import axios from 'axios';
import { getToken, setToken, removeToken } from '@utils/token';
import { getStore } from './store';
import { setIsAuth } from './slices/authSlice';

const headers = {
  'Cache-Control': 'no-cache',
  Accept: 'application/json, text/plain, */*',
  'Content-Type': 'application/json',
};

const api = axios.create({
  headers,
  baseURL: import.meta.env.VITE_API_URL,
});

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}> = [];

const processQueue = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any,
  token: string | null = null,
) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token && config.headers) {
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async (error: any) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !(originalRequest as { retry?: boolean }).retry &&
      originalRequest.url &&
      !originalRequest.url.includes('/auth/refresh') &&
      !originalRequest.url.includes('/auth/login') &&
      !originalRequest.url.includes('/auth/register')
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (originalRequest.headers && typeof token === 'string') {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      (originalRequest as { retry?: boolean }).retry = true;
      isRefreshing = true;

      const token = getToken();
      if (!token) {
        processQueue(error, null);
        isRefreshing = false;
        return Promise.reject(error);
      }

      try {
        const baseURL = import.meta.env.VITE_API_URL;
        const response = await axios.post<string>(
          `${baseURL}/auth/refresh`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          },
        );

        const newToken = response.data;
        if (typeof newToken === 'string') {
          setToken(newToken);
          processQueue(null, newToken);

          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
          }
          return await api(originalRequest);
        }
        throw new Error('Неверный формат токена');
      } catch (refreshError) {
        processQueue(refreshError, null);
        removeToken();
        getStore().dispatch(setIsAuth(false));
        isRefreshing = false;
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
